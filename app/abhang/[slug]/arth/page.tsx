import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/src/db/client';
import { canonicalMetadata } from '@/src/lib/seo';
import { ArrowLeft, BookOpen, ChevronRight, Scroll, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ slug: string }>;
}

type CompositionResult = {
  id: string;
  titleMarathi: string;
  titleTranslit: string;
  meaning: string | null;
  slug: string;
  type: string;
  saint: {
    nameMarathi: string;
    nameTranslit: string;
    slug: string;
  } | null;
};

type EnrichmentResult = {
  summary: string | null;
  meaning: string | null;
  keywords: string[];
};

export default async function ArthPage({ params }: Props) {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);

  const composition = (await db.composition.findUnique({
    where: { slug },
    select: {
      id: true,
      titleMarathi: true,
      titleTranslit: true,
      meaning: true,
      slug: true,
      type: true,
      saint: {
        select: {
          nameMarathi: true,
          nameTranslit: true,
          slug: true,
        },
      },
    },
  })) as CompositionResult | null;

  if (!composition) notFound();

  const enrichment = (await db.aiEnrichmentResult.findFirst({
    where: { compositionId: composition.id },
    select: { summary: true, meaning: true, keywords: true },
  })) as EnrichmentResult | null;

  const mainMeaning = enrichment?.meaning ?? composition.meaning;
  const mainSummary = enrichment?.summary;
  const keywords = enrichment?.keywords ?? [];

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
              <Link
                href={`/abhang/${slug}`}
                className="hover:text-[var(--dp-gold)] transition-colors truncate max-w-[200px]"
              >
                {composition.titleMarathi}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">सार्थ भावार्थ व विवरण</li>
          </ol>
        </nav>

        {/* Back Link and Action */}
        <div className="mb-6">
          <Link
            href={`/abhang/${slug}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-marathi border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#110c08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>मूळ अभंगाकडे परत जा</span>
          </Link>
        </div>

        {/* Sacred Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full">
              <Sparkles size={11} />
              {composition.type || 'अभंग'} • सार्थ विवरण
            </span>
            {composition.saint && (
              <Link
                href={`/sant/${composition.saint.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] text-xs font-marathi rounded-full transition-colors"
              >
                {composition.saint.nameMarathi}
              </Link>
            )}
          </div>

          <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {composition.titleMarathi}
          </h1>
          <p className="text-sm font-marathi text-[var(--dp-muted)] tracking-wide">
            {composition.titleTranslit} — तात्त्विक व अध्यात्मिक अर्थ
          </p>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            {mainSummary && (
              <section
                className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] relative overflow-hidden"
                aria-labelledby="summary-heading"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--dp-rule)] pb-3">
                  <BookOpen className="w-5 h-5 text-[var(--dp-gold)]" />
                  <h2
                    id="summary-heading"
                    className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)]"
                  >
                    संक्षिप्त भावार्थ (सार)
                  </h2>
                </div>
                <p className="text-[var(--dp-ink)] font-marathi text-base leading-relaxed">
                  {mainSummary}
                </p>
              </section>
            )}

            {/* Full Meaning Section */}
            {mainMeaning ? (
              <section
                className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)]"
                aria-labelledby="full-meaning-heading"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-[var(--dp-rule)] pb-3">
                  <Scroll className="w-5 h-5 text-[var(--dp-gold)]" />
                  <h2
                    id="full-meaning-heading"
                    className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)]"
                  >
                    सविस्तर भावार्थ व चिंतन
                  </h2>
                </div>
                <div className="whitespace-pre-line text-[var(--dp-ink)] font-marathi text-base sm:text-lg leading-loose">
                  {mainMeaning}
                </div>
              </section>
            ) : (
              <section className="vitthalaya-card rounded-2xl p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center">
                <p className="text-[var(--dp-muted)] font-marathi text-sm">
                  या अभंगाचा सविस्तर भावार्थ लवकरच समाविष्ट केला जात आहे.
                </p>
              </section>
            )}

            {/* Keywords */}
            {keywords.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-marathi text-[var(--dp-muted)] mb-2 uppercase tracking-wider">
                  संबंधित विषय व शब्दसंग्रह:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Saint Card */}
            {composition.saint && (
              <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)]">
                <h3 className="text-xs uppercase tracking-wider text-[var(--dp-muted)] font-marathi mb-2">
                  रचनाकार संत
                </h3>
                <p className="text-lg font-bold text-[var(--dp-gold)] font-marathi mb-1">
                  {composition.saint.nameMarathi}
                </p>
                <p className="text-xs text-[var(--dp-muted)] font-marathi mb-4">
                  {composition.saint.nameTranslit}
                </p>
                <Link
                  href={`/sant/${composition.saint.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] text-xs font-marathi transition-colors min-h-[44px]"
                >
                  संतांचे समग्र साहित्य पहा →
                </Link>
              </div>
            )}

            {/* Actions Card */}
            <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-[var(--dp-muted)] font-marathi mb-1">
                वाचन पर्याय
              </h3>
              <Link
                href={`/abhang/${slug}`}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] hover:border-[var(--dp-gold)] text-xs font-marathi text-[var(--dp-ink)] transition-colors min-h-[44px]"
              >
                <span>मूळ अभंग व कडवी</span>
                <span className="text-[var(--dp-gold)] font-semibold">वाचा →</span>
              </Link>
              <Link
                href="/sanctuary"
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] hover:border-[var(--dp-gold)] text-xs font-marathi text-[var(--dp-ink)] transition-colors min-h-[44px]"
              >
                <span>३D संगीत मंडप</span>
                <span className="text-[var(--dp-gold)] font-semibold">ऐका →</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);
  const composition = await db.composition.findUnique({
    where: { slug },
    select: { titleMarathi: true, titleTranslit: true },
  });
  if (!composition) return { title: 'भावार्थ उपलब्ध नाही | Digital Pandharpur' };
  return {
    title: `${composition.titleMarathi} — सार्थ भावार्थ व विवरण | Digital Pandharpur`,
    description: `${composition.titleMarathi} (${composition.titleTranslit}) अभंगाचा सार्थ भावार्थ, सारांश आणि तात्त्विक चिंतन.`,
    ...canonicalMetadata({ canonical: `/abhang/${slug}/arth` }),
  };
}
