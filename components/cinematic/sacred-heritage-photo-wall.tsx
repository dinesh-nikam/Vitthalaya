'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Compass,
  Landmark,
  Heart,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export interface PhotoItem {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  category: 'all' | 'wari' | 'temple' | 'varkari';
  categoryLabel: string;
  location: string;
  description: string;
  imageUrl: string;
  aspectClass: string; // for masonry visual rhythm
}

const HERITAGE_PHOTOS: PhotoItem[] = [
  {
    id: 'dive-ghat',
    titleMarathi: 'दिवे घाटातील विहंगम पालखी सोहळा',
    titleEnglish: 'Panoramic Dive Ghat Wari Pilgrimage',
    category: 'wari',
    categoryLabel: 'वारी सोहळा',
    location: 'दिवे घाट, सासवड मार्ग',
    description: 'सह्याद्रीच्या डोंगरदर्यांमधून जाणारी लाखो वारकऱ्यांची आणि डौलदार भगव्या ध्वजांची सर्पाकार रांग. आषाढी वारीतील सर्वाधिक विलोभनीय टप्पा.',
    imageUrl: '/images/realistic/dive-ghat-panoramic.jpg',
    aspectClass: 'md:col-span-2 aspect-[21/9]',
  },
  {
    id: 'pandharpur-facade',
    titleMarathi: 'श्री विठ्ठल रुक्मिणी महामंदिर पाषाण स्थापत्य',
    titleEnglish: 'Pandurang Vitthal Temple Architectural Facade',
    category: 'temple',
    categoryLabel: 'तीर्थक्षेत्र',
    location: 'श्री क्षेत्र पंढरपूर',
    description: 'काळ्या पाषाणातील प्राचीन हेमाडपंथी स्थापत्य, कोरीव नक्षीकाम आणि शतकानुशतके लाखो भाविकांचे श्रद्धास्थान असलेले विठ्ठल मंदिर.',
    imageUrl: '/images/realistic/pandharpur-temple-facade.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'ringan-circular',
    titleMarathi: 'लोणंदचे प्रसिद्ध गोल रिंगण',
    titleEnglish: 'Historic Circular Ringan Ceremony',
    category: 'wari',
    categoryLabel: 'वारी सोहळा',
    location: 'लोणंद व फलटण मैदान',
    description: 'माऊलींच्या अश्वांची मैदानात विजेच्या वेगाने वर्तुळाकार प्रदक्षिणा. टाळ-मृदंगाच्या तालावर लाखो वारकरी फेर धरून नाचतात.',
    imageUrl: '/images/realistic/ringan-circular.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'varkari-portrait',
    titleMarathi: 'वारकरी साधक — भक्तीची साक्षात मूर्ती',
    titleEnglish: 'Revered Varkari Pilgrim Portrait',
    category: 'varkari',
    categoryLabel: 'वारकरी जीवन',
    location: 'पंढरपूर पदयात्रा',
    description: 'कपाळी गोपीचंदन, गळ्यात तुळशीमाळ, पांढरा सदरा आणि डोक्यावर पागोटे परिधान केलेले वयोवृद्ध वारकरी साधक. निस्वार्थ भक्ती आणि समतेचे प्रतीक.',
    imageUrl: '/images/realistic/warkari-varkari-portrait.jpg',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'talkari',
    titleMarathi: 'टाळकरी — नादब्रह्माचा अखंड गजर',
    titleEnglish: 'Talkari Devotee Playing Sacred Cymbals',
    category: 'varkari',
    categoryLabel: 'वारकरी जीवन',
    location: 'दिंडी पदयात्रा',
    description: 'शुद्ध पितळेच्या टाळांवर विठ्ठल नामाचा ठेका धरणारे वारकरी टाळकरी. नामाच्या तालावर अवघा देह विठ्ठलमय होतो.',
    imageUrl: '/images/realistic/warkari-talkari.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'tukaram-rath',
    titleMarathi: 'जगद्गुरु संत तुकाराम महाराज पालखी रथ',
    titleEnglish: 'Sant Tukaram Maharaj Sacred Palkhi Chariot',
    category: 'wari',
    categoryLabel: 'वारी सोहळा',
    location: 'देहू ते पंढरपूर',
    description: 'फुलांनी सजवलेला ऐतिहासिक पालखी रथ, ज्यामध्ये जगद्गुरु तुकोबारायांच्या पवित्र पादुका विठ्ठल भेटीसाठी पंढरपूरकडे कूच करतात.',
    imageUrl: '/images/realistic/tukaram-palkhi-rath.jpg',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'alandi-indrayani',
    titleMarathi: 'आळंदी येथील पावन इंद्रायणी नदी घाट',
    titleEnglish: 'Holy Indrayani River Ghat at Alandi',
    category: 'temple',
    categoryLabel: 'तीर्थक्षेत्र',
    location: 'आळंदी, पुणे',
    description: 'संत ज्ञानेश्वर महाराजांच्या संजीवन समाधी मंदिरासमीप वाहणारी पावन इंद्रायणी. येथे स्नान करून वारकरी वारीचा शुभारंभ करतात.',
    imageUrl: '/images/realistic/alandi-indrayani-river.jpg',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'alandi-deepmaal',
    titleMarathi: 'आंग्रे दीपमाळ — ऐतिहासिक पाषाण दीपस्तंभ',
    titleEnglish: 'Historic Angre Stone Deepmaal at Alandi',
    category: 'temple',
    categoryLabel: 'तीर्थक्षेत्र',
    location: 'आळंदी समाधी परिसर',
    description: 'मराठा इतिहासातील काळ्या पाषाणातील भव्य दगडी दीपमाळा. उत्सवाच्या रात्री येथे शेकडो तेलवाती प्रज्वलित केल्या जातात.',
    imageUrl: '/images/realistic/alandi-deepmaal.jpg',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'phugadi',
    titleMarathi: 'वारकरी महिलांची आनंदाची फुगडी',
    titleEnglish: 'Joyful Phugadi Dance by Varkari Women',
    category: 'wari',
    categoryLabel: 'वारी सोहळा',
    location: 'वारी मुक्काम तळ',
    description: 'वारीच्या वाटेवर थकवा विसरून विठ्ठल नामाच्या आनंदात एकमेकींचे हात धरून फेर धरणाऱ्या महिला वारकरी.',
    imageUrl: '/images/realistic/wari-phugadi-dance.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'bharud',
    titleMarathi: 'पारंपारिक भारूड सादरीकरण',
    titleEnglish: 'Traditional Folk Spiritual Bharud Performance',
    category: 'varkari',
    categoryLabel: 'वारकरी जीवन',
    location: 'ग्रामीण महाराष्ट्र कीर्तन',
    description: 'संत एकनाथ महाराजांच्या भारुड परंपरेचे जिवंत सादरीकरण. नाट्य, विनोद आणि अध्यात्माचा अप्रतिम मिलाफ.',
    imageUrl: '/images/realistic/bharud-performance.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'udi-bhajan',
    titleMarathi: 'उडी-भजन — भक्तीच्या रंगात दंग',
    titleEnglish: 'Ecstatic Udi-Bhajan Devotional Dance',
    category: 'varkari',
    categoryLabel: 'वारकरी जीवन',
    location: 'वारी पालखी मुक्काम',
    description: 'कीर्तनाच्या रंगात हवेत उड्या मारून ‘विठ्ठल विठ्ठल’ असा जयघोष करणारे वारकरी. याला उडी-भजन असे म्हणतात.',
    imageUrl: '/images/realistic/wari-udi-bhajan.jpg',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'chandrabhaga-ghats',
    titleMarathi: 'पंढरपूर चंद्रभागा पाषाण घाट व दीपदान',
    titleEnglish: 'Chandrabhaga River Sacred Ghats',
    category: 'temple',
    categoryLabel: 'तीर्थक्षेत्र',
    location: 'पंढरपूर, सोलापूर',
    description: 'पहाटेच्या धुक्यात चंद्रभागेच्या पात्रात तरंगते दिवे आणि काठावरील दीपमाळा. चंद्रभागेच्या पावन स्नानाने वारकऱ्यांची वारी संपन्न होते.',
    imageUrl: '/images/realistic/chandrabhaga-river.jpg',
    aspectClass: 'aspect-[16/10]',
  },
];

