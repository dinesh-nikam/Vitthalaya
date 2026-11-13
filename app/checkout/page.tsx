'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, getCartSummary, clearCart } from '../../src/lib/orders/cart';
import { calculateTax } from '../../src/lib/orders/pricing';
import { PriceBreakdown } from '@/components/price-breakdown';
import { ChevronRight, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import '@/app/homepage.css';

// Razorpay global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutForm {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
}

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: 'Maharashtra',
  postalCode: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const cart = getCart();
  const { subtotal, itemCount } = getCartSummary(cart);

  // Same breakdown as the order detail page — the server charges exactly this
  // (shipping is currently free, matching /api/orders/create).
  const shippingCost: number = 0;
  const tax = calculateTax(subtotal);
  const total = subtotal + shippingCost + tax;

  if (cart.items.length === 0) {
    return (
      <div className="vitthalaya-shell min-h-screen py-10">
        <div className="vitthalaya-container max-w-xl text-center">
          <div className="vitthalaya-card rounded-2xl p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <p className="text-sm font-marathi text-[var(--dp-muted)]">
              आपली खरेदीची टोपली रिकामी आहे.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
            >
              ग्रंथ भांडार पहा
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function updateField<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handlePlaceOrder() {
    setLoading(true);
    setError(null);

    try {
      // 1. Create order via API
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map((i) => ({
            publicationId: i.publicationId,
            editionId: i.editionId,
            quantity: i.quantity,
          })),
          shippingAddress: form,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Order creation failed');

      // 2. Check if real Razorpay keys configured
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        // Dev mode — simulate successful payment
        console.warn('[Dev] No Razorpay Key — simulating payment success');

        // Mark the order as confirmed by calling the verification endpoint with mock data
        await fetch('/api/orders/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: data.orderId,
            razorpayOrderId: data.razorpayOrderId || `order_mock_${Date.now()}`,
            razorpayPaymentId: `pay_mock_${Date.now()}`,
            razorpaySignature: 'mock_signature',
          }),
        });

        clearCart();
        router.push(`/orders/${data.orderId}?token=${encodeURIComponent(data.accessToken || '')}`);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: data.amountPaise,
        currency: data.currency ?? 'INR',
        name: 'Digital Pandharpur',
        description: `Books (${itemCount} items)`,
        order_id: data.razorpayOrderId,
        prefill: {
          name: form.fullName,
          contact: form.phone,
        },
        handler: async function (response: any) {
          // 3. Payment success — verify signature on server
          try {
            const verifyRes = await fetch('/api/orders/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: data.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error ?? 'Payment verification failed');
            }
            clearCart();
            router.push(`/orders/${data.orderId}?token=${encodeURIComponent(data.accessToken || '')}`);
          } catch (e: any) {
            setError(e instanceof Error ? e.message : 'Payment verification failed');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      if (typeof window === 'undefined' || !(window as any).Razorpay) {
        throw new Error('Razorpay SDK failed to load. Please refresh the page and try again.');
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] px-4 py-2.5 text-xs sm:text-sm font-marathi text-[var(--dp-ink)] placeholder-[var(--dp-muted)] focus:border-[var(--dp-gold)] focus:ring-2 focus:ring-[var(--dp-gold)]/20 outline-none transition-colors min-h-[44px]';
  const labelClass =
    'block text-xs font-semibold uppercase tracking-wider text-[var(--dp-ink)] font-marathi mb-1.5';

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-2xl space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-2" aria-label="ब्रेडक्रंब">
          <ol className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--dp-gold)] transition-colors">
                मुख्यपृष्ठ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li>
              <Link href="/cart" className="hover:text-[var(--dp-gold)] transition-colors">
                टोपली
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">चेकआउट</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="vitthalaya-display text-2xl sm:text-3xl font-bold">
              सुरक्षित चेकआउट
            </h1>
            <p className="text-xs font-marathi text-[var(--dp-muted)] mt-0.5">
              शिपिंग पत्ता व सुरक्षित देयक पूर्तता
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
            <Lock size={12} />
            सुरक्षित व्यवहार
          </span>
        </header>

        {/* Order Summary */}
        <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-3">
          <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
            ऑर्डर सारांश
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {cart.items.map((item) => (
              <div
                key={item.editionId}
                className="flex justify-between items-center text-xs font-marathi py-1.5 border-b border-[var(--dp-rule)]/30 last:border-0"
              >
                <span className="text-[var(--dp-ink)] truncate max-w-[280px]">
                  {item.titleMarathi} × {item.quantity}
                </span>
                <span className="font-semibold text-[var(--dp-ink)]">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-[var(--dp-rule)]/50">
            <PriceBreakdown
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              total={total}
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
          <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
            शिपिंग पत्ता (वितरण तपशील)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>पूर्ण नाव *</label>
              <input
                className={inputClass}
                value={form.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="उदा. राहुल पांडुरंग कदम"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>मोबाईल नंबर *</label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="उदा. 98XXXXXXXX"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>पिन कोड *</label>
              <input
                className={inputClass}
                value={form.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                placeholder="उदा. 413304"
                required
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>पत्ता ओळ १ *</label>
              <input
                className={inputClass}
                value={form.line1}
                onChange={(e) => updateField('line1', e.target.value)}
                placeholder="घर क्र., इमारत किंवा गल्लीचे नाव"
                required
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>पत्ता ओळ २ (पर्यायी)</label>
              <input
                className={inputClass}
                value={form.line2}
                onChange={(e) => updateField('line2', e.target.value)}
                placeholder="जवळची खूण (Landmark)"
              />
            </div>
            <div>
              <label className={labelClass}>शहर / गाव *</label>
              <input
                className={inputClass}
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="उदा. पंढरपूर"
                required
              />
            </div>
            <div>
              <label className={labelClass}>राज्य *</label>
              <input
                className={inputClass}
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-xs font-marathi">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading || !form.fullName || !form.phone || !form.line1 || !form.city || !form.postalCode}
          className="w-full py-3.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-sm font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>प्रक्रिया सुरू आहे...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>₹{total.toLocaleString('en-IN')} सुरक्षित भरा व ऑर्डर करा</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
