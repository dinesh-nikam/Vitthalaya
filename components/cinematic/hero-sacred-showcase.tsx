'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Sun,
  Flame,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';

interface SacredScene {
  id: string;
  titleMarathi: string;
  tagline: string;
  caption: string;
  praharBadge: string;
  imageUrl: string;
  actionUrl: string;
  actionLabel: string;
  accent: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

const SACRED_SCENES: SacredScene[] = [
  {
    id: 'temple-dawn',
    titleMarathi: 'श्री क्षेत्र पंढरपूर सुवर्ण मंदिर शिखर',
    tagline: 'पहाटेचा सुवर्ण क्षितीज · विठू नामाचा अखंड नाद',
    caption: 'काळ्या पाषाणातील प्राचीन हेमाडपंथी शिखर, सूर्यकिरणांनी झळाळणारा सुवर्ण कळस आणि नामदेव पायरीवर नतमस्तक होणारे भाविक.',
    praharBadge: 'प्रातः प्रहर दर्शन',
    imageUrl: '/images/realistic/pandharpur-temple.jpg',
    actionUrl: '/sant',
    actionLabel: 'संत चरित्र संग्रह',
    accent: '#f59e0b',
    icon: Sun,
  },
  {
    id: 'wari-procession',
    titleMarathi: 'आषाढी वारी पायी पालखी सोहळा',
    tagline: 'विठू नामाचा गजर · वैष्णवांचा अथांग महासागर',
    caption: 'लाखो वारकऱ्यांचा देहू व आळंदी ते पंढरपूर पायी प्रवास. हातात डोलणाऱ्या भगव्या पताका, कपाळी गोपीचंदन आणि मुखी ज्ञानोबा-तुकाराम.',
    praharBadge: 'पवित्र पदभ्रमण',
    imageUrl: '/images/realistic/wari-procession.jpg',
    actionUrl: '/wari',
    actionLabel: 'वारी मार्गदर्शक व पालख्या',
    accent: '#f97316',
    icon: Compass,
  },
  {
    id: 'chandrabhaga-ghat',
    titleMarathi: 'पावन चंद्रभागा नदी व दीपदान पाषाण घाट',
    tagline: 'चंद्रभागेच्या पवित्र स्नानाने देह व मन पुनीत होते',
    caption: 'पहाटेची धुक्याची चादर, शांत वाहणारे पाणी, तरंगते दीप आणि काठावर संतांच्या कीर्तनाचा दुमदुमणारा नाद.',
    praharBadge: 'तीर्थस्नान प्रहर',
    imageUrl: '/images/realistic/chandrabhaga-river.jpg',
    actionUrl: '/search?q=चंद्रभागा',
    actionLabel: 'चंद्रभागा महात्म्य अभंग',
    accent: '#38bdf8',
    icon: Compass,
  },
  {
    id: 'vitthal-darshan',
    titleMarathi: 'श्री विठ्ठल रुक्मिणी दिव्य गाभारा',
    tagline: 'विटेवरी उभा कटेवरी कर · युगे अठ्ठावीस सावळे रूप',
    caption: 'पितांबर परिधान, तुळशीच्या मंजिऱ्यांचा सुवासिक हार आणि कंठी कौस्तुभ मणी. भक्तांच्या हाकेला धावून येणारा पांडुरंग.',
    praharBadge: 'सगुण ब्रह्म दर्शन',
    imageUrl: '/images/lord-vitthal.png',
    actionUrl: '/search?q=विठ्ठल',
    actionLabel: 'विठ्ठल नामाचे अभंग',
    accent: '#fbbf24',
    icon: Sparkles,
  },
  {
    id: 'ancient-gatha',
    titleMarathi: 'प्राचीन ज्ञानेश्वरी व तुकाराम गाथा हस्तलिखित',
    tagline: 'आठ शतकांची ज्ञानसंपदा · देवनागरी व मोडी लिपी वारसा',
    caption: 'तुळशीपत्र, चंदन आणि समयीच्या मंद प्रकाशात जपलेले संत ज्ञानेश्वर, नामदेव व तुकाराम महाराजांचे अमृततुल्य अभंग.',
    praharBadge: 'प्रमाणित साहित्य',
    imageUrl: '/images/realistic/ancient-manuscript.jpg',
    actionUrl: '/books',
    actionLabel: 'पवित्र ग्रंथ व गाथा',
    accent: '#eab308',
    icon: BookOpen,
  },
  {
    id: 'temple-aarti',
    titleMarathi: 'गाभाऱ्यातील मंगल काकड व शेजारती',
    tagline: 'कापूर आणि तेजोमय समईच्या प्रकाशात महाआरती',
    caption: 'टाळ, घंटानाद आणि शंखाच्या निनादात होणारी नित्य आरती. शेकडो पितळी दिव्यांची आरास आणि भक्तिभावाचा अनुपम संगम.',
    praharBadge: 'मंगल महाआरती',
    imageUrl: '/images/realistic/temple-aarti.jpg',
    actionUrl: '/category/aarti',
    actionLabel: 'सर्व आरत्या संग्रह',
    accent: '#ef4444',
    icon: Flame,
  },
];

const AUTO_ROTATE_MS = 6000;

export function HeroSacredShowcase() {
  const [index, setIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  const scene = SACRED_SCENES[index];

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % SACRED_SCENES.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + SACRED_SCENES.length) % SACRED_SCENES.length);
  }, []);

  const handleSelect = React.useCallback((idx: number) => {
    setDirection(idx > index ? 1 : -1);
    setIndex(idx);
  }, [index]);

  React.useEffect(() => {
    if (!isPlaying || isHovered) return;
    const t = setInterval(handleNext, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, [isPlaying, isHovered, handleNext]);

  const IconComp = scene.icon;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-[var(--dp-rule-strong)] bg-[var(--dp-ground-well)] shadow-2xl mt-10 text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="पवित्र तीर्थक्षेत्र दर्शन व सोहळा"
    >
      {/* ── Main Photographic Stage with Smooth Ken Burns Animation ── */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[24/9] w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={scene.id}
            custom={direction}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Animated breathing photo */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.055 }}
              transition={{ duration: AUTO_ROTATE_MS / 1000, ease: 'linear' as const }}
              className="relative w-full h-full"
            >
              <Image
                src={scene.imageUrl}
                alt={scene.titleMarathi}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Cinematic Gradient Vignettes */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, rgba(6,5,3,0.95) 0%, rgba(6,5,3,0.55) 45%, rgba(6,5,3,0.2) 80%, transparent 100%),
                  linear-gradient(to right, rgba(6,5,3,0.85) 0%, rgba(6,5,3,0.3) 55%, transparent 100%)
                `,
              }}
            />

            {/* Glowing Sacred Aura Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at 75% 35%, ${scene.accent} 0%, transparent 60%)`,
              }}
            />

            {/* Top Bar: Prahar Badge & Control Buttons */}
            <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-marathi font-bold bg-black/60 text-[var(--dp-gold-celestial)] border border-[var(--dp-gold)]/40 backdrop-blur-md shadow-sm">
                <IconComp size={12} className="text-[var(--dp-gold)]" aria-hidden="true" />
                <span>{scene.praharBadge}</span>
              </span>

              <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="p-1.5 rounded-full hover:bg-white/15 text-[var(--dp-gold-celestial)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
                  aria-label={isPlaying ? 'अ‍ॅनिमेशन थांबवा' : 'अ‍ॅनिमेशन सुरू करा'}
                  title={isPlaying ? 'थांबवा' : 'सुरू करा'}
                >
                  {isPlaying ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
                  aria-label="मागील छायाचित्र"
                >
                  <ChevronLeft size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
                  aria-label="पुढील छायाचित्र"
                >
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Bottom Content Caption */}
            <div className="absolute bottom-3 left-4 right-4 sm:left-8 sm:bottom-6 sm:right-8 z-10">
              <div className="max-w-2xl space-y-1.5 sm:space-y-2">
                <p className="text-xs sm:text-sm font-marathi text-[var(--dp-gold-celestial)] font-medium drop-shadow">
                  {scene.tagline}
                </p>
                <h3 className="vitthalaya-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                  {scene.titleMarathi}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow hidden sm:block">
                  {scene.caption}
                </p>
                <div className="pt-1">
                  <Link
                    href={scene.actionUrl}
                    className="vitthalaya-btn-primary inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded shadow-lg backdrop-blur-sm"
                  >
                    <span>{scene.actionLabel}</span>
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
          key={`${index}-${isPlaying}-${isHovered}`}
          initial={{ width: '0%' }}
          animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
          transition={{
            duration: AUTO_ROTATE_MS / 1000,
            ease: 'linear' as const,
          }}
          className="h-full bg-[var(--dp-gold)] shadow-[0_0_8px_rgba(246,188,85,0.8)]"
        />
      </div>

      {/* ── Interactive Thumbnails with Animated Highlights ── */}
      <div className="p-2.5 sm:p-3 bg-[var(--dp-ground-well)] border-t border-[var(--dp-rule)] overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {SACRED_SCENES.map((s, idx) => {
            const isSelected = idx === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 text-left flex items-center gap-2 p-1.5 border cursor-pointer ${
                  isSelected
                    ? 'border-[var(--dp-gold)] bg-[var(--dp-ground-surface)] shadow-[0_0_12px_rgba(246,188,85,0.25)] scale-[1.02]'
                    : 'border-[var(--dp-rule)] hover:border-[var(--dp-gold)]/60 bg-[var(--dp-ground)] opacity-70 hover:opacity-100'
                }`}
                style={{ minWidth: '150px', maxWidth: '210px' }}
                aria-label={`${s.titleMarathi} पहा`}
              >
                <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={s.imageUrl}
                    alt=""
                    fill
                    sizes="40px"
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
                    {s.titleMarathi}
                  </p>
                  <p className="text-[10px] text-[var(--dp-muted)] font-marathi truncate">
                    {s.praharBadge}
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
