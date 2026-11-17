'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Footprints,
  ArrowRight,
  Waves,
  Sparkles,
  Mountain,
  Sun,
  Compass,
  type LucideIcon,
} from 'lucide-react';

// ── Cinematic milestone strip ─────────────────────────────────────────────
// Five iconic waypoints that tell the visual story of the Wari journey.
// Colors are deep earth tones matching the dark palette.
interface VisualMilestone {
  id: string;
  title: string;
  sub: string;
  color: string;
  imageUrl: string;
  icon: LucideIcon;
  desc: string;
  targetDay: number;
}

const VISUAL_MILESTONES: VisualMilestone[] = [
  {
    id: 'start',
    title: 'आळंदी / देहू',
    sub: 'प्रस्थान · ० किमी',
    color: '#1e3a4a',
    imageUrl: '/images/realistic/alandi-indrayani-river.jpg',
    icon: Sparkles,
    desc: 'पवित्र इंद्रायणी तीरावरून कोट्यवधी वारकऱ्यांची भक्ती यात्रा सुरू होते.',
    targetDay: 1,
  },
  {
    id: 'dive',
    title: 'दिवे घाट',
    sub: 'सासवड · ५२ किमी',
    color: '#2a4a2e',
    imageUrl: '/images/realistic/dive-ghat-panoramic.jpg',
    icon: Mountain,
    desc: 'पर्वत दर्यामधून सर्पाकार वाट आणि डौलदार भगव्या ध्वजांची रांग.',
    targetDay: 4,
  },
  {
    id: 'jejuri',
    title: 'जेजुरी भंडारा',
    sub: '६८ किमी',
    color: '#5a3a00',
    imageUrl: '/images/jejuri-bhandara.png',
    icon: Sun,
    desc: 'सोनेरी भंडाऱ्याची उधळण — पंढरीच्या वाटेवर जणू सोन्याचा वर्षाव.',
    targetDay: 5,
  },
  {
    id: 'ringan',
    title: 'लोणंद रिंगण',
    sub: '९९ किमी',
    color: '#3a1500',
    imageUrl: '/images/realistic/ringan-circular.jpg',
    icon: Compass,
    desc: 'माऊलींच्या अश्वांचे वर्तुळाकार प्रदक्षिणा — आसमंत दुमदुमतो.',
    targetDay: 7,
  },
  {
    id: 'pandharpur',
    title: 'पंढरपूर महामंदिर',
    sub: '२५० किमी',
    color: '#1e3a4a',
    imageUrl: '/images/realistic/pandharpur-temple-facade.jpg',
    icon: Waves,
    desc: 'पवित्र चंद्रभागेत स्नान आणि विठ्ठल चरणी कृतार्थ दंडवत.',
    targetDay: 16,
  },
];

interface WariStop {
  day: number;
  location: string;
  distanceKm: number;
  highlight: string;
  riverOrPass?: string;
  significance: string;
}

