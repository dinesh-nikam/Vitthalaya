import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { db } from '../../../src/db/client';
import { ArrowLeft, BookOpen, ChevronRight, Heart, Sparkles } from 'lucide-react';
import '@/app/homepage.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CollectionDetailPage({ params }: Props) {
  const rawSlug = await params;
  const slug = decodeURIComponent(rawSlug.slug);

  const collection = await db.userCollection.findUnique({
    where: { slug },
    include: {
      user: { select: { id: true, name: true, imageUrl: true } },
      compositions: {
        include: {
          composition: {
            select: {
              id: true,
              titleMarathi: true,
              type: true,
              slug: true,
              saint: { select: { nameMarathi: true, slug: true } },
            },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
      bookPublication: { select: { id: true, slug: true, titleMarathi: true, status: true } },
    },
  });

  if (!collection) notFound();

  // Check authorization for private collections
  if (!collection.isPublic) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { id: string }).id !== collection.userId) {
      notFound();
    }
  }

  const saints = [
    ...new Set(
      collection.compositions
        .map((c) => c.composition.saint?.nameMarathi)
        .filter((name): name is string => Boolean(name)),
    ),
  ];

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
              <Link href="/collections" className="hover:text-[var(--dp-gold)] transition-colors">
                संग्रह
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium truncate max-w-xs">{collection.name}</li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-marathi border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#110c08] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>सर्व संग्रहांकडे परत</span>
          </Link>
        </div>

        {/* Header Card */}
        <header className="vitthalaya-card rounded-2xl p-6 sm:p-8 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-lg mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] text-[var(--dp-gold)] font-marathi">
                  {collection.isPublic ? 'सार्वजनिक संग्रह' : 'वैयक्तिक संग्रह'}
                </span>
                {collection.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--dp-gold)]/15 border border-[var(--dp-gold)]/40 text-[var(--dp-gold)] text-xs font-marathi">
                    <Sparkles size={11} />
                    प्रदर्शित
                  </span>
                )}
              </div>

              <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {collection.name}
              </h1>

              {collection.description && (
                <p className="text-sm font-marathi text-[var(--dp-muted)] leading-relaxed mb-4 max-w-2xl">
                  {collection.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs font-marathi text-[var(--dp-muted)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[var(--dp-ground-elevated)] border border-[var(--dp-rule)] flex items-center justify-center text-[10px] text-[var(--dp-gold)] font-bold">
                    {collection.user?.name?.charAt(0) ?? '?'}
                  </span>
                  <span>{collection.user?.name ?? 'वारकरी संकलक'}</span>
                </div>
                <span>•</span>
                <span>{collection.compositions.length} रचना</span>
                {saints.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{saints.length} संत</span>
                  </>
                )}
                {collection.likes > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[var(--dp-gold)]">
                      <Heart size={12} />
                      {collection.likes}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {collection.bookPublication && (
            <div className="mt-6 p-4 rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-marathi">
                <BookOpen size={16} className="text-[var(--dp-gold)]" />
                <span className="text-[var(--dp-ink)]">
                  या संग्रहावरून मुद्रित पुस्तक तयार केले आहे:
                  <strong className="text-[var(--dp-gold)] ml-1">
                    {collection.bookPublication.titleMarathi}
                  </strong>
                </span>
              </div>
              <Link
                href={`/books/${collection.bookPublication.slug}`}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--dp-gold)] text-[#0d0906] font-semibold text-xs font-marathi hover:bg-[var(--dp-gold-celestial)] transition-colors min-h-[44px] inline-flex items-center"
              >
                पुस्तक पहा →
              </Link>
            </div>
          )}
        </header>

        {/* Compositions List */}
        <section aria-labelledby="composition-heading" className="space-y-4">
          <h2
            id="composition-heading"
            className="vitthalaya-display text-lg font-bold text-[var(--dp-gold)] mb-4"
          >
            रचना सूची ({collection.compositions.length})
          </h2>

          <div className="space-y-3">
            {collection.compositions.map((bc, i) => (
              <div
                key={bc.id}
                className="vitthalaya-card rounded-xl p-4 sm:p-5 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] hover:border-[var(--dp-gold)] transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-[var(--dp-muted)] w-6 shrink-0 text-right">
                    {i + 1}.
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/${bc.composition.type.toLowerCase()}/${bc.composition.slug}`}
                      className="font-bold font-marathi text-sm sm:text-base text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors truncate block"
                    >
                      {bc.composition.titleMarathi}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-xs font-marathi text-[var(--dp-muted)]">
                      <span className="capitalize">{bc.composition.type}</span>
                      {bc.composition.saint && (
                        <>
                          <span>•</span>
                          <span>संत {bc.composition.saint.nameMarathi}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${bc.composition.type.toLowerCase()}/${bc.composition.slug}`}
                  className="shrink-0 px-3 py-1.5 rounded-lg border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#0d0906] text-xs font-marathi transition-colors min-h-[44px] inline-flex items-center"
                >
                  वाचा
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
