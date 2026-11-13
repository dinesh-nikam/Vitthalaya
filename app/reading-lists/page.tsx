/**
 * Reading Lists — browse public user-curated composition collections.
 */
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '../../src/db/client';
import { BookOpen, ChevronRight, Library, Sparkles, User } from 'lucide-react';
import '@/app/homepage.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'सार्वजनिक वाचन यादी | Digital Pandharpur',
  description:
    'वारकरी भाविक व अभ्यासकांनी संकलित केलेल्या रचनांच्या सार्वजनिक वाचन याद्या. अभंग, भजने, आरत्या, स्तोत्रे व कीर्तन संग्रह.',
  openGraph: {
    title: 'सार्वजनिक वाचन यादी | Digital Pandharpur',
    description: 'वारकरी संप्रदायातील सार्वजनिक वाचन याद्या व संग्रह.',
    locale: 'mr_IN',
  },
};

interface SearchParams {
  searchParams: Promise<{ page?: string }>;
}

export default async function ReadingListsPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const page = parseInt(params.page ?? '1', 10);
  const limit = 21;

  const [lists, total] = await Promise.all([
    db.userCollection.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        user: { select: { id: true, name: true, imageUrl: true } },
        _count: { select: { compositions: true } },
      },
    }),
    db.userCollection.count({ where: { isPublic: true } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-6xl">
        {/* Breadcrumb */}
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
            <li className="text-[var(--dp-ink)] font-medium">वाचन यादी</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
            <Library size={12} />
            वारकरी वाङ्मय संग्रह
          </span>
          <h1 className="vitthalaya-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            सार्वजनिक वाचन यादी
          </h1>
          <p className="text-sm font-marathi text-[var(--dp-muted)] max-w-xl mx-auto">
            भाविकांनी व अभ्यासकांनी संकलित केलेल्या अभंग, भजने, आरत्या व स्तोत्रांच्या सार्वजनिक वाचन याद्या.
          </p>
        </header>

        {/* Collections Grid */}
        {lists.length === 0 ? (
          <div className="vitthalaya-card rounded-2xl p-12 text-center border border-[var(--dp-rule)] bg-[var(--dp-ground-well)]">
            <BookOpen className="w-12 h-12 mx-auto text-[var(--dp-gold)] mb-3 opacity-60" />
            <h2 className="vitthalaya-display text-xl font-bold text-[var(--dp-gold)] mb-1">
              अजून कोणतीही सार्वजनिक वाचन यादी उपलब्ध नाही
            </h2>
            <p className="text-xs font-marathi text-[var(--dp-muted)] mb-6">
              आपल्या आवडत्या रचना निवडून पहिली सार्वजनिक वाचन यादी तयार करा.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs font-marathi hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px]"
            >
              <Sparkles size={14} />
              <span>नवीन संग्रह तयार करा</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/reading-lists/${list.slug}`}
                className="group vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] hover:shadow-lg transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-marathi px-2.5 py-0.5 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)]">
                      {list._count.compositions} रचना
                    </span>
                    <span className="text-[11px] font-mono text-[var(--dp-muted)]">
                      {new Date(list.createdAt).toLocaleDateString('mr-IN', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold font-marathi text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors line-clamp-2 mb-2">
                    {list.name}
                  </h2>

                  {list.description && (
                    <p className="text-xs font-marathi text-[var(--dp-muted)] line-clamp-3 mb-4 leading-relaxed">
                      {list.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[var(--dp-rule)]/40 flex items-center justify-between text-xs font-marathi text-[var(--dp-muted)]">
                  {list.user?.name ? (
                    <span className="flex items-center gap-1.5 truncate max-w-[180px]">
                      <span className="w-5 h-5 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[10px] text-[var(--dp-gold)] font-bold">
                        {list.user.name.charAt(0)}
                      </span>
                      <span className="truncate">{list.user.name}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      <span>वारकरी भाविक</span>
                    </span>
                  )}
                  <span className="text-[var(--dp-gold)] group-hover:translate-x-0.5 transition-transform">
                    वाचा →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="flex justify-center items-center gap-4 mt-10 pt-6 border-t border-[var(--dp-rule)]"
            aria-label="पृष्ठ नेव्हिगेशन"
          >
            {page > 1 && (
              <Link
                href={`/reading-lists?page=${page - 1}`}
                className="px-4 py-2 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] rounded-lg text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px] inline-flex items-center"
              >
                ← मागील पृष्ठ
              </Link>
            )}
            <span className="text-xs font-marathi text-[var(--dp-muted)]">
              पृष्ठ {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/reading-lists?page=${page + 1}`}
                className="px-4 py-2 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] rounded-lg text-xs font-marathi text-[var(--dp-ink)] hover:border-[var(--dp-gold)] transition-colors min-h-[44px] inline-flex items-center"
              >
                पुढील पृष्ठ →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