const DNYANESHWAR_STOPS: WariStop[] = [
  { day: 1, location: 'आळंदी (प्रस्थान)', distanceKm: 0, highlight: 'समाधी मंदिर प्रस्थान', riverOrPass: 'इंद्रायणी काठ', significance: 'संत ज्ञानेश्वर महाराज पालखीचे प्रस्थान, ज्ञानोबा-माऊली नामाचा अखंड गजर.' },
  { day: 2, location: 'पुणे (भवानी पेठ)', distanceKm: 22, highlight: 'पालखी विठोबा मंदिर', significance: 'पुणे शहरात वैष्णवांचा अथांग मेळा, दोन दिवसांचा पवित्र मुक्काम.' },
  { day: 4, location: 'सासवड', distanceKm: 52, highlight: 'संत सोपानदेव समाधी', riverOrPass: 'दिवे घाट पायथा', significance: 'दिवे घाटातील विहंगम पालखी सोहळा व बंधू सोपानदेवांच्या चरणी नमन.' },
  { day: 5, location: 'जेजुरी', distanceKm: 68, highlight: 'खंडोबा भंडारा उधळण', riverOrPass: 'कऱ्हा नदी', significance: 'सोनेरी भंडाऱ्याची उधळण आणि टाळ-मृदंगाचा अनुपम संगम.' },
  { day: 6, location: 'वाल्हा', distanceKm: 83, highlight: 'महर्षी वाल्मिकी भूमी', significance: 'वारकऱ्यांची भावपूर्ण सेवा आणि अखंड हरिनाम सप्ताह.' },
  { day: 7, location: 'लोणंद', distanceKm: 99, highlight: 'चांदोबाचा लिंब उभे रिंगण', riverOrPass: 'नीरा नदी खोरे', significance: 'पालखी सोहळ्यातील पहिले प्रसिद्ध उभे रिंगण आणि अश्वांची दौड.' },
  { day: 8, location: 'तरडगाव', distanceKm: 114, highlight: 'दत्त मंदिर मुक्काम', significance: 'ग्रामीण महाराष्ट्राचे उत्स्फूर्त आदरातिथ्य आणि भजन कीर्तन.' },
  { day: 9, location: 'फलटण', distanceKm: 134, highlight: 'विमानतळ गोल रिंगण', significance: 'भव्य गोल रिंगणात माऊलींच्या अश्वांची नेत्रदीपक प्रदक्षिणा.' },
  { day: 10, location: 'बरड', distanceKm: 152, highlight: 'वारकरी विश्रांती तळ', significance: 'भक्ती, सेवा आणि अन्नदान परंपरेचा आदर्श दर्शन.' },
  { day: 11, location: 'नातेपुते', distanceKm: 172, highlight: 'दुपारचे उभे रिंगण', significance: 'लाखो वारकऱ्यांची शिस्तबद्ध रांग आणि नामाचा अखंड जयघोष.' },
  { day: 12, location: 'माळशिरस', distanceKm: 190, highlight: 'सदाशिव मंदिर मुक्काम', significance: 'सोलापूर जिल्ह्यात पालखीचे भव्य स्वागत.' },
  { day: 13, location: 'वेळापूर', distanceKm: 208, highlight: 'ठाकूरबुवा समाधी रिंगण', significance: 'पंढरीच्या समीपे पोहोचल्याचा वारकऱ्यांच्या चेहऱ्यावरील विलोभनीय आनंद.' },
  { day: 14, location: 'भंडीशेगाव', distanceKm: 224, highlight: 'तुंगत मुक्काम', significance: 'पंढरपूर सीमेवरील शेवटचा मुक्काम.' },
  { day: 15, location: 'वाखरी', distanceKm: 234, highlight: 'सर्व पालख्यांचे महा-रिंगण', riverOrPass: 'पंढरपूर प्रवेशद्वार', significance: 'माऊली व तुकोबाराय पालख्यांचा ऐतिहासिक मिलाफ आणि महा-रिंगण.' },
  { day: 16, location: 'पंढरपूर (नगरप्रवेश)', distanceKm: 240, highlight: 'चंद्रभागा स्नान व विठ्ठल दर्शन', riverOrPass: 'चंद्रभागा (भीमा)', significance: 'आषाढी एकादशी, पवित्र चंद्रभागा स्नान आणि विठ्ठल चरणी दंडवत.' }
];

