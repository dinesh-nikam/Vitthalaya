import { notFound } from 'next/navigation';
import Link from 'next/link';
import '@/src/db/client';
import { resolveCanonicalQuery } from '@/src/lib/canonical-queries';
import { searchCompositions } from '@/src/lib/search-client';
import { canonicalMetadata } from '@/src/lib/seo';
import { ChevronRight, Music, Search, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ query: string }>;
}

export default async function CanonicalSearchPage({ params }: Props) {
  const rawParams = await params;
  const query = decodeURIComponent(rawParams.query);

  // Resolve canonical query — if it doesn't match a known entity, redirect to main search
  const canonicalQuery = await resolveCanonicalQuery(query);
  if (!canonicalQuery) {
    notFound();
  }

  // Fetch compositions from Meilisearch using the canonical query label
  const results = await searchCompositions(canonicalQuery.labelTranslit, {});

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl">
        {/* JSON-LD for SearchResultsPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SearchResultsPage',
              name: `${canonicalQuery.label} - शोध निकाल`,
              description: `${canonicalQuery.label} यासाठीचे साहित्य — अभंग, भजन, आरत्या आणि अधिक`,
              inLanguage: 'mr',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: results.slice(0, 10).map((r, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://digitalpandharpur.com'}/abhang/${r.slug}`,
                })),
              },
            }),
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
              <Link href="/search" className="hover:text-[var(--dp-gold)] transition-colors">
                शोध
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">{canonicalQuery.label}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 text-xs font-marathi rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)]">
              <Sparkles size={11} />
              {canonicalQuery.source === 'saint' && 'संत साहित्य शोध'}
              {canonicalQuery.source === 'category' && 'श्रेणी शोध'}
              {canonicalQuery.source === 'type' && 'काव्यप्रकार शोध'}
              {canonicalQuery.source === 'deity' && 'देवता साहित्य'}
              {canonicalQuery.source === 'festival' && 'उत्सव व सण'}
            </span>
          </div>

          <h1 className="vitthalaya-display text-3xl sm:text-4xl font-bold mb-1">
            {canonicalQuery.label}
          </h1>

          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            {canonicalQuery.labelTranslit}
            {results.length > 0 && <span> • एकूण {results.length} रचना उपलब्ध</span>}
          </p>
        </header>

        {/* Results */}
        {results.length === 0 ? (
          <div className="vitthalaya-card rounded-2xl p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center">
            <Search className="w-10 h-10 mx-auto text-[var(--dp-gold)] opacity-40 mb-3" />
            <p className="text-sm font-marathi text-[var(--dp-muted)]">
              {canonicalQuery.label} या विषयासाठी थेट रचना आढळल्या नाहीत.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/abhang/${result.slug}`}
                className="vitthalaya-card rounded-xl p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-marathi px-2 py-0.5 rounded bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)]">
                    {result.type}
                  </span>
                  {result.hasAudio && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-marathi text-[var(--dp-gold)]">
                      <Music size={12} />
                      स्वर
                    </span>
                  )}
                </div>

                <h2 className="font-marathi font-bold text-base sm:text-lg text-[var(--dp-ink)] mb-1 line-clamp-2">
                  {result.titleMarathi}
                </h2>

                <p className="text-xs font-marathi text-[var(--dp-muted)] mb-3">
                  {result.titleTranslit}
                </p>

                <p className="text-xs font-marathi text-[var(--dp-ink)]/80 line-clamp-3 mb-4 leading-relaxed">
                  {result.fullText}...
                </p>

                <div className="flex justify-between items-center text-xs font-marathi pt-2 border-t border-[var(--dp-rule)]/50 text-[var(--dp-muted)]">
                  <span className="text-[var(--dp-gold)]">{result.saintName}</span>
                  <span>{result.deityName}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Navigation links to entity pages */}
        <nav
          className="mt-10 pt-8 border-t border-[var(--dp-rule)]"
          aria-label="संबंधित दालने"
        >
          <h2 className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] mb-4">
            संबंधित दालने
          </h2>
          <div className="flex flex-wrap gap-3">
            {canonicalQuery.source === 'saint' && (
              <Link
                href={`/sant/${canonicalQuery.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
              >
                {canonicalQuery.label} यांचे चरित्र व गाथा →
              </Link>
            )}
            {canonicalQuery.source === 'category' && (
              <Link
                href={`/category/${canonicalQuery.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
              >
                {canonicalQuery.label} काव्यश्रेणी →
              </Link>
            )}
            {canonicalQuery.source === 'festival' && (
              <Link
                href={`/festival/${canonicalQuery.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
              >
                {canonicalQuery.label} उत्सव दर्शन →
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px]"
            >
              मुख्य मंदिराकडे परत
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const rawParams = await params;
  const query = decodeURIComponent(rawParams.query);
  const canonicalQuery = await resolveCanonicalQuery(query);

  if (!canonicalQuery) {
    return { title: 'शोध निकाल | Digital Pandharpur' };
  }

  return {
    title: `${canonicalQuery.label} : शोध निकाल | Digital Pandharpur`,
    description: `${canonicalQuery.label} (${canonicalQuery.labelTranslit}) या विषयावरील अधिकृत संत वाङ्मय, अभंग, भजने व आरत्या.`,
    ...canonicalMetadata({ canonical: `/search/${query}` }),
    openGraph: {
      title: `${canonicalQuery.label} : शोध`,
      description: `${canonicalQuery.label} यासाठीचे समग्र साहित्य`,
      type: 'website',
      locale: 'mr_IN',
    },
  };
}
