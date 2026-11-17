import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { db } from '../../../src/db/client';
import { BookOpen, Gift, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ orderId: string }>;
}

export const dynamic = 'force-dynamic';

export default async function GiftPage({ params }: Props) {
  const { orderId } = await params;

  const session = await getServerSession(authOptions);
  const currentUserId = session?.user ? (session.user as { id?: string }).id : null;

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { publication: { select: { titleMarathi: true, titleEnglish: true, slug: true } } },
      },
    },
  });

  if (!order || !order.isGift) notFound();

  // Allow access only if the user is the sender (order.userId)
  if (order.userId && order.userId !== currentUserId) {
    notFound();
  }

  return (
    <div className="vitthalaya-shell min-h-screen py-12">
      {/* Hero Header */}
      <div className="vitthalaya-container max-w-2xl text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--dp-ground-well)] border border-[var(--dp-gold)] flex items-center justify-center text-[var(--dp-gold)] shadow-[0_0_20px_rgba(201,162,39,0.3)]">
          <Gift className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
          <Sparkles size={12} />
          <span>सप्रेम आध्यात्मिक भेट</span>
        </div>
        <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold mb-2">
          सप्रेम भक्तिग्रंथ भेट
        </h1>
        <p className="text-sm font-marathi text-[var(--dp-muted)]">
          वारकरी संतांचे विचार व वाङ्मय आपल्या प्रिय व्यक्तीसाठी
        </p>
      </div>

      {/* Dedication Card */}
      <div className="vitthalaya-container max-w-lg pb-12">
        <div className="vitthalaya-card rounded-2xl border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-2xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
          {/* Decorative Gold Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--dp-gold)] to-transparent" />

          {order.giftRecipient && (
            <div>
              <p className="text-xs font-marathi uppercase tracking-widest text-[var(--dp-gold)]">
                सादर समर्पित
              </p>
              <h2 className="vitthalaya-display text-2xl sm:text-3xl font-bold text-[var(--dp-ink)] mt-1.5">
                {order.giftRecipient}
              </h2>
            </div>
          )}

          <div className="w-16 h-px bg-[var(--dp-rule)] mx-auto" />

          {order.giftMessage && (
            <div className="bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] rounded-xl p-5 sm:p-6">
              <p className="text-[var(--dp-ink)] font-marathi italic leading-relaxed text-base sm:text-lg">
                &ldquo;{order.giftMessage}&rdquo;
              </p>
            </div>
          )}

          <div className="w-16 h-px bg-[var(--dp-rule)] mx-auto" />

          {/* Gift Items */}
          <div className="text-left space-y-3">
            <h3 className="font-semibold text-xs font-marathi uppercase tracking-wider text-[var(--dp-gold)]">
              भेट दिलेले ग्रंथ
            </h3>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)]"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)] shrink-0">
                  <BookOpen size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/books/${item.publication.slug}`}
                    className="font-bold font-marathi text-sm text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors truncate block"
                  >
                    {item.publication.titleMarathi}
                  </Link>
                  {item.publication.titleEnglish && (
                    <p className="text-xs text-[var(--dp-muted)] truncate">{item.publication.titleEnglish}</p>
                  )}
                </div>
                <span className="text-xs font-marathi text-[var(--dp-muted)] font-mono">
                  ×{item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="w-16 h-px bg-[var(--dp-rule)] mx-auto" />

          {/* Sender */}
          <div className="space-y-1">
            <p className="text-xs font-marathi text-[var(--dp-muted)]">
              शुभेच्छुक:{' '}
              <strong className="text-[var(--dp-ink)]">
                {order.guestName ?? 'वारकरी स्नेही'}
              </strong>
            </p>
            <p className="text-[11px] font-marathi text-[var(--dp-muted)]">
              दिनांक:{' '}
              {order.createdAt.toLocaleDateString('mr-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Footer branding */}
          <div className="pt-3 border-t border-[var(--dp-rule)]/40">
            <p className="text-[11px] font-marathi text-[var(--dp-muted)] tracking-wider">
              डिजिटल पंढरपूर — Digital Pandharpur
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs sm:text-sm font-marathi rounded-lg hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
          >
            <BookOpen size={14} />
            <span>इतर ग्रंथ व साहित्य पहा</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