const TUKARAM_STOPS: WariStop[] = [
  { day: 1, location: 'देहू (प्रस्थान)', distanceKm: 0, highlight: 'वैकुंठगमन मंदिर प्रस्थान', riverOrPass: 'इंद्रायणी काठ', significance: 'जगद्गुरु तुकाराम महाराजांच्या पादुकांचे विठ्ठल भेटीसाठी भावपूर्ण प्रस्थान.' },
  { day: 2, location: 'आकुर्डी', distanceKm: 16, highlight: 'विठ्ठल मंदिर मुक्काम', significance: 'देहूरोड ते आकुर्डी वारकऱ्यांचे अखंड नामस्मरण.' },
  { day: 3, location: 'पुणे (निवडुंग्या विठ्ठल)', distanceKm: 34, highlight: 'पुणे शहर मुक्काम', significance: 'ज्ञानेश्वर महाराज व तुकाराम महाराज दोन्ही पालख्यांचे पुण्यात एकाच दिवशी दर्शन.' },
  { day: 5, location: 'लोणी काळभोर', distanceKm: 54, highlight: 'हवेली तालुका मुक्काम', riverOrPass: 'मुळा-मुठा खोरे', significance: 'पुण्याहून पूर्वेकडे कूच, वारकऱ्यांची अखंड ज्ञानोबा-तुकाराम भजन सेवा.' },
  { day: 6, location: 'यवत', distanceKm: 76, highlight: 'भैरवनाथ मंदिर मुक्काम', significance: 'ग्रामीण भक्तांकडून मोठ्या उत्साहाने अन्नदान.' },
  { day: 7, location: 'वरवंड', distanceKm: 94, highlight: 'नागेश्वर मंदिर मुक्काम', significance: 'तलावाकाठची शांत संध्याकाळ आणि कीर्तनाचा रंग.' },
  { day: 8, location: 'उंडवडी', distanceKm: 116, highlight: 'बारामती सीमा मुक्काम', significance: 'कष्टाळू शेतकऱ्यांचे माऊली-तुकोबांच्या चरणी समर्पण.' },
  { day: 9, location: 'बारामती', distanceKm: 136, highlight: 'शारदानगर मुक्काम', significance: 'अश्व धाव व गोल रिंगणाचा नेत्रदीपक सोहळा.' },
  { day: 10, location: 'सणसर', distanceKm: 156, highlight: 'बेलवंडी मुक्काम', significance: 'उसाच्या शेतामधून जाणारी भक्तीची पायवाट.' },
  { day: 11, location: 'अंथुर्णे', distanceKm: 172, highlight: 'इंदापूर मार्ग मुक्काम', significance: 'भक्तांचा मेळा आणि कीर्तनातील भाव समाधी.' },
  { day: 12, location: 'इंदापूर', distanceKm: 192, highlight: 'भव्य गोल रिंगण', significance: 'इंदापूरच्या ऐतिहासिक मैदानात तुकोबारायांच्या अश्वाचे प्रसिद्ध रिंगण.' },
  { day: 13, location: 'सराटी', distanceKm: 210, highlight: 'नीरा नदी पवित्र स्नान', riverOrPass: 'नीरा नदी घाट', significance: 'नीरा नदीच्या पावन पात्रात पादुकांचे स्नान आणि पायी परिक्रमा.' },
  { day: 14, location: 'अकलूज', distanceKm: 226, highlight: 'माने विद्यालय रिंगण', significance: 'माळशिरस तालुक्यात तुकाराम महाराज पालखीचे प्रचंड स्वागत.' },
  { day: 15, location: 'वाखरी', distanceKm: 244, highlight: 'उभे रिंगण व पालखी भेट', significance: 'सर्व संतांच्या पालख्या एकत्र येऊन पंढरीच्या वेशीवर विसावतात.' },
  { day: 16, location: 'पंढरपूर', distanceKm: 250, highlight: 'चंद्रभागा स्नान व दर्शन', riverOrPass: 'चंद्रभागा काठ', significance: 'विठ्ठल भेटीचा अवर्णनीय आनंद आणि वारीची पूर्णता.' }
];

function getStopImage(stop: WariStop): string {
  if (stop.day === 1 || stop.location.includes('देहू') || stop.location.includes('आळंदी')) {
    return '/images/realistic/alandi-indrayani-river.jpg';
  }
  if (stop.location.includes('जेजुरी')) {
    return '/images/jejuri-bhandara.png';
  }
  if (stop.location.includes('रिंगण') || stop.highlight.includes('रिंगण')) {
    return '/images/realistic/ringan-circular.jpg';
  }
  if (stop.location.includes('सासवड') || stop.riverOrPass?.includes('घाट')) {
    return '/images/realistic/dive-ghat-panoramic.jpg';
  }
  if (stop.location.includes('पंढरपूर') || stop.riverOrPass?.includes('चंद्रभागा')) {
    return '/images/realistic/pandharpur-temple-facade.jpg';
  }
  if (stop.highlight.includes('रथ') || stop.location.includes('इंदापूर') || stop.location.includes('बारामती')) {
    return '/images/realistic/tukaram-palkhi-rath.jpg';
  }
  if (stop.riverOrPass?.includes('नीरा') || stop.riverOrPass?.includes('कऱ्हा')) {
    return '/images/realistic/alandi-deepmaal.jpg';
  }
  return '/images/realistic/dindi-procession.jpg';
}

