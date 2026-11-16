'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Compass,
  Sparkles,
  ArrowRight,
  Flame,
  Sun,
  BookOpen,
  Music,
} from 'lucide-react';

export interface GallerySlide {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  tagline: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
  actionText: string;
  accentColor: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  tradition: string;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'wari',
    titleMarathi: 'आषाढी वारी पायी पालखी सोहळा',
    titleEnglish: 'The Holy Ashadhi Wari Foot Pilgrimage',
    tagline: 'विठू नामाचा अखंड गजर · वैष्णवांचा अथांग महासागर',
    description: 'लाखो वारकऱ्यांचा देहू व आळंदी ते पंढरपूर पर्यंतचा शेकडो किलोमीटरचा पायी प्रवास. हातात भगव्या पताका, कपाळी बुक्का, गळ्यात तुळशीमाळ आणि मुखी ज्ञानोबा-तुकारामांचा अखंड जयघोष.',
    imageUrl: '/images/realistic/wari-procession.jpg',
    actionUrl: '/wari',
    actionText: 'वारी मार्गदर्शक व पालख्या',
    accentColor: '#f59e0b',
    icon: Compass,
    tradition: 'वारकरी परंपरा · देहू ते पंढरपूर',
  },
  {
    id: 'vitthal',
    titleMarathi: 'श्री विठ्ठल रुक्मिणी दिव्य दर्शन',
    titleEnglish: 'Lord Vitthal Divine Sanctum Darshan',
    tagline: 'विटेवरी उभा कटेवरी कर · भक्त पुंडलिकासाठी युगे अठ्ठावीस',
    description: 'पांडुरंगाचे सावळे सगुण रूप, पितांबर परिधान, तुळशीच्या मंजिऱ्यांचा हार आणि कंठी कौस्तुभ मणी. भक्त पुंडलिकाच्या मातृ-पितृ भक्तीवर प्रसन्न होऊन विटेवर उभा असलेला परमात्मा.',
    imageUrl: '/images/lord-vitthal.png',
    actionUrl: '/search?q=विठ्ठल',
    actionText: 'विठ्ठल नामाचे अभंग',
    accentColor: '#fbbf24',
    icon: Sparkles,
    tradition: 'पंढरपूर महामंदिर · गाभारा दर्शन',
  },
  {
    id: 'temple',
    titleMarathi: 'श्री क्षेत्र पंढरपूर सुवर्ण मंदिर शिखर',
    titleEnglish: 'Pandharpur Sacred Temple Shikhara at Dawn',
    tagline: 'भूवैकुंठ पंढरी · संतमेळ्याचे परम विश्रामस्थान',
    description: 'प्राचीन हेमाडपंथी स्थापत्य, काळ्या पाषाणातील कोरीव खांब आणि सूर्योदयाच्या सोनेरी किरणांनी झळाळणारे उंच कळस. येथे नामदेव पायरीवर नतमस्तक होऊन भाविक दर्शनाचा लाभ घेतात.',
    imageUrl: '/images/realistic/pandharpur-temple.jpg',
    actionUrl: '/sant',
    actionText: 'संत चरित्र संग्रह',
    accentColor: '#f97316',
    icon: Sun,
    tradition: 'ऐतिहासिक वारसा · भीमातीर',
  },
  {
    id: 'chandrabhaga',
    titleMarathi: 'पावन चंद्रभागा नदी आणि पाषाण घाट',
    titleEnglish: 'Tranquil Chandrabhaga River & Stone Ghats',
    tagline: 'चंद्रभागेच्या पावन स्नानाने देह आणि मन पुनीत होते',
    description: 'पंढरपूरजवळ चंद्रकोरीसारखी वळण घेणारी भीमा म्हणजेच चंद्रभागा. पहाटेची धुक्याची चादर, लाकडी होड्या, दगडी दीपमाळा आणि संतांच्या कीर्तनाचा नाद नदीच्या तीरावर गुंजतो.',
    imageUrl: '/images/realistic/chandrabhaga-river.jpg',
    actionUrl: '/search?q=चंद्रभागा',
    actionText: 'चंद्रभागा महात्म्य अभंग',
    accentColor: '#38bdf8',
    icon: Compass,
    tradition: 'पावन तीर्थस्नान · चंद्रभागा तीर',
  },
  {
    id: 'manuscripts',
    titleMarathi: 'प्राचीन ज्ञानेश्वरी व तुकाराम गाथा हस्तलिखिते',
    titleEnglish: 'Ancient Manuscripts & Sant Sahitya Archives',
    tagline: 'आठ शतकांची ज्ञानसंपदा · भूर्जपत्र ते डिजिटल जतन',
    description: 'देवनागरी व मोडी लिपीतील मूळ हस्ताक्षरांचा वारसा. तुळशीपत्र, चंदन आणि दीपज्योतीच्या सानिध्यात जपलेले संत ज्ञानेश्वर, तुकाराम, नामदेव व एकनाथांचे अमृततुल्य अभंग.',
    imageUrl: '/images/realistic/ancient-manuscript.jpg',
    actionUrl: '/books',
    actionText: 'सर्व ग्रंथ व गाथा पहा',
    accentColor: '#eab308',
    icon: BookOpen,
    tradition: 'प्रमाणित संत साहित्य भांडार',
  },
  {
    id: 'aarti',
    titleMarathi: 'गाभाऱ्यातील महाआरती व मंगल दीपज्योत',
    titleEnglish: 'Sanctum Mangal Aarti & Golden Diya Radiance',
    tagline: 'कापूर आणि तेजोमय समईच्या प्रकाशात पांडुरंग दर्शन',
    description: 'टाळ, घंटानाद आणि शंखाच्या निनादात होणारी नित्य काकड व शेजारती. शेकडो पितळी दिव्यांची तेजोमय आरास आणि भक्तिभावाने भरलेले वैष्णवांचे मन.',
    imageUrl: '/images/realistic/temple-aarti.jpg',
    actionUrl: '/category/aarti',
    actionText: 'सर्व आरत्या संग्रह',
    accentColor: '#ef4444',
    icon: Flame,
    tradition: 'नित्य आरती व भजन परंपरा',
  },
  {
    id: 'bhandara',
    titleMarathi: 'जेजुरीचा विलोभनीय सुवर्ण भंडारा सोहळा',
    titleEnglish: 'Jejuri Golden Turmeric Bhandara Festival',
    tagline: 'येळकोट येळकोट जय मल्हार · पिवळ्याधमक भंडाऱ्याची आसमंतात उधळण',
    description: 'वारीच्या वाटेवरील जेजुरी गडावर होणारा भंडाऱ्याचा नेत्रदीपक उत्सव. सोनेरी हळदीचे ढग आकाशाला भिडतात आणि लाखो भक्तांच्या उत्साहाने अवघा परिसर सुवर्णमय होतो.',
    imageUrl: '/images/jejuri-bhandara.png',
    actionUrl: '/festival',
    actionText: 'उत्सव व सण कालदर्शिका',
    accentColor: '#eab308',
    icon: Sun,
    tradition: 'वारकरी वारी टप्पा · जेजुरी गड',
  },
  {
    id: 'taal-mridanga',
    titleMarathi: 'वारकरी टाळ-मृदंग व हरिनाम संकीर्तन',
    titleEnglish: 'Sacred Warkari Taal, Pakhawaj & Kirtan Heritage',
    tagline: 'टाळ-मृदंगाच्या तालावर अवघी पंढरी दुमदुमते',
    description: 'शुद्ध पितळेचे टाळ, लाकडी मृदंग, चंदन आणि तुळशीमाळेच्या संगतीने होणारे नित्य कीर्तन. वारकरी संप्रदायात नादब्रह्म हाच विठ्ठलाशी एकरूप होण्याचा सोपा राजमार्ग आहे.',
    imageUrl: '/images/categories/abhang.jpg',
    actionUrl: '/collections',
    actionText: 'भजन व कीर्तन संग्रह',
    accentColor: '#f59e0b',
    icon: Music,
    tradition: 'नादब्रह्म संगीत परंपरा',
  },
  {
    id: 'tulsi-mala',
    titleMarathi: '१०८ मण्यांची पवित्र तुळशीमाळ व नित्य नामस्मरण',
    titleEnglish: 'Sacred 108 Tulsi Bead Mala & Contemplative Japa',
    tagline: 'कंठी मिरवे तुळशी माळ · मुखी विठ्ठल गोपाळ',
    description: 'वारकरी संप्रदायातील दीक्षेचे आणि अनन्य समर्पणाचे प्रतीक म्हणजे तुळशीची माळ. प्रत्येक मण्यागणिक चालणारे विठ्ठल नामाचे अखंड ध्यान आणि आंतरिक शांती.',
    imageUrl: '/images/tulsi-mala.png',
    actionUrl: '/japa',
    actionText: 'डिजिटल जपमाळ साधना',
    accentColor: '#10b981',
    icon: Sparkles,
    tradition: 'वारकरी दीक्षा व नित्यनेम',
  },
];

