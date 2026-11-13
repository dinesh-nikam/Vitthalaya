'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart, updateQuantity, getCartSummary } from '../../src/lib/orders/cart';
import { calculateTax } from '../../src/lib/orders/pricing';
import { PriceBreakdown } from '@/components/price-breakdown';
import { BookOpen, ChevronRight, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import '@/app/homepage.css';

export default function CartPage() {
  const [cart, setCart] = useState<ReturnType<typeof getCart>>({ items: [], updatedAt: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setMounted(true);
  }, []);

  const refresh = useCallback(() => {
    setCart({ ...getCart() });
  }, []);

  const handleRemove = (editionId: string) => {
    removeFromCart(editionId);
    refresh();
  };

  const handleQty = (editionId: string, qty: number) => {
    updateQuantity(editionId, qty);
    refresh();
  };

  if (!mounted) return null;

  const { subtotal, itemCount } = getCartSummary(cart);

  // Same subtotal / shipping / GST / total breakdown as the checkout page —
  // shipping is free, matching /api/orders/create.
  const shippingCost: number = 0;
  const tax = calculateTax(subtotal);
  const total = subtotal + shippingCost + tax;

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-3xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="ब्रेडक्रंब">
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
              <Link href="/books" className="hover:text-[var(--dp-gold)] transition-colors">
                भक्ती ग्रंथ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">खरेदीची टोपली</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="vitthalaya-display text-2xl sm:text-3xl font-bold mb-1">
              खरेदीची टोपली
            </h1>
            <p className="text-xs font-marathi text-[var(--dp-muted)]">
              निवडलेले ग्रंथ, आवृत्त्या व देय रक्कम
            </p>
          </div>
          <span className="text-xs font-marathi px-3 py-1 rounded-full bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)]">
            एकूण {itemCount} वस्तू
          </span>
        </header>

        {cart.items.length === 0 ? (
          <div className="vitthalaya-card rounded-2xl p-10 sm:p-12 text-center border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-[var(--dp-gold)] opacity-40 mb-2" />
            <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
              तुमची टोपली रिकामी आहे
            </h2>
            <p className="text-xs font-marathi text-[var(--dp-muted)] max-w-sm mx-auto">
              पवित्र ग्रंथ भांडारातून आपल्या आवडीची आवृत्ती किंवा पुस्तक निवडा.
            </p>
            <div className="pt-2">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs sm:text-sm font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
              >
                <BookOpen size={14} />
                <span>ग्रंथ भांडार पहा</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div
                  key={item.editionId}
                  className="vitthalaya-card rounded-xl p-4 sm:p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] flex flex-wrap sm:flex-nowrap items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-[200px]">
                    <Link
                      href={`/books/${item.slug}`}
                      className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors block truncate"
                    >
                      {item.titleMarathi}
                    </Link>
                    <p className="text-xs font-marathi text-[var(--dp-muted)] mt-0.5">
                      {item.format.replace('_', ' ')} {item.pageCount ? `• ${item.pageCount} पृष्ठे` : ''}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQty(item.editionId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-10 h-10 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] disabled:opacity-30 flex items-center justify-center font-bold text-base transition-colors min-w-[40px] min-h-[40px]"
                      aria-label="संख्या कमी करा"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-marathi font-semibold text-sm text-[var(--dp-ink)]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQty(item.editionId, item.quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] flex items-center justify-center font-bold text-base transition-colors min-w-[40px] min-h-[40px]"
                      aria-label="संख्या वाढवा"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[90px]">
                    <p className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-gold)]">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] font-marathi text-[var(--dp-muted)]">
                      ₹{item.unitPrice}/प्रत
                    </p>
                  </div>

                  {/* Remove action */}
                  <button
                    type="button"
                    onClick={() => handleRemove(item.editionId)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                    aria-label={`${item.titleMarathi} टोपलीतून काढा`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Price Summary Card */}
            <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
              <div className="flex justify-between items-center text-xs font-marathi text-[var(--dp-muted)] pb-2 border-b border-[var(--dp-rule)]/50">
                <span>एकूण निवडलेल्या प्रती</span>
                <span className="font-bold text-[var(--dp-ink)]">{itemCount}</span>
              </div>

              <PriceBreakdown
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
              />

              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-sm font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px] flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>खरेदी पूर्ण करा (चेकआउट)</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
