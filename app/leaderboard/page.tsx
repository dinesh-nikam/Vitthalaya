import { Suspense } from 'react';
import Link from 'next/link';
import { Trophy, Users, GitPullRequest, BookOpen, ChevronRight } from 'lucide-react';
import LeaderboardClient from './leaderboard-client';
import '@/app/homepage.css';

export const metadata = {
  title: 'योगदानकर्ते व साधक लीडरबोर्ड | डिजिटल पंढरपूर',
  description:
    'डिजिटल पंढरपूर मधील सर्वोच्च योगदानकर्ते — संत साहित्य जतन व शुद्धीकरण करणारे समर्पित वारकरी साधक.',
  openGraph: {
    title: 'योगदानकर्ते लीडरबोर्ड',
    description: 'संत साहित्य जतन करण्यात मदत करणारे आमचे सर्वोच्च योगदानकर्ते',
    locale: 'mr_IN',
  },
};

export default async function LeaderboardPage() {
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
              <Link href="/community" className="hover:text-[var(--dp-gold)] transition-colors">
                समुदाय
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li className="text-[var(--dp-ink)] font-medium">योगदानकर्ते लीडरबोर्ड</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi rounded-full mb-3">
            <Trophy size={12} />
            साहित्य सेवा गौरव
          </span>
          <h1 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            योगदानकर्ते साधक गौरव फलक
          </h1>
          <p className="text-xs sm:text-sm font-marathi text-[var(--dp-muted)]">
            संत साहित्याचे संपादन, शुद्धीकरण, हस्तलिखित तुलना व ऑडिओ संकलनात अग्रगण्य योगदान देणारे साधक.
          </p>
        </header>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={18} />} label="सक्रिय साधक" value="समुदाय" />
          <StatCard icon={<GitPullRequest size={18} />} label="शुद्धीकरण दुरुस्त्या" value="प्रमाणित" />
          <StatCard icon={<BookOpen size={18} />} label="साहित्य आवृत्त्या" value="अभिलेखागार" />
          <StatCard icon={<Trophy size={18} />} label="साधक सन्मान" value="ज्ञानसेवा" />
        </div>

        <Suspense
          fallback={
            <div className="text-center py-16 text-[var(--dp-muted)] font-marathi">
              माहिती लोड होत आहे...
            </div>
          }
        >
          <LeaderboardClient />
        </Suspense>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="vitthalaya-card rounded-xl border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] p-4 text-center">
      <div className="w-8 h-8 mx-auto mb-2 text-[var(--dp-gold)] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-lg font-bold font-marathi text-[var(--dp-ink)]">{value}</div>
      <div className="text-[11px] font-marathi text-[var(--dp-muted)] mt-0.5">{label}</div>
    </div>
  );
}
