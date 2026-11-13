import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/src/db/client';
import { ArrowLeft, ChevronRight, User } from 'lucide-react';
import '@/app/homepage.css';

export const dynamic = 'force-dynamic';

async function getPage(slug: string) {
  const page = await db.page.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true } },
      tags: { include: { tag: true } },
      featuredImage: true,
    },
  });
  if (!page || page.status !== 'PUBLISHED') return null;
  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: 'पृष्ठ सापडले नाही | Digital Pandharpur' };

  const title = page.seoTitle || page.titleMarathi || page.title;
  const description = page.seoDescription || page.excerpt || undefined;
  const url = page.canonicalUrl || `/pages/${page.slug}`;

  return {
    title: `${title} | Digital Pandharpur`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: page.ogImageUrl
        ? [{ url: page.ogImageUrl }]
        : page.featuredImage
        ? [{ url: page.featuredImage.url }]
        : undefined,
      locale: 'mr_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <article className="vitthalaya-container max-w-3xl">
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
            <li className="text-[var(--dp-ink)] font-medium truncate max-w-xs">
              {page.titleMarathi || page.title}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-xs font-marathi text-[var(--dp-gold)] hover:bg-[var(--dp-gold)] hover:text-[#0d0906] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={14} />
            <span>मुख्य मंदिराकडे परत</span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="vitthalaya-card rounded-2xl p-6 sm:p-10 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-xl space-y-6">
          {page.featuredImage && (
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-[var(--dp-rule)]">
              <Image
                src={page.featuredImage.url}
                alt={page.featuredImage.altText || page.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div>
            <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {page.titleMarathi || page.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs font-marathi text-[var(--dp-muted)] pt-1 border-t border-[var(--dp-rule)]/40">
              {page.author?.name && (
                <span className="flex items-center gap-1">
                  <User size={12} />
                  <span>लेखक: {page.author.name}</span>
                </span>
              )}
              {page.publishedAt && (
                <span>
                  • प्रकाशित:{' '}
                  {new Date(page.publishedAt).toLocaleDateString('mr-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>

          {page.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {page.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="px-2.5 py-1 rounded-full text-xs font-marathi border border-[var(--dp-rule)] bg-[var(--dp-ground-elevated)] text-[var(--dp-gold)]"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {page.excerpt && (
            <div className="p-4 sm:p-5 rounded-xl border-l-4 border-[var(--dp-gold)] bg-[var(--dp-ground-elevated)] text-sm sm:text-base font-marathi text-[var(--dp-ink)] italic leading-relaxed">
              {page.excerpt}
            </div>
          )}

          <div className="text-sm sm:text-base font-marathi text-[var(--dp-ink)] leading-loose whitespace-pre-wrap space-y-4">
            {page.content}
          </div>
        </div>
      </article>
    </div>
  );
}
