import { GST_LABEL } from '@/src/lib/orders/pricing';

interface PriceBreakdownProps {
  subtotal: number;
  /** Shipping cost; 0 (or omitted) renders as "मोफत" (free). */
  shippingCost?: number;
  tax: number;
  total: number;
}

/**
 * Subtotal / shipping / GST / total rows — the exact breakdown shown before
 * payment (cart + checkout) and after (order detail page). Shared so every
 * screen displays identical math and the GST label stays in sync with
 * src/lib/orders/pricing.ts.
 */
export function PriceBreakdown({ subtotal, shippingCost = 0, tax, total }: PriceBreakdownProps) {
  return (
    <div className="space-y-2 text-sm font-marathi">
      <div className="flex justify-between text-[var(--dp-muted,theme(colors.gray.500))]">
        <span>उप-एकूण (Subtotal)</span>
        <span className="text-[var(--dp-ink,theme(colors.gray.800))] font-medium">
          ₹{subtotal.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="flex justify-between text-[var(--dp-muted,theme(colors.gray.500))]">
        <span>शिपिंग शुल्क (Shipping)</span>
        <span className="text-[var(--dp-gold,theme(colors.amber.600))] font-medium">
          {shippingCost ? `₹${shippingCost.toLocaleString('en-IN')}` : 'मोफत (Free)'}
        </span>
      </div>
      <div className="flex justify-between text-[var(--dp-muted,theme(colors.gray.500))]">
        <span>{GST_LABEL}</span>
        <span className="text-[var(--dp-ink,theme(colors.gray.800))] font-medium">
          ₹{tax.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="flex justify-between font-bold text-base sm:text-lg pt-3 border-t border-[var(--dp-rule,theme(colors.gray.200))]">
        <span className="text-[var(--dp-gold,theme(colors.amber.600))]">एकूण देय रक्कम (Total)</span>
        <span className="text-[var(--dp-gold,theme(colors.amber.600))]">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}
