import { NextResponse } from 'next/server';
import { verifyPayment } from '@/src/lib/payments/razorpay';
import { db } from '@/src/db/client';

export async function POST(request: Request) {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await request.json();

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing required verification fields' }, { status: 400 });
    }

    const isProd = process.env.NODE_ENV === 'production';
    const isMock = razorpayOrderId.startsWith('order_mock_') || razorpayPaymentId.startsWith('pay_mock_');

    // Hard-Fail Security Guard: Never allow client-dictated mock orders in production runtime
    if (isProd && isMock) {
      console.error(`[Security Alert] Rejected mock payment verification in production for order ${orderId}`);
      return NextResponse.json({ error: 'Mock payments are forbidden in production' }, { status: 403 });
    }

    // In development without keys configured, permit local simulation; otherwise require valid HMAC signature
    const hasKeys = Boolean(process.env.RAZORPAY_KEY_SECRET);
    if (!isMock || hasKeys) {
      const isValid = verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
      }
    } else {
      console.warn(`[Dev Warning] Bypassing HMAC verification for local dev order ${orderId}`);
    }

    // Retrieve order and verify existence & matching gateway order ID
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Idempotency: If already confirmed, return success without duplicate writes
    if (order.status === 'CONFIRMED' && order.paymentStatus === 'paid') {
      return NextResponse.json({ success: true, message: 'Order already verified' });
    }

    if (order.status === 'CANCELLED' || order.status === 'REFUNDED') {
      return NextResponse.json({ error: `Cannot verify payment for ${order.status.toLowerCase()} order` }, { status: 400 });
    }

    // Verify gateway order ID matches if order.paymentId was recorded during creation
    if (order.paymentId && order.paymentId !== razorpayOrderId && !order.paymentId.startsWith('order_mock_')) {
      console.error(`[Security] Mismatched gateway order ID. Expected: ${order.paymentId}, Received: ${razorpayOrderId}`);
      return NextResponse.json({ error: 'Mismatched payment gateway order ID' }, { status: 400 });
    }

    // Update order status in DB atomically
    await db.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED',
        paymentProvider: 'razorpay',
        paymentId: razorpayPaymentId,
        paymentStatus: 'paid',
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[VerifyPayment] Error:', err);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
