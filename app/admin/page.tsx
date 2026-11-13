import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '../../src/db/client';
import {
  ShieldCheck,
  Scroll,
  FileText,
  Tag,
  CheckCircle2,
  Mic,
  Search,
  BookOpen,
  Package,
  Printer,
  Coins,
  Target,
  Globe,
  BarChart3,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import '@/app/homepage.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }
  if ((session.user as { role?: string }).role !== 'ADMIN') {
    redirect('/');
  }

  const [
    bookCount,
    orderCount,
    collectionCount,
    recentOrders,
    compositionCount,
    saintCount,
    enrichmentCount,
    recentCompositions,
    pageCount,
    tagCount,
    userSubmittedCount,
  ] = await Promise.all([
    db.bookPublication.count(),
    db.order.count(),
    db.userCollection.count({ where: { isPublic: true } }),
    db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { _count: { select: { items: true } } },
    }),
    db.composition.count(),
    db.saint.count(),
    db.aiEnrichmentResult.count(),
    db.composition.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        titleMarathi: true,
        slug: true,
        type: true,
        updatedAt: true,
        saint: { select: { nameMarathi: true } },
        createdBy: { select: { name: true, email: true } },
      },
    }),
    db.page.count(),
    db.tag.count(),
    db.composition.count({ where: { createdById: { not: null } } }),
  ]);

  const statusCounts = {
    pending: await db.order.count({ where: { status: 'PENDING' } }),
    confirmed: await db.order.count({ where: { status: 'CONFIRMED' } }),
    shipped: await db.order.count({ where: { status: 'SHIPPED' } }),
  };

  const cards = [
    { label: 'एकूण रचना', value: compositionCount, href: '/admin/compositions', icon: Scroll },
    { label: 'वापरकर्ता रचना', value: userSubmittedCount, href: '/admin/compositions', icon: Sparkles },
    { label: 'एकूण पाने', value: pageCount, href: '/admin/pages', icon: FileText },
    { label: 'एकूण टॅग्स', value: tagCount, href: '/admin/tags', icon: Tag },
    { label: 'एकूण संत', value: saintCount, href: '/saints', icon: BookOpen },
    { label: 'AI समृद्ध रचना', value: enrichmentCount, href: '/admin/analytics', icon: Sparkles },
    { label: 'एकूण पुस्तके', value: bookCount, href: '/admin/books', icon: BookOpen },
    { label: 'एकूण ऑर्डर्स', value: orderCount, href: '/admin/orders', icon: Package },
    { label: 'प्रलंबित ऑर्डर्स', value: statusCounts.pending, href: '/admin/orders?status=PENDING', icon: Package },
    { label: 'सार्वजनिक संग्रह', value: collectionCount, href: '/admin/collections', icon: Target },
    {
      label: 'ऑडिओ संच',
      value: await db.uploadedFile.count({ where: { format: 'audio' } }),
      href: '/admin/audio',
      icon: Mic,
    },
    {
      label: 'डेटा गुणवत्ता',
      value: await db.composition.count({ where: { reviewed: true } }),
      href: '/admin/data-quality',
      icon: Search,
    },
  ];

  const quickLinks = [
    { label: 'रचना व्यवस्थापन', href: '/admin/compositions', icon: Scroll },
    { label: 'पान व्यवस्थापन', href: '/admin/pages', icon: FileText },
    { label: 'टॅग व्यवस्थापन', href: '/admin/tags', icon: Tag },
    { label: 'मॉडरेशन रांग', href: '/admin/moderation', icon: CheckCircle2 },
    { label: 'ऑडिओ पटल', href: '/admin/audio', icon: Mic },
    { label: 'डेटा गुणवत्ता', href: '/admin/data-quality', icon: Search },
    { label: 'पुस्तके व्यवस्थापन', href: '/admin/books', icon: BookOpen },
    { label: 'ऑर्डर व्यवस्थापन', href: '/admin/orders', icon: Package },
    { label: 'मुद्रण भागीदार', href: '/admin/print-partners', icon: Printer },
    { label: 'किंमत सेटिंग', href: '/admin/pricing', icon: Coins },
    { label: 'संग्रह व्यवस्थापन', href: '/admin/collections', icon: Target },
    { label: 'शोध व संकलन', href: '/admin/discovery', icon: Globe },
    { label: 'विश्लेषण', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-6xl space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="ब्रेडक्रंब">
          <ol className="flex items-center gap-2 text-xs font-marathi text-[var(--dp-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--dp-gold)] transition-colors">
                मुख्यपृष्ठ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">प्रशासन दालन</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-2">
              <ShieldCheck size={12} />
              प्रशासकीय नियंत्रण कक्ष
            </div>
            <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold">
              प्रशासन पटल (Admin Control Panel)
            </h1>
            <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)] mt-1">
              वारकरी वाङ्मय अभिलेखागार, मुद्रण सेवा, ऑर्डर्स आणि प्रणाली स्थिती
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="vitthalaya-card rounded-2xl p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] min-h-[56px]"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] mb-3">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-[var(--dp-ink)] mb-0.5">
                    {card.value.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs font-marathi text-[var(--dp-muted)]">{card.label}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
          <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)] pb-2 border-b border-[var(--dp-rule)]/50">
            द्रुत व्यवस्थापन पर्याय
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors text-xs font-marathi min-h-[44px]"
                >
                  <Icon size={16} className="text-[var(--dp-gold)] shrink-0" />
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Orders & Compositions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--dp-rule)]/50">
              <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)]">
                अलीकडील ऑर्डर्स
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs font-marathi text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1"
              >
                <span>सर्व पहा</span>
                <ArrowRight size={11} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-[var(--dp-rule)]/30 last:border-0 text-xs font-marathi"
                >
                  <span className="text-[var(--dp-muted)] font-mono">#{order.id.slice(0, 8)}</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] border border-[var(--dp-rule)] text-[10px]">
                    {order.status}
                  </span>
                  <span className="text-[var(--dp-gold)] font-semibold">
                    ₹{Number(order.total).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[var(--dp-muted)]">
                    {order.createdAt.toLocaleDateString('mr-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-[var(--dp-muted)] text-xs py-4 text-center font-marathi">
                  कोणतीही ऑर्डर नोंदवलेली नाही.
                </p>
              )}
            </div>
          </div>

          {/* Recent Compositions */}
          <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--dp-rule)]/50">
              <h2 className="vitthalaya-display text-base font-bold text-[var(--dp-gold)]">
                अलीकडील रचना
              </h2>
              <Link
                href="/admin/compositions"
                className="text-xs font-marathi text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1"
              >
                <span>सर्व पहा</span>
                <ArrowRight size={11} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentCompositions.map((comp) => (
                <Link
                  key={comp.slug}
                  href="/admin/compositions"
                  className="flex items-center justify-between py-2 border-b border-[var(--dp-rule)]/30 last:border-0 text-xs font-marathi hover:text-[var(--dp-gold)] transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-[var(--dp-ink)] truncate">{comp.titleMarathi}</p>
                    <p className="text-[11px] text-[var(--dp-muted)] truncate">
                      {comp.saint?.nameMarathi || 'संत परंपरा'} • {comp.type}
                    </p>
                  </div>
                  <span className="text-[var(--dp-muted)] shrink-0">
                    {comp.updatedAt.toLocaleDateString('mr-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </Link>
              ))}
              {recentCompositions.length === 0 && (
                <p className="text-[var(--dp-muted)] text-xs py-4 text-center font-marathi">
                  कोणतीही रचना आढळली नाही.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
