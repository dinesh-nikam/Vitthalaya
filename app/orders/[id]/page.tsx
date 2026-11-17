import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { db } from '../../../src/db/client';
import { canAccessOrder } from '@/src/lib/orders/order-access';
import { GST_LABEL } from '@/src/lib/orders/pricing';
import { ArrowLeft, ChevronRight, Download, Truck } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string; email?: string }>;
}

const STATUS_STEPS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'PRINTING', 'SHIPPED', 'DELIVERED'] as const;

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'पुष्टीकरण प्रतीक्षेत',
  CONFIRMED: 'पुष्टीकृत',
  PROCESSING: 'प्रक्रिया सुरू',
  PRINTING: 'मुद्रण सुरू',
  SHIPPED: 'पाठविले',
  DELIVERED: 'वितरित',
  CANCELLED: 'रद्द केले',
  REFUNDED: 'परतावा दिला',
};

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  const session = await getServerSession(authOptions);

  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          publication: { select: { titleMarathi: true, titleEnglish: true, slug: true } },
          edition: { select: { id: true, format: true, fileUrl: true } },
        },
      },
      shippingAddress: true,
    },
  });

  // Gated: only the order owner (session), a shareable-token holder, or the
  // guest who used this email at checkout may view it. Unauthorized viewers
  // get a 404 so the order's existence is not revealed.
  const sessionUserId = session?.user ? (session.user as { id: string }).id : null;
  if (
    !order ||
    !canAccessOrder({
      order,
      sessionUserId,
      token: query.token ?? null,
      email: query.email ?? null,
    })
  ) {
    notFound();
  }

  const isCancelled = order.status === 'CANCELLED' || order.status === 'REFUNDED';
  const currentStep = isCancelled ? -1 : STATUS_STEPS.indexOf(order.status as any);

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-3xl space-y-6">
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
              <Link href="/orders" className="hover:text-[var(--dp-gold)] transition-colors">
                माझे ऑर्डर्स
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">#{order.id.slice(0, 8)}</li>
          </ol>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#0d0906] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={14} />
            <span>सर्व ऑर्डर्सकडे परत</span>
          </Link>
        </div>

        {/* Status Header Card */}
        <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-6">
          <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[var(--dp-rule)]/50">
            <div>
              <span className="text-[11px] font-marathi uppercase tracking-wider text-[var(--dp-muted)]">
                ऑर्डर संदर्भ क्रमांक
              </span>
              <h1 className="vitthalaya-display text-xl sm:text-2xl font-bold mt-0.5">
                #{order.id.slice(0, 8)}
              </h1>
              <p className="text-xs font-marathi text-[var(--dp-muted)] mt-1">
                नोंदणी तारीख:{' '}
                {order.createdAt.toLocaleDateString('mr-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-marathi text-[var(--dp-muted)] block">एकूण रक्कम</span>
              <span className="vitthalaya-display text-xl sm:text-2xl font-bold text-[var(--dp-gold)]">
                ₹{Number(order.total).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          {!isCancelled ? (
            <div className="space-y-3">
              <span className="text-xs font-marathi font-medium text-[var(--dp-muted)]">
                ऑर्डर स्थिती प्रगती:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {STATUS_STEPS.map((s, i) => (
                  <div key={s} className="flex flex-col items-center text-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i <= currentStep
                          ? 'bg-[var(--dp-gold)] text-[#0d0906] shadow-[0_0_10px_rgba(201,162,39,0.4)]'
                          : 'bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-muted)]'
                      }`}
                    >
                      {i < currentStep ? '✓' : i + 1}
                    </div>
                    <span
                      className={`text-[11px] mt-1.5 font-marathi leading-tight ${
                        i <= currentStep ? 'text-[var(--dp-gold)] font-medium' : 'text-[var(--dp-muted)]'
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-marathi">
              ऑर्डर स्थिती: {STATUS_LABELS[order.status]}
            </div>
          )}
        </div>

        {/* Items Card */}
        <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
          <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
            समाविष्ट ग्रंथ व प्रती
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] space-y-3"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <Link
                      href={`/books/${item.publication.slug}`}
                      className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors block"
                    >
                      {item.publication.titleMarathi}
                    </Link>
                    <p className="text-xs font-marathi text-[var(--dp-muted)] mt-0.5">
                      नग: {item.quantity}
                    </p>
                    {item.dedicationText && (
                      <p className="text-xs font-marathi text-[var(--dp-gold)] italic mt-1">
                        समर्पण: {item.dedicationText}
                      </p>
                    )}
                  </div>
                  <span className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-gold)] shrink-0">
                    ₹{Number(item.totalPrice).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Download links for confirmed digital orders */}
                {(order.status === 'CONFIRMED' ||
                  order.status === 'PROCESSING' ||
                  order.status === 'SHIPPED' ||
                  order.status === 'DELIVERED') &&
                  item.edition?.id && (
                    <div className="pt-2 border-t border-[var(--dp-rule)]/40">
                      <a
                        href={`/api/books/download/${item.edition.id}?orderId=${order.id}`}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[var(--dp-ground-well)] text-[var(--dp-gold)] border border-[var(--dp-rule)] rounded-lg text-xs font-marathi hover:bg-[var(--dp-gold)] hover:text-[#0d0906] transition-colors min-h-[44px]"
                      >
                        <Download size={14} />
                        <span>डिजिटल प्रत डाऊनलोड करा ({item.edition.format?.replace('DIGITAL_', '')})</span>
                      </a>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-3">
          <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
            देयक माहिती
          </h2>
          <div className="space-y-2 text-xs sm:text-sm font-marathi">
            <Row label="उप-एकूण" value={`₹${Number(order.subtotal).toLocaleString('en-IN')}`} />
            <Row
              label="शिपिंग शुल्क"
              value={order.shippingCost ? `₹${Number(order.shippingCost).toLocaleString('en-IN')}` : 'मोफत'}
            />
            <Row label={GST_LABEL} value={`₹${Number(order.tax).toLocaleString('en-IN')}`} />
            <Row label="एकूण अदा रक्कम" value={`₹${Number(order.total).toLocaleString('en-IN')}`} bold />
            {order.paymentId && <Row label="पेमेंट संदर्भ आयडी" value={order.paymentId} />}
          </div>
        </div>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-3">
            <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
              पाठवणीचा पत्ता
            </h2>
            <div className="text-xs sm:text-sm font-marathi text-[var(--dp-ink)] space-y-1">
              <p className="font-bold text-[var(--dp-gold)]">{order.shippingAddress.fullName}</p>
              <p className="text-[var(--dp-muted)]">संपर्क: {order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} —{' '}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>
        )}

        {/* Tracking */}
        {order.trackingNumber && (
          <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-gold)]">
              <Truck size={15} />
              <h2 className="font-bold">कुरियर ट्रॅकिंग क्रमांक</h2>
            </div>
            <p className="text-sm font-mono text-[var(--dp-ink)]">{order.trackingNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-[var(--dp-rule)]/30 last:border-0">
      <span className="text-[var(--dp-muted)]">{label}</span>
      <span className={bold ? 'font-bold text-sm sm:text-base text-[var(--dp-gold)]' : 'text-[var(--dp-ink)]'}>
        {value}
      </span>
    </div>
  );
}