type CategoryFilter = 'all' | 'wari' | 'temple' | 'varkari';

export function SacredHeritagePhotoWall() {
  const [activeFilter, setActiveFilter] = React.useState<CategoryFilter>('all');
  const [selectedPhoto, setSelectedPhoto] = React.useState<PhotoItem | null>(null);

  const filteredPhotos = React.useMemo(() => {
    if (activeFilter === 'all') return HERITAGE_PHOTOS;
    return HERITAGE_PHOTOS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleOpenModal = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = React.useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos]);

  const handlePrevPhoto = React.useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos]);

  // Keyboard navigation for modal
  React.useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNextPhoto, handlePrevPhoto]);

  return (
    <section className="vitthalaya-section" aria-labelledby="heritage-gallery-title">
      <div className="vitthalaya-container space-y-8">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[var(--dp-rule)]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--dp-ground-well)] border border-[var(--dp-gold)]/40 text-[var(--dp-gold)] text-xs font-marathi mb-2 shadow-xs">
              <Camera size={13} className="text-[var(--dp-gold)]" aria-hidden="true" />
              <span>अस्सल ऐतिहासिक छायाचित्र संग्रहालय</span>
            </div>
            <h2 id="heritage-gallery-title" className="vitthalaya-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--dp-ink)]">
              वारकरी जीवन व तीर्थक्षेत्र छायाचित्र दालन
            </h2>
            <p className="vitthalaya-prose text-xs sm:text-sm text-[var(--dp-ink-dim)] mt-1">
              पंढरपूर, आळंदी, देहू आणि वारी पदभ्रमणाचे उच्च-रिझोल्यूशन अस्सल छायाचित्र संकलन ({HERITAGE_PHOTOS.length} दुर्मीळ दृश्ये).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-lg bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] shrink-0" role="tablist" aria-label="छायाचित्र प्रकार निवडा">
            {[
              { key: 'all' as const, label: 'सर्व छायाचित्रे', icon: Sparkles },
              { key: 'wari' as const, label: 'आषाढी वारी', icon: Compass },
              { key: 'temple' as const, label: 'तीर्थक्षेत्र व मंदिरे', icon: Landmark },
              { key: 'varkari' as const, label: 'वारकरी संस्कृती', icon: Heart },
            ].map((tab) => {
              const isSelected = activeFilter === tab.key;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-marathi transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px ${
                    isSelected
                      ? 'bg-[var(--dp-gold)] text-[var(--dp-ground)] font-bold shadow-sm'
                      : 'text-[var(--dp-ink-dim)] hover:text-[var(--dp-ink)] hover:bg-[var(--dp-ground)]'
                  }`}
                >
                  <TabIcon size={12} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Photo Gallery Grid with Animated Cards ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`vitthalaya-card rounded-xl overflow-hidden group border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${photo.aspectClass}`}
              >
                {/* Image Container with Shimmer and Ken Burns Hover */}
                <div className="relative w-full h-full min-h-[220px] overflow-hidden bg-[var(--dp-ground-well)] dp-shimmer-container">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.titleMarathi}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground)] via-[var(--dp-ground)]/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-marathi font-bold bg-black/60 text-[var(--dp-gold-celestial)] border border-[var(--dp-gold)]/40 backdrop-blur-md shadow-xs">
                      {photo.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(photo);
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-[var(--dp-gold)] text-white hover:text-[var(--dp-ground)] border border-white/20 transition-all pointer-events-auto cursor-pointer shadow-sm group-hover:scale-110"
                      aria-label={`${photo.titleMarathi} मोठे छायाचित्र पहा`}
                      title="मोठे छायाचित्र पहा"
                    >
                      <Maximize2 size={13} aria-hidden="true" />
                    </button>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="flex items-center gap-1 text-[11px] text-[var(--dp-gold-celestial)] font-marathi mb-1 drop-shadow">
                      <MapPin size={11} aria-hidden="true" />
                      <span>{photo.location}</span>
                    </div>
                    <h3 className="vitthalaya-display text-lg font-bold text-white group-hover:text-[var(--dp-gold-celestial)] transition-colors leading-snug drop-shadow-md">
                      {photo.titleMarathi}
                    </h3>
                  </div>
                </div>

                {/* Card Bottom Meta (Hidden on short devices or shown cleanly) */}
                <div className="p-4 bg-[var(--dp-ground-surface)] border-t border-[var(--dp-rule)]">
                  <p className="text-xs text-[var(--dp-ink-dim)] font-marathi line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                  <div className="pt-3 mt-3 border-t border-[var(--dp-rule)] flex items-center justify-between text-xs font-marathi">
                    <span className="text-[var(--dp-muted)] font-mono text-[11px]">
                      {photo.titleEnglish}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenModal(photo)}
                      className="text-[var(--dp-gold)] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <span>विस्तृत दर्शन</span>
                      <ExternalLink size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Interactive Lightbox Modal ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.titleMarathi}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[92vh] rounded-2xl overflow-hidden border border-[var(--dp-gold)]/40 bg-[var(--dp-ground-well)] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Control Bar */}
              <div className="p-4 sm:px-6 border-b border-[var(--dp-rule)] flex items-center justify-between bg-[var(--dp-ground)]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-marathi font-bold bg-[var(--dp-ground-well)] text-[var(--dp-gold)] border border-[var(--dp-rule)]">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <span className="text-xs text-[var(--dp-muted)] font-marathi flex items-center gap-1">
                    <MapPin size={12} aria-hidden="true" />
                    {selectedPhoto.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="p-2 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] transition-colors cursor-pointer"
                    aria-label="मागील छायाचित्र"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="p-2 rounded-full border border-[var(--dp-rule)] hover:border-[var(--dp-gold)] text-[var(--dp-ink)] transition-colors cursor-pointer"
                    aria-label="पुढील छायाचित्र"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-full bg-black/40 hover:bg-[var(--dp-gold)] text-white hover:text-[var(--dp-ground)] border border-white/20 transition-colors cursor-pointer ml-2"
                    aria-label="खिडकी बंद करा"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Modal High-Res Photographic Viewport with Ken Burns */}
              <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-black flex-1">
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.titleMarathi}
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-contain"
                />
              </div>

              {/* Modal Bottom Caption */}
              <div className="p-5 sm:p-6 bg-[var(--dp-ground)] border-t border-[var(--dp-rule)] space-y-2">
                <h3 className="vitthalaya-display text-xl sm:text-2xl font-bold text-[var(--dp-ink)]">
                  {selectedPhoto.titleMarathi}
                </h3>
                <p className="text-xs text-[var(--dp-gold)] font-mono">
                  {selectedPhoto.titleEnglish}
                </p>
                <p className="vitthalaya-prose text-xs sm:text-sm text-[var(--dp-ink-dim)] leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
