import { describe, expect, it, beforeEach, afterEach, mock } from 'bun:test';
import crypto from 'crypto';
import { db as actualDb } from '@/src/db/client';

interface MockOrder {
  id: string;
  status: string;
  paymentProvider?: string;
  paymentId?: string;
  paymentStatus?: string;
  subtotal: number;
  total: number;
}

const mockOrders = new Map<string, MockOrder>();

mock.module('@/src/db/client', () => ({
  db: new Proxy(actualDb, {
    get(target, modelProp) {
      if (modelProp === 'order') {
        return {
          findUnique: async ({ where }: { where: { id: string } }) => {
            return mockOrders.get(where.id) || null;
          },
          create: async ({ data }: { data: MockOrder }) => {
            mockOrders.set(data.id, { ...data });
            return data;
          },
          update: async ({ where, data }: { where: { id: string }; data: Partial<MockOrder> }) => {
            const existing = mockOrders.get(where.id);
            if (!existing) throw new Error('Record not found');
            const updated = { ...existing, ...data };
            mockOrders.set(where.id, updated);
            return updated;
          },
          delete: async ({ where }: { where: { id: string } }) => {
            mockOrders.delete(where.id);
            return true;
          },
        };
      }
      return (target as any)[modelProp];
    },
  }),
}));

import { POST as verifyPaymentHandler } from '@/app/api/orders/verify-payment/route';
import { db } from '@/src/db/client';

describe('Payment Verification Security Hardening', () => {
  const originalEnv = process.env.NODE_ENV;
  const originalKeySecret = process.env.RAZORPAY_KEY_SECRET;

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = 'test_secret_1234567890';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    process.env.RAZORPAY_KEY_SECRET = originalKeySecret;
  });

  it('TC-PAY-001: rejects request when required verification fields are missing', async () => {
    const req = new Request('http://localhost:3000/api/orders/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: 'order-123',
        // missing razorpayOrderId, razorpayPaymentId, razorpaySignature
      }),
    });

    const res = await verifyPaymentHandler(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Missing required verification fields');
  });

  it('TC-PAY-002: strictly blocks order_mock_ prefix in production mode', async () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';

    const req = new Request('http://localhost:3000/api/orders/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: 'order-123',
        razorpayOrderId: 'order_mock_attack_123',
        razorpayPaymentId: 'pay_mock_123',
        razorpaySignature: 'fake_sig',
      }),
    });

    const res = await verifyPaymentHandler(req);
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json.error).toBe('Mock payments are forbidden in production');
  });

  it('TC-PAY-003: rejects invalid HMAC signature', async () => {
    // @ts-ignore
    process.env.NODE_ENV = 'production';

    const req = new Request('http://localhost:3000/api/orders/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: 'order-123',
        razorpayOrderId: 'order_live_999',
        razorpayPaymentId: 'pay_live_999',
        razorpaySignature: 'bad_signature_forgery',
      }),
    });

    const res = await verifyPaymentHandler(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Invalid payment signature');
  });

  it('TC-PAY-004: accepts valid HMAC signature and confirms matching order', async () => {
    const razorpayOrderId = 'order_live_test_777';
    const razorpayPaymentId = 'pay_live_test_777';
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    // Create an order in in-memory DB to test against
    const testOrderId = `test-order-${Date.now()}`;
    await db.order.create({
      data: {
        id: testOrderId,
        status: 'PENDING',
        paymentProvider: 'razorpay',
        paymentId: razorpayOrderId,
        paymentStatus: 'UNPAID',
        subtotal: 299,
        total: 299,
      },
    });

    try {
      const req = new Request('http://localhost:3000/api/orders/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: testOrderId,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature: validSignature,
        }),
      });

      const res = await verifyPaymentHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);

      // Verify order updated in DB
      const updatedOrder = await db.order.findUnique({ where: { id: testOrderId } });
      expect(updatedOrder?.status).toBe('CONFIRMED');
      expect(updatedOrder?.paymentStatus).toBe('paid');
      expect(updatedOrder?.paymentId).toBe(razorpayPaymentId);
    } finally {
      await db.order.delete({ where: { id: testOrderId } }).catch(() => {});
    }
  });

  it('TC-PAY-005: handles idempotency when order is already confirmed', async () => {
    const razorpayOrderId = 'order_live_idem_888';
    const razorpayPaymentId = 'pay_live_idem_888';
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const testOrderId = `test-order-idem-${Date.now()}`;
    await db.order.create({
      data: {
        id: testOrderId,
        status: 'CONFIRMED',
        paymentProvider: 'razorpay',
        paymentId: razorpayPaymentId,
        paymentStatus: 'paid',
        subtotal: 599,
        total: 599,
      },
    });

    try {
      const req = new Request('http://localhost:3000/api/orders/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: testOrderId,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature: validSignature,
        }),
      });

      const res = await verifyPaymentHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.message).toBe('Order already verified');
    } finally {
      await db.order.delete({ where: { id: testOrderId } }).catch(() => {});
    }
  });
});
