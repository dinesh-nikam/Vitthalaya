'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Mountain,
  Sun,
  Waves,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Footprints,
} from 'lucide-react';

interface WariChapter {
  id: string;
  day: number;
  stageTitle: string;
  location: string;
  distanceKm: number;
  significance: string;
  quote: string;
  imageUrl: string;
  accent: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const WARI_CHAPTERS: WariChapter[] = [
  {
    id: 'prashthan',
    day: 1,
    stageTitle: 'पवित्र पालखी प्रस्थान व इंद्रायणी काठ',
    location: 'आळंदी व देहू',
    distanceKm: 0,
    significance: 'संत ज्ञानेश्वर महाराज व जगद्गुरु तुकाराम महाराजांच्या पालख्यांचे पंढरपूरकडे भावपूर्ण प्रस्थान. टाळ, मृदंग आणि ज्ञानोबा-तुकारामांचा अखंड गजर.',
    quote: 'ज्ञानोबा माउली तुकाराम · चला पंढरीसी जाऊ',
    imageUrl: '/images/realistic/alandi-indrayani-river.jpg',
    accent: '#f59e0b',
    icon: Sparkles,
  },
  {
    id: 'dive-ghat',
    day: 4,
    stageTitle: 'दिवे घाटातील विहंगम सोहळा',
    location: 'दिवे घाट (सासवड)',
    distanceKm: 52,
    significance: 'सह्याद्रीच्या डोंगरदर्यांमधून जाणारी लाखो वारकऱ्यांची आणि डौलदार भगव्या ध्वजांची सर्पाकार रांग. वारीतील सर्वाधिक नेत्रदीपक व विलोभनीय टप्पा.',
    quote: 'अवघा रंग एक झाला · रंगी रंगला श्रीरंग',
    imageUrl: '/images/realistic/dive-ghat-panoramic.jpg',
    accent: '#f97316',
    icon: Mountain,
  },
  {
    id: 'jejuri',
    day: 5,
    stageTitle: 'जेजुरीचा सुवर्ण भंडारा',
    location: 'जेजुरी गड',
    distanceKm: 68,
    significance: 'येळकोट येळकोट जय मल्हारच्या जयघोषात पिवळ्याधमक भंडाऱ्याची आसमंतात मुक्त उधळण. अवघा परिसर सोन्यासारखा झळाळतो.',
    quote: 'पिवळाधमक भंडारा उधळिला · हरिनामाचा गजर गाजिला',
    imageUrl: '/images/jejuri-bhandara.png',
    accent: '#eab308',
    icon: Sun,
  },
  {
    id: 'ringan',
    day: 7,
    stageTitle: 'अश्वांचे प्रसिद्ध गोल रिंगण',
    location: 'लोणंद व फलटण',
    distanceKm: 99,
    significance: 'माऊलींच्या अश्वांची मैदानात विजेच्या वेगाने वर्तुळाकार प्रदक्षिणा. लाखो वारकरी फेर धरून नाचतात आणि नामाच्या गजराने भूमी कंपित होते.',
    quote: 'रिंगण सोहळा पाहता डोळां · आनंद न मावे अंतरा',
    imageUrl: '/images/realistic/ringan-circular.jpg',
    accent: '#ef4444',
    icon: Compass,
  },
  {
    id: 'palkhi-rath',
    day: 10,
    stageTitle: 'तुकोबारायांचा भव्य पालखी रथ',
    location: 'बारामती ते इंदापूर मार्ग',
    distanceKm: 156,
    significance: 'फुलांनी सजवलेला ऐतिहासिक लाकडी पालखी रथ, ज्याच्या सान्निध्यात लाखो वारकरी पायी चालत नामस्मरण करतात.',
    quote: 'तुका म्हणे माझे हेचि सर्व सुख · पाहीन श्रीमुख आवडीने',
    imageUrl: '/images/realistic/tukaram-palkhi-rath.jpg',
    accent: '#8b5cf6',
    icon: Sparkles,
  },
  {
    id: 'phugadi-dance',
    day: 12,
    stageTitle: 'आनंदाची फुगडी व उडी-भजन',
    location: 'माळशिरस मुक्काम तळ',
    distanceKm: 190,
    significance: 'वारीच्या वाटेवर थकवा विसरून आनंदाच्या भरात एकमेकींचे हात धरून फेर धरणाऱ्या महिला वारकरी आणि कीर्तनातील उडी-भजन.',
    quote: 'आनंदाचे डोही आनंद तरंग · आनंदचि अंग आनंदाचे',
    imageUrl: '/images/realistic/wari-phugadi-dance.jpg',
    accent: '#ec4899',
    icon: Sparkles,
  },
  {
    id: 'pandharpur-arrival',
    day: 16,
    stageTitle: 'महामंदिर नगरप्रवेश व विठ्ठल दर्शन',
    location: 'श्री क्षेत्र पंढरपूर',
    distanceKm: 250,
    significance: 'आषाढी एकादशीला २५० किमी पायी प्रवासाची कृतार्थ पूर्णता. पावन चंद्रभागेत स्नान, नामदेव पायरीवर नतमस्तक आणि विठूरायाचे सगुण दर्शन.',
    quote: 'पुंडलीकाचे भेटी परब्रह्म आले · विटेवरी उभे ठाकले',
    imageUrl: '/images/realistic/pandharpur-temple-facade.jpg',
    accent: '#38bdf8',
    icon: Waves,
  },
];

const AUTOPLAY_MS = 6500;

export function WariAnimatedShowcase() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);

  const current = WARI_CHAPTERS[activeIdx];

  const handleNext = React.useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % WARI_CHAPTERS.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + WARI_CHAPTERS.length) % WARI_CHAPTERS.length);
  }, []);

  React.useEffect(() => {
    if (!isPlaying || isHovered) return;
    const t = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [isPlaying, isHovered, handleNext]);

  const IconComp = current.icon;

  return (
    <div
      className="vitthalaya-card rounded-2xl overflow-hidden border border-[var(--dp-rule)] shadow-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="आषाढी वारी पायी प्रवास छायाचित्र सोहळा"
    >
      {/* ── Top Header Bar ── */}
      <div className="p-4 sm:p-5 border-b border-[var(--dp-rule)] flex flex-wrap items-center justify-between gap-3 bg-[var(--dp-ground-well)]">
        <div className="flex items-center gap-2">
          <Footprints className="w-5 h-5 text-[var(--dp-gold)]" aria-hidden="true" />
          <div>
            <h3 className="vitthalaya-display text-lg sm:text-xl font-bold text-[var(--dp-ink)]">
              सजीव वारी पदभ्रमण दर्शन (छायाचित्र सोहळा)
            </h3>
            <p className="text-xs text-[var(--dp-gold)] font-marathi">
              दिवस १ ते १६ · देहू/आळंदी ते पंढरपूर २५० किमी प्रवास
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink-dim)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            aria-label={isPlaying ? 'अ‍ॅनिमेशन थांबवा' : 'अ‍ॅनिमेशन सुरू करा'}
            title={isPlaying ? 'थांबवा' : 'सुरू करा'}
          >
            {isPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            aria-label="मागील टप्पा"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-2 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
            aria-label="पुढील टप्पा"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Main Photographic Stage with Ken Burns ── */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-[var(--dp-ground-well)]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Animated breathing image */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' as const }}
              className="relative w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.stageTitle}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Dark devotional vignettes */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, rgba(6,5,3,0.95) 0%, rgba(6,5,3,0.5) 50%, rgba(6,5,3,0.15) 80%, transparent 100%),
                  linear-gradient(to right, rgba(6,5,3,0.85) 0%, rgba(6,5,3,0.3) 60%, transparent 100%)
                `,
              }}
            />

            {/* Stage Milestone Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-marathi font-bold bg-black/60 text-[var(--dp-gold-celestial)] border border-[var(--dp-gold)]/40 backdrop-blur-md shadow-sm flex items-center gap-1.5">
                <IconComp size={13} className="text-[var(--dp-gold)]" aria-hidden="true" />
                <span>दिवस {current.day} · {current.location}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-black/60 text-white border border-white/20 backdrop-blur-md shadow-sm">
                {current.distanceKm} किमी
              </span>
            </div>

            {/* Caption & Poetry */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:bottom-8 sm:right-8 z-10">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs sm:text-sm font-marathi text-[var(--dp-gold-celestial)] font-semibold drop-shadow flex items-center gap-2">
                  <span className="dp-ringan-dot" aria-hidden="true" />
                  <span>{current.quote}</span>
                </p>
                <h4 className="vitthalaya-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                  {current.stageTitle}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow">
                  {current.significance}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(current.location)}`}
                    className="vitthalaya-btn-primary inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded shadow-md"
                  >
                    <span>{current.location} वरील अभंग वाचा</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide Progress Bar ── */}
      <div className="w-full h-1 bg-[var(--dp-ground)] relative overflow-hidden">
        <motion.div
          key={`${activeIdx}-${isPlaying}-${isHovered}`}
          initial={{ width: '0%' }}
          animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
          transition={{
            duration: AUTOPLAY_MS / 1000,
            ease: 'linear' as const,
          }}
          className="h-full bg-[var(--dp-gold)] shadow-[0_0_8px_rgba(246,188,85,0.8)]"
        />
      </div>

      {/* ── Visual Milestone Buttons Strip ── */}
      <div className="p-3 bg-[var(--dp-ground-well)] border-t border-[var(--dp-rule)] overflow-x-auto no-scrollbar">
        <div className="flex gap-2.5 min-w-max">
          {WARI_CHAPTERS.map((ch, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 text-left flex items-center gap-2.5 p-2 border cursor-pointer ${
                  isSelected
                    ? 'border-[var(--dp-gold)] bg-[var(--dp-ground-surface)] shadow-[0_0_12px_rgba(246,188,85,0.3)] scale-[1.02]'
                    : 'border-[var(--dp-rule)] hover:border-[var(--dp-gold)]/60 bg-[var(--dp-ground)] opacity-75 hover:opacity-100'
                }`}
                style={{ minWidth: '160px', maxWidth: '210px' }}
                aria-label={`${ch.stageTitle} पहा`}
              >
                <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={ch.imageUrl}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[var(--dp-gold)]/20 border border-[var(--dp-gold)] rounded pointer-events-none" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-marathi font-bold truncate ${
                      isSelected ? 'text-[var(--dp-gold)]' : 'text-[var(--dp-ink)]'
                    }`}
                  >
                    {ch.stageTitle}
                  </p>
                  <p className="text-[10px] text-[var(--dp-muted)] font-marathi truncate">
                    दिवस {ch.day} · {ch.location}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
