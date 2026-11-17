import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '../../../../src/db/client';
import { BookViewer3D } from '../../../../components/3d/book-viewer';
import { BookOpen, ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function BookPreviewPage({ params }: Props) {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);

  const book = await db.bookPublication.findUnique({
    where: { slug },
    include: {
      compositions: {
        include: {
          composition: {
            select: {
              id: true,
              slug: true,
              titleMarathi: true,
              titleTranslit: true,
              verses: true,
              meaningMarathi: true,
              type: true,
              saint: { select: { nameMarathi: true, slug: true } },
            },
          },
        },
        orderBy: { sortOrder: 'asc' },
        take: 10,
      },
      editions: true,
      creator: { select: { name: true } },
    },
  });

  if (!book) notFound();

  const coverPalette: Record<string, string> = {
    POCKET: '#FF7A1A',
    STANDARD: '#6B1E1E',
    PREMIUM_HARDCOVER: '#1B5E20',
    COLLECTOR: '#C9A227',
    TEMPLE: '#1A237E',
  };

  const coverColor = coverPalette[book.bookType] ?? '#6B1E1E';

  return (
    <div className="vitthalaya-shell min-h-screen">
      {/* 3D Viewer Hero */}
      <div className="h-[52vh] min-h-[420px] bg-gradient-to-b from-[var(--dp-ground-deep)] via-[var(--dp-ground-well)] to-[var(--dp-ground)] border-b border-[var(--dp-rule)] relative">
        <BookViewer3D
          titleMarathi={book.titleMarathi}
          titleEnglish={book.titleEnglish ?? undefined}
          coverColor={coverColor}
          pageCount={book.totalPages ?? 100}
        />
      </div>

      {/* Details Sticky Navigation Bar */}
      <div className="bg-[var(--dp-ground-well)]/95 backdrop-blur-md border-b border-[var(--dp-rule)] sticky top-0 z-20 shadow-md">
        <div className="vitthalaya-container max-w-5xl py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/books/${slug}`}
              className="text-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors p-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
              aria-label="पुस्तकाच्या माहिती पानावर परत जा"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-marathi text-[var(--dp-gold)] truncate max-w-md">
                {book.titleMarathi}
              </h1>
              {book.titleEnglish && (
                <p className="text-xs text-[var(--dp-muted)] truncate max-w-md">
                  {book.titleEnglish}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs px-3 py-1.5 bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)] border border-[var(--dp-rule)] rounded-full font-marathi">
              पूर्वावलोकन आवृत्ती
            </span>
            <Link
              href={`/books/${slug}`}
              className="px-4 py-2 bg-[var(--dp-gold)] text-[#0d0906] rounded-lg hover:bg-[var(--dp-gold-celestial)] text-xs sm:text-sm font-semibold font-marathi transition-colors shadow-sm inline-flex items-center gap-1 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
            >
              <span>प्रत मिळवा</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Book Info + Real Pages Preview */}
      <div className="vitthalaya-container max-w-5xl py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--dp-rule)] pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--dp-gold)]" />
              <h2 className="text-lg font-bold font-marathi text-[var(--dp-gold)]">
                रचना व पृष्ठ पूर्वावलोकन
              </h2>
            </div>
            <span className="text-xs text-[var(--dp-muted)] font-marathi">
              एकूण {book.totalCompositions ?? book.compositions.length} पैकी निवडक रचना
            </span>
          </div>

          {/* Book Content Pages */}
          <div className="space-y-6">
            {/* Table of contents page */}
            <div className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] relative overflow-hidden">
              <div className="text-center mb-6 border-b border-[var(--dp-rule)] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--dp-gold)]">
                  ।। श्री गणेशाय नमः ।।
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-marathi text-[var(--dp-ink)] mt-1">
                  {book.titleMarathi}
                </h3>
                <p className="text-xs text-[var(--dp-muted)] font-marathi mt-1">
                  अनुक्रमणिका व मुख्य विभाग
                </p>
              </div>

              <div className="space-y-3">
                {book.compositions.map((bc, idx) => (
                  <div
                    key={bc.id}
                    className="flex items-baseline justify-between text-sm py-2 border-b border-[var(--dp-rule)]/40 last:border-0"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-[var(--dp-gold)] w-6 font-marathi">
                        {idx + 1}.
                      </span>
                      <span className="font-marathi text-[var(--dp-ink)] font-medium">
                        {bc.composition.titleMarathi}
                      </span>
                      {bc.composition.saint && (
                        <span className="text-xs text-[var(--dp-muted)] font-marathi">
                          ({bc.composition.saint.nameMarathi})
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--dp-muted)] font-mono">
                      पृष्ठ {idx * 2 + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actual composition verses preview pages */}
            {book.compositions.slice(0, 4).map((bc, idx) => (
              <article
                key={bc.id}
                className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-[var(--dp-rule)] pb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] font-marathi">
                      रचना क्रमांक {idx + 1}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-marathi text-[var(--dp-ink)] mt-1.5">
                      {bc.composition.titleMarathi}
                    </h4>
                  </div>
                  {bc.composition.saint && (
                    <span className="text-xs px-2.5 py-1 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] rounded-full font-medium font-marathi">
                      संत {bc.composition.saint.nameMarathi}
                    </span>
                  )}
                </div>

                {/* Verses body */}
                <div className="py-2 text-[var(--dp-ink)] font-marathi text-base sm:text-lg leading-relaxed whitespace-pre-line bg-[var(--dp-ground-elevated)] p-4 sm:p-6 rounded-xl border border-[var(--dp-rule)]">
                  {bc.composition.verses || 'रचना उपलब्ध आहे.'}
                </div>

                {/* Meaning if available */}
                {bc.composition.meaningMarathi && (
                  <div className="bg-[var(--dp-ground-deep)]/80 rounded-xl p-4 border border-[var(--dp-rule)] text-xs text-[var(--dp-muted)] font-marathi leading-relaxed">
                    <span className="font-semibold text-[var(--dp-gold)] block mb-1">
                      भावार्थ (Meaning):
                    </span>
                    {bc.composition.meaningMarathi}
                  </div>
                )}

                <div className="flex justify-between items-center text-[11px] text-[var(--dp-muted)] pt-2 border-t border-[var(--dp-rule)]/40 font-marathi">
                  <span>Digital Pandharpur Devotional Archive</span>
                  <span className="font-mono">पृष्ठ {idx * 2 + 3}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="p-6 bg-[var(--dp-ground-elevated)] rounded-2xl border border-[var(--dp-rule)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-[var(--dp-gold)] font-marathi text-base">
                संपूर्ण ग्रंथ वाचनासाठी उपलब्ध
              </h4>
              <p className="text-xs text-[var(--dp-muted)] font-marathi mt-1">
                या ग्रंथातील सर्व {book.totalCompositions ?? book.compositions.length} रचना उच्च दर्जाच्या छपाईत मिळवा.
              </p>
            </div>
            <Link
              href={`/books/${slug}`}
              className="px-5 py-2.5 bg-[var(--dp-gold)] text-[#0d0906] rounded-lg hover:bg-[var(--dp-gold-celestial)] text-xs font-semibold font-marathi transition-colors shrink-0 min-h-[44px] inline-flex items-center justify-center"
            >
              पूर्ण ग्रंथ पहा
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 text-sm">
          <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] space-y-3">
            <h3 className="font-bold font-marathi text-[var(--dp-gold)] text-base border-b border-[var(--dp-rule)] pb-2">
              ग्रंथ माहिती व तपशील
            </h3>
            <Row label="एकूण रचना" value={`${book.totalCompositions ?? book.compositions.length}`} />
            <Row label="अंदाजे पाने" value={`${book.totalPages ?? 120} पाने`} />
            <Row label="विभाग" value={`${book.totalSections ?? 4} विभाग`} />
            <Row label="प्रकार" value={book.bookType.replace('_', ' ')} />
            {book.creator && <Row label="संकलक" value={book.creator.name ?? 'संपादकीय मंडळ'} />}
          </div>

          <div className="vitthalaya-card rounded-2xl p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--dp-gold)] font-semibold text-xs font-marathi">
              <Sparkles className="w-4 h-4" />
              <span>३डी ग्रंथ अनुभव</span>
            </div>
            <p className="text-xs text-[var(--dp-muted)] font-marathi leading-relaxed">
              वरील ३डी ग्रंथाला माऊस किंवा बोटाने फिरवून सर्व बाजूने पाहू शकता. मुखपृष्ठ, पृष्ठभाग आणि कडांचे सूक्ष्म तपशील तपासा.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[var(--dp-rule)]/40 last:border-0 text-xs font-marathi">
      <span className="text-[var(--dp-muted)]">{label}</span>
      <span className="font-semibold text-[var(--dp-ink)]">{value}</span>
    </div>
  );
}
