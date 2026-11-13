import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/src/db/client';
import { getFestivalsForYear } from '@/src/lib/festival-calculator';
import { canonicalMetadata, festivalSchema } from '@/src/lib/seo';
import { Calendar, Music, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string; year: string }>;
}

export default async function FestivalYearPage({ params }: Props) {
  const rawParams = await params;
  const slug = decodeURIComponent(rawParams.slug);
  const yearStr = rawParams.year;
  const year = parseInt(yearStr, 10);

  if (isNaN(year) || year < 1900 || year > 2100) {
    notFound();
  }

  // Resolve festival name from slug
  const festival = (await db.festival.findUnique({
    where: { nameTranslit: slug.replace(/-/g, ' ') },
    include: {
      compositions: {
        include: {
          composition: {
            select: {
              id: true,
              titleMarathi: true,
              titleTranslit: true,
              slug: true,
              type: true,
              audioLinks: true,
            },
          },
        },
      },
    },
  })) as {
    nameMarathi: string;
    nameTranslit: string;
    compositions: Array<{
      composition: {
        id: string;
        titleMarathi: string;
        titleTranslit: string;
        slug: string;
        type: string;
        audioLinks: string[];
      };
    }> | null;
  } | null;

  if (!festival) {
    notFound();
  }

  // Get festival calendar info for this year
  const yearData = getFestivalsForYear(year);
  const festInfo = yearData.find((f) => f.name === slug.replace(/-/g, '_'));

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              festivalSchema(
                {
                  nameMarathi: festival.nameMarathi,
                  nameTranslit: festival.nameTranslit,
                  slug: slug,
                  date: festInfo?.date ?? null,
                  compositionCount: festival.compositions?.length ?? 0,
                },
                [
                  { name: 'मुख्यपृष्ठ', path: '/' },
                  { name: festival.nameMarathi, path: `/festival/${slug}` },
                  { name: `${year}`, path: `/festival/${slug}/${year}` },
                ],
              ),
            ),
          }}
        />

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
              <Link href="/festival" className="hover:text-[var(--dp-gold)] transition-colors">
                सण व उत्सव
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li>
              <Link
                href={`/festival/${slug}`}
                className="hover:text-[var(--dp-gold)] transition-colors"
              >
                {festival.nameMarathi}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">{year}</li>
          </ol>
        </nav>

        {/* Header Card */}
        <header className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center shadow-lg mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[var(--dp-gold)]">
            <Calendar className="w-8 h-8" aria-hidden="true" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
            <Sparkles size={11} />
            वारकरी उत्सव दिनदर्शिका
          </span>

          <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold mb-2">
            {festival.nameMarathi} — {year}
          </h1>

          <p className="text-sm font-marathi text-[var(--dp-muted)] mb-3">
            {festival.nameTranslit} ({year})
          </p>

          {festInfo?.date && (
            <p className="text-sm font-marathi text-[var(--dp-gold)] font-medium mb-6">
              दिनांक:{' '}
              {festInfo.date.toLocaleDateString('mr-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}

          {/* Year navigation */}
          <nav
            className="flex items-center justify-center gap-3 pt-3 border-t border-[var(--dp-rule)]/50"
            aria-label="वर्ष निवड"
          >
            <Link
              href={`/festival/${slug}/${year - 1}`}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-marathi rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{year - 1}</span>
            </Link>

            <span className="px-4 py-2 text-xs font-marathi font-bold rounded-lg bg-[var(--dp-gold)] text-[#0d0906] min-h-[44px] inline-flex items-center">
              वर्ष {year}
            </span>

            <Link
              href={`/festival/${slug}/${year + 1}`}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-marathi rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
            >
              <span>{year + 1}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </header>

        {/* Compositions for this festival */}
        <section aria-labelledby="festival-compositions" className="space-y-4">
          <h2
            id="festival-compositions"
            className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)] mb-4"
          >
            {festival.nameMarathi} साठी विहित साहित्य
          </h2>

          {(festival.compositions ?? []).length === 0 ? (
            <div className="vitthalaya-card rounded-2xl p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center">
              <p className="text-xs font-marathi text-[var(--dp-muted)]">
                या सणासाठी अजून विशिष्ट अभंग जोडलेले नाहीत.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {(festival.compositions ?? []).map((item) => {
                const composition = item.composition;
                return (
                  <Link
                    key={composition.id}
                    href={`/abhang/${composition.slug}`}
                    className="vitthalaya-card rounded-xl p-4 sm:p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)] min-h-[56px]"
                  >
                    <div>
                      <p className="font-bold font-marathi text-base text-[var(--dp-ink)]">
                        {composition.titleMarathi}
                      </p>
                      <p className="text-xs font-marathi text-[var(--dp-muted)] mt-0.5">
                        {composition.type} • {composition.titleTranslit}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {composition.audioLinks && composition.audioLinks.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-marathi text-[var(--dp-gold)]">
                          <Music size={13} />
                          स्वर
                        </span>
                      )}
                      <ChevronRight size={14} className="text-[var(--dp-muted)]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Back to main festival page */}
        <div className="mt-10 text-center">
          <Link
            href={`/festival/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-marathi text-[var(--dp-gold)] hover:underline min-h-[44px]"
          >
            ← {festival.nameMarathi} मुख्य दालनावर परत जा
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const rawParams = await params;
  const slug = decodeURIComponent(rawParams.slug);
  const year = rawParams.year;

  const festival = (await db.festival.findUnique({
    where: { nameTranslit: slug.replace(/-/g, ' ') },
  })) as { nameMarathi: string; nameTranslit: string } | null;

  if (!festival) {
    return { title: 'सण सापडला नाही | Digital Pandharpur' };
  }

  return {
    title: `${festival.nameMarathi} ${year} | Digital Pandharpur`,
    description: `${festival.nameMarathi} ${year} — डिजिटल पंढरपूर वर ${festival.nameTranslit} उत्सव तिथी, मुहूर्त व संबंधित संत साहित्य.`,
    ...canonicalMetadata({ canonical: `/festival/${slug}/${year}` }),
    openGraph: {
      title: `${festival.nameMarathi} ${year}`,
      description: `${festival.nameTranslit} ${year} सणासाठी साहित्य`,
      type: 'article',
      locale: 'mr_IN',
    },
  };
}
