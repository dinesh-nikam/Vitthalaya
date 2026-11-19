'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Compass,
  Music,
  ArrowRight,
  Disc,
  Play,
  Camera,
  Sparkles,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { SaintCardVisual } from '@/components/saint-card-visual';
import { DevotionalPrahar } from '@/components/devotional-prahar';
const SanctumExperience = dynamic(
  () => import('@/components/3d/sanctum-experience').then((mod) => mod.SanctumExperience),
  { ssr: false }
);
const Vitthalaya3DSanctuary = dynamic(
  () => import('@/components/3d/vitthalaya-3d-sanctuary').then((mod) => mod.Vitthalaya3DSanctuary),
  { ssr: false }
);
import { WariInteractiveRoute } from '@/components/wari-interactive-route';
import { SanctumGateway } from '@/components/cinematic/sanctum-gateway';
import { SoundController } from '@/components/cinematic/sound-controller';
const ParticleCanvas = dynamic(
  () => import('@/components/cinematic/particle-canvas').then((mod) => mod.ParticleCanvas),
  { ssr: false }
);
import { AnimatedSacredGallery } from '@/components/cinematic/animated-sacred-gallery';
import { HeroSacredShowcase } from '@/components/cinematic/hero-sacred-showcase';
import { WariAnimatedShowcase } from '@/components/cinematic/wari-animated-showcase';
import { SacredHeritagePhotoWall } from '@/components/cinematic/sacred-heritage-photo-wall';
import { TanpuraDrone } from '@/components/tanpura-drone';
import { useScrollReveal } from '@/components/cinematic/use-scroll-reveal';
import '@/app/homepage.css';

export interface Saint {
  id: string;
  nameMarathi: string;
  nameTranslit: string;
  slug: string;
  period: string | null;
  biography: string | null;
  region: string | null;
}

export interface Category {
  slug: string;
  nameMarathi: string;
  count: number;
}

export interface FeaturedComposition {
  id: string;
  titleMarathi: string;
  titleTranslit: string | null;
  slug: string;
  fullText: string;
  type: string;
  saint: {
    id?: string;
    nameMarathi: string;
    slug: string;
  } | null;
}

export interface AudioItem {
  id: string;
  titleMarathi: string;
  titleTranslit: string | null;
  duration: number | null;
  audioUrl: string;
  performer: string | null;
}

export interface VitthalayaPilgrimageProps {
  saints: Saint[];
  categories: Category[];
  totalBooks: number;
  totalCompositions: number;
  featuredComposition?: FeaturedComposition | null;
  recentAudios?: AudioItem[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  abhang: '/images/realistic/warkari-talkari.jpg',
  bhajan: '/images/realistic/wari-udi-bhajan.jpg',
  aarti: '/images/categories/aarti.jpg',
  stotra: '/images/categories/stotra.jpg',
  haripath: '/images/categories/haripath.jpg',
  gaulani: '/images/categories/gaulani.jpg',
  bharud: '/images/realistic/bharud-performance.jpg',
  default: '/images/realistic/ancient-manuscript.jpg',
};

export function VitthalayaPilgrimage({
  saints,
  categories,
  totalBooks,
  totalCompositions,
  featuredComposition,
  recentAudios = [],
}: VitthalayaPilgrimageProps) {
  const [query, setQuery] = React.useState('');

  // Lite mode / Low-Data detection state (Addition A-01)
  const [isLiteMode, setIsLiteMode] = React.useState<boolean>(false);
  const [isClientMounted, setIsClientMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClientMounted(true);
    try {
      const stored = localStorage.getItem('dp_lite_mode_enabled');
      if (stored !== null) {
        setIsLiteMode(stored === 'true');
        return;
      }
      const nav = navigator as any;
      const isLowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4;
      const isSaveData = nav.connection?.saveData === true;
      const isLowConcurrency = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
      if (isLowMemory || isSaveData || isLowConcurrency) {
        setIsLiteMode(true);
      }
    } catch {}
  }, []);

  const toggleLiteMode = () => {
    const next = !isLiteMode;
    setIsLiteMode(next);
    try {
      localStorage.setItem('dp_lite_mode_enabled', String(next));
    } catch {}
  };

