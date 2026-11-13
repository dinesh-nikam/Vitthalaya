/**
 * Reading List Detail — view compositions in a reading list.
 */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '../../../src/db/client';
import { ArrowLeft, ChevronRight, Library, User } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);
  const list = await db.userCollection.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

  if (!list) return { title: 'वाचन यादी सापडली नाही | Digital Pandharpur' };

  return {
    title: `${list.name} — वाचन यादी | Digital Pandharpur`,
    description: list.description ?? `वारकरी वाचन यादी: ${list.name}`,
    openGraph: {
      title: `${list.name} — वाचन यादी | Digital Pandharpur`,
      description: list.description ?? `वारकरी वाचन यादी: ${list.name}`,
      locale: 'mr_IN',
    },
  };
}

export default async function ReadingListDetailPage({ params }: Props) {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);

  const list = await db.userCollection.findUnique({
    where: { slug },
    include: {
      compositions: {
        orderBy: { sortOrder: 'asc' },
        include: {
          composition: {
            select: {
              id: true,
              titleMarathi: true,
              titleTranslit: true,
              type: true,
              slug: true,
              audioLinks: true,
              saint: { select: { nameMarathi: true, slug: true } },
            },
          },
        },
      },
      user: { select: { id: true, name: true, imageUrl: true } },
    },
  });

  if (!list || !list.isPublic) {
    notFound();
  }

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl">
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
              <Link href="/reading-lists" className="hover:text-[var(--dp-gold)] transition-colors">
                वाचन यादी
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium truncate max-w-xs">{list.name}</li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/reading-lists"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-marathi border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#110c08] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>सर्व वाचन याद्यांकडे परत</span>
          </Link>
        </div>

        {/* List Header Card */}
        <header className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
              <Library size={12} />
              सार्वजनिक वाचन यादी
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-muted)] font-marathi">
              {list.compositions.length} रचना
            </span>
          </div>

          <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {list.name}
          </h1>

          {list.description && (
            <p className="text-sm font-marathi text-[var(--dp-muted)] leading-relaxed mb-4">
              {list.description}
            </p>
          )}

          <div className="flex items-center gap-3 pt-3 border-t border-[var(--dp-rule)]/50 text-xs font-marathi text-[var(--dp-muted)]">
            {list.user?.name ? (
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[10px] text-[var(--dp-gold)] font-bold">
                  {list.user.name.charAt(0)}
                </span>
                <span>संकलक: <strong className="text-[var(--dp-ink)]">{list.user.name}</strong></span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <User size={12} />
                <span>वारकरी संकलक</span>
              </span>
            )}
          </div>
        </header>

        {/* Composition List */}
        <section aria-labelledby="composition-list-heading" className="space-y-4">
          <h2
            id="composition-list-heading"
            className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] mb-4"
          >
            समाविष्ट रचना सूची
          </h2>

          {list.compositions.length === 0 ? (
            <div className="vitthalaya-card rounded-2xl p-8 text-center border border-[var(--dp-rule)] bg-[var(--dp-ground-well)]">
              <p className="text-xs font-marathi text-[var(--dp-muted)]">
                या यादीत अजून कोणत्याही रचना जोडलेल्या नाहीत.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {list.compositions.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/${item.composition.type.toLowerCase()}/${item.composition.slug}`}
                  className="group vitthalaya-card rounded-xl p-4 sm:p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] min-h-[56px]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-xs font-mono text-[var(--dp-muted)] w-6 shrink-0 text-right">
                      {i + 1}.
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm sm:text-base font-bold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors truncate">
                          {item.composition.titleMarathi}
                        </span>
                        {item.composition.saint && (
                          <span className="text-[11px] font-marathi px-2 py-0.5 rounded bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-muted)] shrink-0">
                            {item.composition.saint.nameMarathi}
                          </span>
                        )}
                      </div>

                      {item.notes ? (
                        <p className="text-xs font-marathi text-[var(--dp-muted)] line-clamp-1">
                          {item.notes}
                        </p>
                      ) : (
                        <p className="text-xs font-marathi text-[var(--dp-muted)]">
                          {item.composition.type} • {item.composition.titleTranslit}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-marathi text-[var(--dp-gold)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all hidden sm:inline">
                      वाचा →
                    </span>
                    <ChevronRight size={14} className="text-[var(--dp-muted)] group-hover:text-[var(--dp-gold)] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
