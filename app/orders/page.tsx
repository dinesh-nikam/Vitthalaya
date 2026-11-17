import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '../../src/db/client';
import { ChevronRight, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import '@/app/homepage.css';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-950/40 text-amber-300 border border-amber-600/30',
  CONFIRMED: 'bg-blue-950/40 text-blue-300 border border-blue-600/30',
  PROCESSING: 'bg-indigo-950/40 text-indigo-300 border border-indigo-600/30',
  PRINTING: 'bg-purple-950/40 text-purple-300 border border-purple-600/30',
  SHIPPED: 'bg-teal-950/40 text-teal-300 border border-teal-600/30',
  DELIVERED: 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/30',
  CANCELLED: 'bg-rose-950/40 text-rose-300 border border-rose-600/30',
  REFUNDED: 'bg-stone-900 text-stone-300 border border-stone-600/30',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'प्रतीक्षेत',
  CONFIRMED: 'पुष्टीकृत',
  PROCESSING: 'प्रक्रिया सुरू',
  PRINTING: 'मुद्रण सुरू',
  SHIPPED: 'पाठविले',
  DELIVERED: 'वितरित',
  CANCELLED: 'रद्द',
  REFUNDED: 'परतावा',
};

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }
  const userId = (session.user as { id: string }).id;

  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      items: {
        include: { publication: { select: { titleMarathi: true, slug: true } } },
      },
      _count: { select: { items: true } },
    },
  });

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
            <li className="text-[var(--dp-ink)] font-medium">माझे ऑर्डर्स</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="vitthalaya-display text-2xl sm:text-3xl font-bold mb-1">
              माझे ऑर्डर्स
            </h1>
            <p className="text-xs font-marathi text-[var(--dp-muted)]">
              आपल्या सर्व मुद्रित व डिजिटल ग्रंथ खरेदीचा इतिहास
            </p>
          </div>
          <span className="text-xs font-marathi px-3 py-1 rounded-full bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)]">
            {orders.length} ऑर्डर्स
          </span>
        </header>

        {orders.length === 0 ? (
          <div className="vitthalaya-card rounded-2xl p-10 text-center border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <Package className="w-12 h-12 mx-auto text-[var(--dp-gold)] opacity-40 mb-2" />
            <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)]">
              अजून कोणतीही ऑर्डर केलेली नाही
            </h2>
            <p className="text-xs font-marathi text-[var(--dp-muted)] max-w-sm mx-auto">
              पवित्र ग्रंथ भांडारातून आपल्या आवडीचे संत साहित्य निवडा.
            </p>
            <div className="pt-2">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
              >
                <ShoppingBag size={14} />
                <span>ग्रंथ भांडार पहा</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusStyle =
                STATUS_STYLES[order.status] ??
                'bg-[var(--dp-ground-elevated)] text-[var(--dp-muted)] border border-[var(--dp-rule)]';
              const statusLabel = STATUS_LABELS[order.status] ?? order.status;

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="vitthalaya-card rounded-xl p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-marathi text-[var(--dp-muted)]">
                      दिनांक:{' '}
                      {order.createdAt.toLocaleDateString('mr-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-marathi font-medium ${statusStyle}`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  <div className="flex justify-between items-end gap-4">
                    <div className="space-y-1">
                      {order.items.slice(0, 3).map((item) => (
                        <p
                          key={item.id}
                          className="text-xs sm:text-sm font-marathi font-medium text-[var(--dp-ink)] truncate max-w-[320px]"
                        >
                          {item.publication.titleMarathi} × {item.quantity}
                        </p>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-[11px] font-marathi text-[var(--dp-muted)]">
                          +{order.items.length - 3} इतर पुस्तके
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-gold)]">
                        ₹{Number(order.total).toLocaleString('en-IN')}
                      </p>
                      <span className="text-[11px] font-marathi text-[var(--dp-muted)] inline-flex items-center gap-1 hover:text-[var(--dp-gold)]">
                        तपशील पहा <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