  // ── Cinematic gateway + sound state ──────────────────────
  const [showGateway, setShowGateway] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('dp_gateway_seen');
  });
  const [awakened, setAwakened] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return !!sessionStorage.getItem('dp_gateway_seen');
  });
  const router = useRouter();
  const [soundPlaying, setSoundPlaying] = React.useState(false);

  const handleAwakened = React.useCallback(() => {
    setShowGateway(false);
    setAwakened(true);
    setSoundPlaying(true);
  }, []);

  // ── Scroll-reveal refs for each act ──────────────────────
  const heroRef      = useScrollReveal<HTMLElement>(0.05);
  const saintsRef    = useScrollReveal<HTMLElement>(0.08);
  const audioRef     = useScrollReveal<HTMLElement>(0.08);
  const genresRef    = useScrollReveal<HTMLElement>(0.08);
  const wariRef      = useScrollReveal<HTMLElement>(0.08);
  const booksRef     = useScrollReveal<HTMLElement>(0.08);
  const heritageRef  = useScrollReveal<HTMLElement>(0.08);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePlayAudio = (audio: AudioItem) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('play-track', {
          detail: {
            id: audio.id,
            titleMarathi: audio.titleMarathi,
            titleTranslit: audio.titleTranslit || audio.titleMarathi,
            saintName: audio.performer || 'वारकरी गायक',
            audioUrl: audio.audioUrl,
          },
        })
      );
    }
  };

  return (
    <div className="vitthalaya-shell">
      {/* ── 0. Cinematic gateway (once per session) ── */}
      {showGateway && <SanctumGateway onAwakened={handleAwakened} />}

      {/* ── Headless tanpura drone — controlled by SoundController ── */}
      {awakened && (
        <TanpuraDrone
          isActive={soundPlaying}
          onStateChange={setSoundPlaying}
          hidden
        />
      )}

      {/* ── Floating sound controller (shown after awakening) ── */}
      {awakened && (
        <SoundController
          isPlaying={soundPlaying}
          onToggle={() => setSoundPlaying((p) => !p)}
        />
      )}
      {/* ── 1. Sacred Sanctuary Hero (cinematic upgrade) ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[var(--dp-rule)]"
        style={{
          paddingTop: 'var(--dp-hero-padding-top)',
          paddingBottom: 'var(--dp-act-padding)',
          backgroundImage: `
            linear-gradient(to bottom, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.78) 50%, rgba(10,8,6,0.97) 100%),
            url('/images/hero-bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
        aria-labelledby="hero-title"
      >
        {/* Ambient gold-dust particle field */}
        {!isLiteMode && isClientMounted && (
          <ParticleCanvas
            count={30}
            className="absolute inset-0 pointer-events-none"
          />
        )}

        {/* Radial gold halo behind the title */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(246,188,85,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="vitthalaya-container text-center relative z-10">
          <p className="text-xs font-marathi text-[var(--dp-gold-celestial)] mb-4">
            ज्ञानोबा तुकाराम · डिजिटल पंढरपूर
          </p>

          <h1
            id="hero-title"
            className="dp-epic-title dp-gold-text mb-6 max-w-5xl mx-auto"
          >
            वारकरी भक्तीचे डिजिटल मंदिर
          </h1>

          <p className="vitthalaya-prose text-base sm:text-lg max-w-2xl mx-auto mb-10 text-[var(--dp-ink-dim)]">
            संतसाहित्य, अभंग, ग्रंथ आणि वारीचा {totalCompositions.toLocaleString('en-IN')} हून अधिक रचनांचा अधिकृत डिजिटल संग्रह.
          </p>

          {/* Primary Search Action */}
          <div className="max-w-xl mx-auto mb-8">
            <form onSubmit={handleSearch} action="/search" method="get" role="search" className="vitthalaya-search-bar">
              <div className="pl-4 pr-2 text-[var(--dp-muted)]" aria-hidden="true">
                <Search size={18} />
              </div>
              <label htmlFor="search-input" className="sr-only">
                अभंग, संत, किंवा विषय शोधा
              </label>
              <input
                id="search-input"
                name="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="अभंग, संत, किंवा विषय शोधा..."
                aria-label="अभंग, संत, किंवा विषय शोधा"
                className="vitthalaya-search-input text-base"
                autoComplete="off"
              />
              <button
                type="submit"
                className="vitthalaya-btn-primary m-1 px-5 py-2 text-sm active:translate-y-px"
              >
                शोधा
              </button>
            </form>
          </div>

          {/* Direct Category Links */}
          <nav aria-label="मुख्य विभाग" className="flex flex-wrap justify-center gap-3 text-sm mb-12">
            <Link
              href="/search"
              className="px-4 py-2 rounded border border-[var(--dp-rule)] text-[var(--dp-ink-dim)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              सर्व अभंग
            </Link>
            <Link
              href="/sant"
              className="px-4 py-2 rounded border border-[var(--dp-rule)] text-[var(--dp-ink-dim)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              संत परिचय
            </Link>
            <Link
              href="/daily"
              className="px-4 py-2 rounded border border-[var(--dp-gold)] text-[var(--dp-gold)] font-bold hover:bg-[var(--dp-gold)]/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              नित्य भक्ती
            </Link>
            <Link
              href="/sanctuary"
              className="px-4 py-2 rounded border border-[var(--dp-gold)] text-[var(--dp-gold)] font-bold hover:bg-[var(--dp-gold)]/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px flex items-center gap-1.5"
            >
              <Compass size={14} className="text-[var(--dp-gold)]" aria-hidden="true" />
              <span className="font-manthan">३D संगीत मंडप</span>
            </Link>
            <Link
              href="/wari"
              className="px-4 py-2 rounded border border-[var(--dp-rule)] text-[var(--dp-ink-dim)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              आषाढी वारी
            </Link>
            <Link
              href="/books"
              className="px-4 py-2 rounded border border-[var(--dp-rule)] text-[var(--dp-ink-dim)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              पवित्र ग्रंथ
            </Link>
            <Link
              href="/collections"
              className="px-4 py-2 rounded border border-[var(--dp-rule)] text-[var(--dp-ink-dim)] hover:border-[var(--dp-gold)] hover:text-[var(--dp-ink)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
            >
              ध्वनिमुद्रण संग्रह
            </Link>
            <Link
              href="#heritage-gallery-title"
              className="px-4 py-2 rounded border border-[var(--dp-gold)] text-[var(--dp-gold)] font-bold hover:bg-[var(--dp-gold)]/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px flex items-center gap-1.5"
            >
              <Camera size={14} className="text-[var(--dp-gold)]" aria-hidden="true" />
              <span>छायाचित्र दालन</span>
            </Link>
          </nav>

          {/* Real-time Devotional Prahar & Meditative Soundscape */}
          <div className="max-w-4xl mx-auto text-left">
            <DevotionalPrahar />
          </div>

          {/* Cinematic Animated Sacred Showcase (Breathing High-Resolution Realistic Imagery) */}
          <div className="max-w-5xl mx-auto">
            <HeroSacredShowcase />
          </div>
        </div>
      </section>

      {/* ── 2. Interactive 3D Sanctum Experience ── */}
      <section className="vitthalaya-section vitthalaya-section-well" aria-labelledby="sanctum-heading">
        <div className="vitthalaya-container">
          {isLiteMode ? (
            <div className="vitthalaya-card rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-[var(--dp-rule)] bg-[var(--dp-ground-well)]">
              <div className="max-w-xl mx-auto space-y-4">
                <span className="inline-block px-3 py-1 bg-[var(--dp-ground)] text-[var(--dp-gold)] text-xs font-marathi rounded-full border border-[var(--dp-rule)]">
                  श्री विठ्ठल दर्शन (हलकी आवृत्ती)
                </span>
                <h3 className="vitthalaya-display text-2xl sm:text-3xl font-bold text-[var(--dp-gold)]">
                  सुंदर ते ध्यान उभे विटेवरी
                </h3>
                <p className="text-sm font-marathi text-[var(--dp-muted)] leading-relaxed">
                  कर कटावरी ठेवोनिया । तुळसी हार गळां कासे पितांबर । आवडे निरंतर हेचि ध्यान ॥
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/abhang/sundar-te-dhyan-ubhe-vitevari"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--dp-gold)] text-[var(--dp-ground-deep)] font-marathi text-sm font-semibold rounded hover:brightness-110 transition-all"
                  >
                    <span>संपूर्ण अभंग वाचा</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={toggleLiteMode}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--dp-ground)] border border-[var(--dp-rule)] text-[var(--dp-ink)] font-marathi text-sm rounded hover:border-[var(--dp-gold)] transition-colors"
                  >
                    <Sparkles size={14} className="text-[var(--dp-gold)]" />
                    <span>३D मूर्ती दर्शन सुरू करा</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <SanctumExperience />
          )}
        </div>
      </section>

      {/* ── 2B. Animated Sacred Cultural Gallery (Cinematic Showcase) ── */}
      <AnimatedSacredGallery />

      {/* ── 3. Featured Verse Excerpt (Real Material) ── */}
      {featuredComposition && (
        <section className="vitthalaya-section" aria-labelledby="featured-verse-title">
          <div className="vitthalaya-container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[var(--dp-gold)] font-marathi">
                  दैनंदिन अभंग दर्शन
                </span>
                {featuredComposition.saint && (
                  <Link
                    href={`/sant/${featuredComposition.saint.slug}`}
                    className="text-xs text-[var(--dp-muted)] hover:text-[var(--dp-gold)] transition-colors font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
                  >
                    {featuredComposition.saint.nameMarathi}
                  </Link>
                )}
              </div>

              <div className="vitthalaya-manuscript rounded-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-[var(--dp-rule)] shadow-xl relative overflow-hidden">
                <div className="md:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--dp-rule)] shadow-inner">
                  <Image
                    src="/images/realistic/ancient-manuscript.jpg"
                    alt={featuredComposition.titleMarathi}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded text-[11px] font-marathi bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs">
                    मूळ हस्तलिखित संदर्भ
                  </span>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <h2 id="featured-verse-title" className="vitthalaya-display text-2xl sm:text-3xl font-bold">
                    {featuredComposition.titleMarathi}
                  </h2>

                  <p className="vitthalaya-verse-text mb-6">
                    {featuredComposition.fullText.slice(0, 320)}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--dp-rule)]">
                    <Link
                      href={`/abhang/${featuredComposition.slug}`}
                      className="vitthalaya-btn-primary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
                    >
                      पूर्ण अभंग वाचा
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    {featuredComposition.saint && (
                      <Link
                        href={`/sant/${featuredComposition.saint.slug}`}
                        className="vitthalaya-btn-secondary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
                      >
                        संत चरित्राकडे जा
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Saints of Bhakti ── */}
      <section ref={saintsRef} className="vitthalaya-section vitthalaya-section-well" aria-labelledby="saints-heading">
        <div className="vitthalaya-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                वारकरी परंपरा · संत मांदियाळी
              </p>
              <h2 id="saints-heading" className="vitthalaya-display font-manthan text-2xl sm:text-3xl font-bold">
                संत मांदियाळी — भक्ती चळवळीचे मार्गदर्शक संत
              </h2>
            </div>
            <Link
              href="/sant"
              className="text-sm text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1 font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            >
              सर्व संत पहा ({saints.length})
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saints.map((saint) => (
              <Link
                key={saint.id}
                href={`/sant/${saint.slug}`}
                className="dp-saint-card block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
              >
                <SaintCardVisual
                  slug={saint.slug}
                  nameMarathi={saint.nameMarathi}
                  nameTranslit={saint.nameTranslit}
                  period={saint.period}
                  region={saint.region}
                />
                <div className="p-4">
                  <h3 className="vitthalaya-display text-lg font-bold text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                    {saint.nameMarathi}
                  </h3>
                    <p className="text-xs text-[var(--dp-muted)] font-marathi mt-0.5">
                      {saint.period || 'भक्ती कालखंड'}
                      {saint.region ? ` • ${saint.region}` : ''}
                    </p>
                    <p className="text-xs text-[var(--dp-ink-dim)] line-clamp-2 mt-2 font-marathi leading-relaxed">
                      {saint.biography || `${saint.nameMarathi} यांचे अध्यात्मिक विचार व अभंग रचना.`}
                    </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Devotional Audio & Archives (Listen Action) ── */}
      <section ref={audioRef} className="vitthalaya-section" aria-labelledby="audio-heading">
        <div className="vitthalaya-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                श्राव्य वारसा · ३D संगीत मंडप
              </p>
              <h2 id="audio-heading" className="vitthalaya-display font-manthan text-2xl sm:text-3xl font-bold">
                ३D संगीत मंडप : भजन व कीर्तन संग्रह
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-sm text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1 font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            >
              संपूर्ण ध्वनिसंग्रह
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {recentAudios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentAudios.map((audio, index) => {
                const coverImages = [
                  '/images/categories/bhajan.jpg',
                  '/images/categories/abhang.jpg',
                  '/images/realistic/temple-aarti.jpg',
                ];
                const coverImg = coverImages[index % coverImages.length];

                return (
                  <div
                    key={audio.id}
                    className="vitthalaya-card rounded-xl overflow-hidden group border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--dp-ground-well)] dp-shimmer-container">
                      <Image
                        src={coverImg}
                        alt={audio.titleMarathi}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/40 to-transparent pointer-events-none" />

                      {/* Animated spinning vinyl disc badge that expands on hover */}
                      <div className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/75 border border-[var(--dp-gold)] flex items-center justify-center text-[var(--dp-gold)] backdrop-blur-sm shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(246,188,85,0.4)]">
                        <Disc size={22} className="animate-[spin_10s_linear_infinite]" aria-hidden="true" />
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-marathi z-10">
                        <span className="px-2 py-0.5 rounded bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs flex items-center gap-1 shadow-sm">
                          <Music size={12} aria-hidden="true" />
                          पवित्र ध्वनिमुद्रण
                        </span>
                        {audio.duration && (
                          <span className="px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                            {Math.floor(audio.duration / 60)}:{(audio.duration % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="vitthalaya-display text-lg font-bold mb-1 text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors line-clamp-1">
                          {audio.titleMarathi}
                        </h3>
                        {audio.performer && (
                          <p className="text-xs text-[var(--dp-muted)] font-marathi">
                            गायक: {audio.performer}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-[var(--dp-rule)] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(audio)}
                          className="vitthalaya-btn-primary text-xs inline-flex items-center gap-1.5 py-1.5 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
                          aria-label={`${audio.titleMarathi} ऐका`}
                        >
                          <Play size={12} className="fill-current" aria-hidden="true" />
                          <span>ऐका</span>
                        </button>
                        <div className="flex items-center gap-1 text-[var(--dp-gold)]" aria-label="ऑडिओ लहरी">
                          <span className="dp-wave-bar h-4" />
                          <span className="dp-wave-bar h-5" />
                          <span className="dp-wave-bar h-3" />
                          <span className="dp-wave-bar h-6" />
                          <span className="dp-wave-bar h-4" />
                          <span className="text-[11px] text-[var(--dp-muted)] font-marathi ml-1.5">
                            ध्वनी नाद
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="vitthalaya-card rounded p-8 text-center max-w-2xl mx-auto border border-[var(--dp-rule)] mb-8">
              <Disc className="w-10 h-10 text-[var(--dp-gold)] mx-auto mb-3" aria-hidden="true" />
              <h3 className="vitthalaya-display text-xl font-bold mb-2">
                ध्वनिमुद्रण डिजिटायझेशन सुरू आहे
              </h3>
              <p className="vitthalaya-prose text-sm text-[var(--dp-ink-dim)] mb-6">
                मंदिरांमधील दुर्मिळ कीर्तने व शास्त्रीय भजनांचे डिजिटायझेशन प्रगतिपथावर आहे. आपल्याकडे जुने ध्वनिमुद्रण असल्यास संग्रहात सहकार्य करा.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/acquire/upload" className="vitthalaya-btn-primary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  ध्वनिमुद्रण सादर करा
                </Link>
                <Link href="/collections" className="vitthalaya-btn-secondary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  उपलब्ध सूची पहा
                </Link>
              </div>
            </div>
          )}

          {/* 3D Sacred Music Sanctuary (All Scraped Regional Compositions) */}
          <div className="mt-8">
            {isLiteMode ? (
            <div className="vitthalaya-card rounded-2xl p-6 border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] text-center">
              <p className="text-sm font-marathi text-[var(--dp-muted)] mb-3">
                डेटा बचत व वेगवान अनुभवासाठी ३D संगीत मंडप बंद ठेवला आहे.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--dp-gold)] text-[var(--dp-ground-deep)] font-marathi text-xs font-semibold rounded"
                >
                  <span>सर्व रचना सूची पहा</span>
                  <ArrowRight size={12} />
                </Link>
                <button
                  type="button"
                  onClick={toggleLiteMode}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--dp-ground)] border border-[var(--dp-rule)] text-[var(--dp-ink)] font-marathi text-xs rounded"
                >
                  <Sparkles size={12} className="text-[var(--dp-gold)]" />
                  <span>३D मंडप उघडा</span>
                </button>
              </div>
            </div>
          ) : (
            <Vitthalaya3DSanctuary />
          )}
          </div>
        </div>
      </section>

      {/* ── 6. Categories & Literary Genres ── */}
      <section ref={genresRef} className="vitthalaya-section vitthalaya-section-well" aria-labelledby="genres-heading">
        <div className="vitthalaya-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                साहित्य वर्गीकरण
              </p>
              <h2 id="genres-heading" className="vitthalaya-display text-2xl sm:text-3xl font-bold">
                काव्य आणि भक्ती प्रकार
              </h2>
            </div>
            <Link
              href="/category"
              className="text-sm text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1 font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            >
              सर्व रचना
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const bgImg = CATEGORY_IMAGES[cat.slug] || CATEGORY_IMAGES.default;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="vitthalaya-card rounded-lg p-3 text-center group block border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full mb-2.5 rounded overflow-hidden border border-[var(--dp-rule)] group-hover:border-[var(--dp-gold)] transition-colors dp-shimmer-container">
                    <Image
                      src={bgImg}
                      alt={cat.nameMarathi}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <h3 className="vitthalaya-display text-base font-bold text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                    {cat.nameMarathi}
                  </h3>
                  <p className="text-xs text-[var(--dp-muted)] font-marathi mt-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {cat.count.toLocaleString('en-IN')} रचना
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. The Holy Wari Pilgrimage with Interactive Route ── */}
      <section ref={wariRef} className="vitthalaya-section" aria-labelledby="wari-heading">
        <div className="vitthalaya-container space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                पवित्र पदभ्रमण · वारी यात्रा
              </p>
              <h2 id="wari-heading" className="vitthalaya-display font-manthan text-3xl sm:text-4xl font-bold mb-4">
                वारी यात्रा : आषाढी वारी आणि पालखी सोहळा
              </h2>
              <p className="vitthalaya-prose text-base text-[var(--dp-ink-dim)] mb-6">
                देहू व आळंदी ते पंढरपूर पर्यंतचा शेकडो किलोमीटरचा पायी प्रवास. लाखो वारकऱ्यांची विठ्ठल नामाची अखंड गर्जना आणि भक्तीचा अनुपम संगम.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/wari" className="vitthalaya-btn-primary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  वारी संपूर्ण मार्गदर्शिका
                  <Compass size={16} aria-hidden="true" />
                </Link>
                <Link href="/search?q=वारी" className="vitthalaya-btn-secondary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  वारीवरील अभंग
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--dp-rule)] dp-shimmer-container shadow-md">
                <Image
                  src="/images/realistic/wari-procession.jpg"
                  alt="वारी पदयात्रा मिरवणूक"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)]/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-xs font-marathi bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                  <span className="dp-ringan-dot" aria-hidden="true" />
                  आषाढी वारी पालखी सोहळा
                </span>
              </div>
            </div>
          </div>

          {/* Sजीव वारी पदभ्रमण दर्शन (Animated Photographic Chapter Showcase) */}
          <WariAnimatedShowcase />

          {/* Interactive Wari Waypoints Component */}
          <WariInteractiveRoute />
        </div>
      </section>

      {/* ── 8. Sacred Books & Manuscripts ── */}
      <section ref={booksRef} className="vitthalaya-section vitthalaya-section-well" aria-labelledby="books-heading">
        <div className="vitthalaya-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs text-[var(--dp-gold)] font-marathi mb-1">
                प्रकाशित ग्रंथ
              </p>
              <h2 id="books-heading" className="vitthalaya-display text-2xl sm:text-3xl font-bold">
                प्राचीन ग्रंथ व हस्तलिखिते
              </h2>
            </div>
            <Link
              href="/books"
              className="text-sm text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1 font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            >
              सर्व ग्रंथ पहा ({totalBooks})
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/books"
              className="vitthalaya-card rounded-xl overflow-hidden group block border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px shadow-sm hover:shadow-xl dp-book-3d"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden dp-shimmer-container">
                <Image
                  src="/images/realistic/ancient-manuscript.jpg"
                  alt="तुकाराम महाराज गाथा हस्तलिखित"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/30 to-transparent" />
                <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded text-[11px] font-marathi bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs shadow-sm">
                  हस्तलिखित गाथा
                </span>
              </div>
              <div className="p-5">
                <h3 className="vitthalaya-display text-lg font-bold text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                  तुकाराम महाराज गाथा
                </h3>
                <p className="text-xs text-[var(--dp-ink-dim)] font-marathi mt-2 leading-relaxed">
                  चार हजारहून अधिक अभंगांचा मूळ आणि प्रमाणित संग्रह.
                </p>
              </div>
            </Link>

            <Link
              href="/books"
              className="vitthalaya-card rounded-xl overflow-hidden group block border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px shadow-sm hover:shadow-xl dp-book-3d"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden dp-shimmer-container">
                <Image
                  src="/images/categories/stotra.jpg"
                  alt="ज्ञानेश्वरी भावार्थ दीपिका"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/30 to-transparent" />
                <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded text-[11px] font-marathi bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs shadow-sm">
                  गीतेवरील महाभाष्य
                </span>
              </div>
              <div className="p-5">
                <h3 className="vitthalaya-display text-lg font-bold text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                  ज्ञानेश्वरी (भावार्थ दीपिका)
                </h3>
                <p className="text-xs text-[var(--dp-ink-dim)] font-marathi mt-2 leading-relaxed">
                  श्रीमद्भगवद्गीतेवरील मराठीतील सर्वश्रेष्ठ व अद्वितीय भाष्य.
                </p>
              </div>
            </Link>

            <Link
              href="/books"
              className="vitthalaya-card rounded-xl overflow-hidden group block border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px shadow-sm hover:shadow-xl dp-book-3d"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden dp-shimmer-container">
                <Image
                  src="/images/categories/haripath.jpg"
                  alt="एकनाथी भागवत ग्रंथ"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/30 to-transparent" />
                <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded text-[11px] font-marathi bg-[var(--dp-ground-well)]/90 text-[var(--dp-gold)] border border-[var(--dp-rule)] backdrop-blur-xs shadow-sm">
                  एकादश स्कंध टीका
                </span>
              </div>
              <div className="p-5">
                <h3 className="vitthalaya-display text-lg font-bold text-[var(--dp-ink)] group-hover:text-[var(--dp-gold)] transition-colors">
                  एकनाथी भागवत
                </h3>
                <p className="text-xs text-[var(--dp-ink-dim)] font-marathi mt-2 leading-relaxed">
                  भागवत एकादश स्कंधावरील संत एकनाथ महाराजांची अमृततुल्य टीका.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8B. Grand Animated Sacred Heritage Photo Wall (12+ High-Res Authentic Photographs) ── */}
      <SacredHeritagePhotoWall />

      {/* ── 9. Pandharpur Heritage & Community ── */}
      <section ref={heritageRef} className="vitthalaya-section" aria-labelledby="heritage-heading">
        <div className="vitthalaya-container">
          <div className="relative rounded-2xl overflow-hidden border border-[var(--dp-rule)] p-8 sm:p-12 text-center max-w-4xl mx-auto">
            {/* Realistic atmospheric background of Chandrabhaga River */}
            <Image
              src="/images/realistic/chandrabhaga-river.jpg"
              alt="चंद्रभागा नदी आणि पंढरपूर घाट"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/85 to-[var(--dp-ground)]/90" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-xs text-[var(--dp-gold-celestial)] font-marathi font-medium">
                पवित्र तीर्थक्षेत्र दर्शन
              </span>
              <h2 id="heritage-heading" className="vitthalaya-display font-manthan text-3xl sm:text-4xl font-bold text-[var(--dp-ink)]">
                श्री क्षेत्र पंढरपूर आणि चंद्रभागा
              </h2>
              <p className="vitthalaya-prose text-base leading-relaxed text-[var(--dp-ink-dim)]">
                भूवैकुंठ मानले गेलेले पंढरपूर, जिथे विठुराया भक्तांसाठी विटेवर उभा आहे. चंद्रभागेच्या पावन स्नानाने आणि संतांच्या संगतीने जीवनाचे सार्थक होते.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link href="/search?q=पंढरपूर" className="vitthalaya-btn-primary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  पंढरपूर महात्म्य अभंग
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/about" className="vitthalaya-btn-secondary text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px">
                  डिजिटल पंढरपूर संकल्पना
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