const AUTOPLAY_INTERVAL = 6500; // 6.5s per slide

export function AnimatedSacredGallery() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [direction, setDirection] = React.useState<number>(1);

  const activeSlide = GALLERY_SLIDES[currentIndex];

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
  }, []);

  const handleSelect = React.useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Autoplay timer
  React.useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1.02,
      x: dir > 0 ? -40 : 40,
      transition: {
        duration: 0.5,
        ease: 'easeIn' as const,
      },
    }),
  };

  const ActiveIcon = activeSlide.icon;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="वारकरी दर्शन छायाचित्र दालन"
      className="vitthalaya-section relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="vitthalaya-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-ground-well)] border border-[var(--dp-gold)]/40 text-[var(--dp-gold)] text-xs font-marathi mb-2">
              <Sparkles size={13} className="text-[var(--dp-gold)]" aria-hidden="true" />
              <span>सजीव सांस्कृतिक छायाचित्र दालन</span>
            </div>
            <h2 className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--dp-ink)]">
              वारकरी संस्कृती दर्शन व तीर्थयात्रा
            </h2>
          </div>

          {/* Autoplay & Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2.5 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink-dim)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]"
              aria-label={isPlaying ? 'अ‍ॅनिमेशन थांबवा' : 'अ‍ॅनिमेशन सुरू करा'}
              title={isPlaying ? 'थांबवा' : 'सुरू करा'}
            >
              {isPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:scale-95"
              aria-label="मागील छायाचित्र"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] hover:text-[var(--dp-gold)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:scale-95"
              aria-label="पुढील छायाचित्र"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Main Showcase Stage ── */}
        <div className="relative rounded-2xl overflow-hidden border border-[var(--dp-rule)] bg-[var(--dp-ground-well)] shadow-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                {/* Image with subtle Ken Burns animated breathing zoom */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 7, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeSlide.imageUrl}
                    alt={activeSlide.titleMarathi}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Multi-layered cinematic vignette & gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(to top, rgba(6,5,3,0.95) 0%, rgba(6,5,3,0.6) 45%, rgba(6,5,3,0.2) 80%, transparent 100%),
                      linear-gradient(to right, rgba(6,5,3,0.85) 0%, rgba(6,5,3,0.3) 50%, transparent 100%)
                    `,
                  }}
                />

                {/* Pulsing divine aura glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle at 75% 40%, ${activeSlide.accentColor} 0%, transparent 60%)`,
                  }}
                />

                {/* Caption / Information Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-10">
                  <div className="max-w-2xl space-y-3">
                    {/* Cultural Tradition Tag */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-marathi font-semibold backdrop-blur-md border border-white/10 bg-black/40 text-[var(--dp-gold-celestial)]"
                    >
                      <ActiveIcon size={13} className="text-[var(--dp-gold)]" aria-hidden="true" />
                      <span>{activeSlide.tradition}</span>
                    </motion.div>

                    {/* Marathi Heading with Animated Entrance */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md leading-tight"
                    >
                      {activeSlide.titleMarathi}
                    </motion.h3>

                    {/* Tagline */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-xs sm:text-sm font-marathi text-[var(--dp-gold)] font-medium drop-shadow-sm"
                    >
                      {activeSlide.tagline}
                    </motion.p>

                    {/* Paragraph description */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.5 }}
                      className="text-xs sm:text-sm text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow"
                    >
                      {activeSlide.description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      className="pt-2"
                    >
                      <Link
                        href={activeSlide.actionUrl}
                        className="vitthalaya-btn-primary inline-flex items-center gap-2 text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded shadow-lg backdrop-blur-sm"
                      >
                        <span>{activeSlide.actionText}</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Slide Progress Bar ── */}
          <div className="w-full h-1 bg-[var(--dp-ground)] relative overflow-hidden">
            <motion.div
              key={`${currentIndex}-${isPlaying}-${isHovered}`}
              initial={{ width: '0%' }}
              animate={{ width: isPlaying && !isHovered ? '100%' : '0%' }}
              transition={{
                duration: AUTOPLAY_INTERVAL / 1000,
                ease: 'linear',
              }}
              className="h-full bg-[var(--dp-gold)] shadow-[0_0_8px_rgba(246,188,85,0.8)]"
            />
          </div>

          {/* ── Interactive Thumbnail Strip ── */}
          <div className="p-3 sm:p-4 bg-[var(--dp-ground)]/90 border-t border-[var(--dp-rule)] overflow-x-auto no-scrollbar">
            <div className="flex gap-2.5 sm:gap-3 min-w-max">
              {GALLERY_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 text-left flex items-center gap-2.5 p-1.5 sm:p-2 border ${
                      isSelected
                        ? 'border-[var(--dp-gold)] bg-[var(--dp-ground-well)] shadow-[0_0_15px_rgba(246,188,85,0.25)] scale-[1.02]'
                        : 'border-[var(--dp-rule)] hover:border-[var(--dp-gold)]/60 bg-[var(--dp-ground)] opacity-70 hover:opacity-100'
                    }`}
                    style={{ minWidth: '150px', maxWidth: '200px' }}
                  >
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.titleMarathi}
                        fill
                        sizes="48px"
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
                        {slide.titleMarathi}
                      </p>
                      <p className="text-[10px] text-[var(--dp-muted)] font-mono truncate">
                        ०{idx + 1} / ०{GALLERY_SLIDES.length}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