export function WariInteractiveRoute() {
  const [selectedRoute, setSelectedRoute] = React.useState<'dnyaneshwar' | 'tukaram'>('dnyaneshwar');
  const [activeStopIndex, setActiveStopIndex] = React.useState(0);

  const stops = selectedRoute === 'dnyaneshwar' ? DNYANESHWAR_STOPS : TUKARAM_STOPS;
  const currentStop = stops[activeStopIndex] || stops[0];

  const jumpToMilestone = (milestone: VisualMilestone) => {
    const targetIdx = stops.findIndex((s) => s.day >= milestone.targetDay);
    if (targetIdx !== -1) {
      setActiveStopIndex(targetIdx);
    } else {
      setActiveStopIndex(stops.length - 1);
    }
  };

  return (
    <div className="vitthalaya-card rounded p-6 sm:p-8 border border-[var(--dp-rule)]">
      {/* Header with Route Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--dp-rule)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-gold)] text-xs font-marathi mb-2">
            <Footprints size={12} aria-hidden="true" />
            पवित्र पदभ्रमण नकाशा
          </span>
          <h2 className="vitthalaya-display text-2xl font-bold">
            आषाढी वारी पालखी मार्ग
          </h2>
          <p className="vitthalaya-prose text-xs text-[var(--dp-ink-dim)] mt-1">
            आळंदी व देहू ते पंढरपूर पर्यंतच्या २५० किमी पायी प्रवासाचे दिवसनिहाय मुक्काम व रिंगण दर्शन.
          </p>
        </div>

        {/* Route Selector Tabs */}
        <div className="flex items-center gap-2 p-1 rounded bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] shrink-0" role="tablist" aria-label="पालखी मार्ग निवडा">
          <button
            type="button"
            role="tab"
            aria-selected={selectedRoute === 'dnyaneshwar'}
            onClick={() => {
              setSelectedRoute('dnyaneshwar');
              setActiveStopIndex(0);
            }}
            className={`px-3 py-1.5 rounded text-xs font-marathi transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRoute === 'dnyaneshwar'
                ? 'bg-[var(--dp-gold)]/20 text-[var(--dp-gold)] font-bold border border-[var(--dp-gold)]/30'
                : 'text-[var(--dp-muted)] hover:text-[var(--dp-ink)]'
            }`}
          >
            ज्ञानेश्वर माऊली (आळंदी)
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedRoute === 'tukaram'}
            onClick={() => {
              setSelectedRoute('tukaram');
              setActiveStopIndex(0);
            }}
            className={`px-3 py-1.5 rounded text-xs font-marathi transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedRoute === 'tukaram'
                ? 'bg-[var(--dp-gold)]/20 text-[var(--dp-gold)] font-bold border border-[var(--dp-gold)]/30'
                : 'text-[var(--dp-muted)] hover:text-[var(--dp-ink)]'
            }`}
          >
            तुकाराम महाराज (देहू)
          </button>
        </div>
      </div>

      {/* ── Visual milestone strip ─────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8"
        role="region"
        aria-label="वारी मुख्य टप्पे व दर्शनीय ठिकाणे"
      >
        {VISUAL_MILESTONES.map((m, idx) => {
          const IconComponent = m.icon;
          const isCurrentMilestone =
            currentStop.day >= m.targetDay &&
            (idx === VISUAL_MILESTONES.length - 1 || currentStop.day < VISUAL_MILESTONES[idx + 1].targetDay);

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => jumpToMilestone(m)}
              title={`${m.title} — ${m.desc}`}
              className={`relative rounded-lg p-3 text-center overflow-hidden cursor-pointer transition-all duration-300 min-h-[84px] flex flex-col items-center justify-center border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dp-gold-celestial)] active:translate-y-px group ${
                isCurrentMilestone
                  ? 'border-[var(--dp-gold-celestial)] shadow-[0_0_18px_rgba(246,188,85,0.3)]'
                  : 'border-[var(--dp-rule)] hover:border-[var(--dp-rule-strong)]'
              }`}
              aria-label={`${m.title} — ${m.sub}. ${m.desc}`}
            >
              {/* Background Photographic Image with Dark Devotional Vignette */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={m.imageUrl}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover opacity-35 group-hover:opacity-65 transition-all duration-500 scale-100 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isCurrentMilestone
                      ? `linear-gradient(to bottom, ${m.color}88 0%, rgba(10,8,6,0.92) 100%)`
                      : 'linear-gradient(to bottom, rgba(14,10,7,0.7) 0%, rgba(8,6,4,0.95) 100%)',
                  }}
                />
              </div>

              {/* Connecting line on desktop */}
              {idx < VISUAL_MILESTONES.length - 1 && (
                <span
                  className="hidden lg:block absolute top-1/2 -right-[6px] w-3 h-px bg-[var(--dp-rule-strong)] z-10 pointer-events-none"
                  aria-hidden="true"
                />
              )}
              <IconComponent
                size={18}
                className={`relative z-10 mb-1 transition-colors ${
                  isCurrentMilestone
                    ? 'text-[var(--dp-gold-celestial)]'
                    : 'text-[var(--dp-gold)] opacity-80 group-hover:opacity-100'
                }`}
                aria-hidden="true"
              />
              <p
                className={`relative z-10 text-xs font-bold font-marathi leading-tight ${
                  isCurrentMilestone
                    ? 'text-[var(--dp-gold-celestial)]'
                    : 'text-[var(--dp-ink)]'
                }`}
              >
                {m.title}
              </p>
              <p className="relative z-10 text-[10px] text-[var(--dp-muted)] font-marathi mt-0.5 leading-tight">
                {m.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Scrollable Milestones Track */}
        <div className="md:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-2 border-r border-[var(--dp-rule)]" aria-label="मुक्काम यादी">
          {stops.map((stop, idx) => {
            const isSelected = idx === activeStopIndex;
            return (
              <button
                key={`${stop.day}-${stop.location}`}
                type="button"
                onClick={() => setActiveStopIndex(idx)}
                className={`w-full text-left p-3 rounded transition-colors flex items-center justify-between border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? 'bg-[var(--dp-ground-well)] border-[var(--dp-gold)] text-[var(--dp-ink)]'
                    : 'border-transparent hover:border-[var(--dp-rule)] text-[var(--dp-ink-dim)]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-marathi shrink-0 ${
                    isSelected
                      ? 'bg-[var(--dp-gold)] text-[var(--dp-ground)]'
                      : 'bg-[var(--dp-ground-well)] border border-[var(--dp-rule)] text-[var(--dp-muted)]'
                  }`}>
                    {stop.day}
                  </span>
                  <div className="min-w-0">
                    <p className={`font-marathi text-xs font-semibold truncate ${isSelected ? 'text-[var(--dp-gold)]' : ''}`}>
                      {stop.location}
                    </p>
                    <p className="text-[10px] text-[var(--dp-muted)] font-marathi truncate">
                      {stop.highlight}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-[var(--dp-muted)] font-marathi shrink-0 ml-2">
                  {stop.distanceKm} किमी
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Stop Preview Card with Authentic Imagery */}
        <div className="md:col-span-7 bg-[var(--dp-ground-well)] rounded border border-[var(--dp-rule)] overflow-hidden space-y-4">
          {/* Stop Landscape Banner */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden border-b border-[var(--dp-rule)]">
            <Image
              src={getStopImage(currentStop)}
              alt={currentStop.location}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dp-ground-well)] via-[var(--dp-ground-well)]/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-[var(--dp-ground)]/90 text-[var(--dp-gold)] border border-[var(--dp-gold)]/40 text-[10px] font-bold font-marathi backdrop-blur-xs">
                दिवस {currentStop.day} मुक्काम
              </span>
              <span className="text-xs text-[var(--dp-ink)] font-marathi bg-[var(--dp-ground)]/80 px-2 py-0.5 rounded border border-[var(--dp-rule)] backdrop-blur-xs">
                {currentStop.distanceKm} किमी
              </span>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--dp-rule)]">
              <div>
                <h3 className="vitthalaya-display text-2xl font-bold text-[var(--dp-ink)]">
                  {currentStop.location}
                </h3>
                <p className="text-xs text-[var(--dp-gold)] font-marathi mt-0.5">
                  {currentStop.highlight}
                </p>
              </div>

              {currentStop.riverOrPass && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--dp-ground)] border border-[var(--dp-rule)] text-xs text-[var(--dp-gold)] font-marathi shrink-0">
                  <Waves size={12} aria-hidden="true" />
                  {currentStop.riverOrPass}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[var(--dp-gold)] font-marathi">
                विशेष महत्त्व व सोहळा:
              </h4>
              <p className="vitthalaya-prose text-xs sm:text-sm leading-relaxed text-[var(--dp-ink-dim)]">
                {currentStop.significance}
              </p>
            </div>

            {/* Animated Wari progress bar */}
            <div className="pt-3 border-t border-[var(--dp-rule)]">
              <div className="flex items-center justify-between text-[11px] font-marathi text-[var(--dp-muted)] mb-2">
                <span>वारी प्रगती: {Math.round((currentStop.distanceKm / 250) * 100)}%</span>
                <span>शिल्लक: {250 - currentStop.distanceKm} किमी</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--dp-ground)] overflow-hidden border border-[var(--dp-rule)]">
                <div
                  className="dp-wari-progress h-full rounded-full"
                  style={{
                    width: `${Math.max(2, Math.round((currentStop.distanceKm / 250) * 100))}%`,
                  }}
                  role="progressbar"
                  aria-valuenow={Math.round((currentStop.distanceKm / 250) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="वारी अंतर प्रगती"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/wari"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--dp-gold)] hover:underline font-marathi focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)] active:translate-y-px"
              >
                <span>संपूर्ण वारी मार्गदर्शिका पहा</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
