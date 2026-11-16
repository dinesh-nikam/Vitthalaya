/**
 * Luxury Maison Data Registry — Atelier Véricourt
 * Haute Conception & Scénographie Digitale (Paris • Kyoto • New York • London)
 *
 * All imagery is verified free-for-commercial-use photography from Unsplash,
 * adhering to strict copyright safety (no logos, no trademarks, no private individuals).
 */

export interface LuxurySalon {
  id: string;
  city: string;
  district: string;
  country: string;
  address: string;
  timeZone: string;
  hours: string;
  conciergeEmail: string;
  conciergePhone: string;
  heroImage: string;
  imageAlt: string;
  photographer: string;
  curator: string;
  description: string;
}

export interface LuxuryProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  discipline: 'horology' | 'spatial' | 'jewellery' | 'digital' | 'monograph';
  disciplineLabel: string;
  year: string;
  salonLocation: string;
  coverImage: string;
  galleryImages: string[];
  imageAlt: string;
  photographer: string;
  clientSector: string;
  palette: string[];
  brief: string;
  scenography: string;
  technicalCraft: string;
  metricsResult: string;
  featured: boolean;
}

export interface LuxuryDiscipline {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  materials: string[];
  image: string;
  imageAlt: string;
  photographer: string;
}

export interface LuxuryEssay {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Aesthetics' | 'Scenography' | 'Typography' | 'Horology';
  author: string;
  readTime: string;
  publishDate: string;
  summary: string;
  content: string[];
  pullQuote: string;
  coverImage: string;
  imageAlt: string;
  photographer: string;
}

export interface MasterCraftsman {
  id: string;
  name: string;
  role: string;
  location: string;
  heritage: string;
  bio: string;
  image: string;
  photographer: string;
}

export interface LuxuryTimelineMilestone {
  year: string;
  title: string;
  city: string;
  description: string;
}

export interface ImageCredit {
  title: string;
  photographer: string;
  source: 'Unsplash';
  license: 'Free Commercial Use (Unsplash License)';
  usage: string;
}

// ── SALONS ────────────────────────────────────────────────────────
export const LUXURY_SALONS: LuxurySalon[] = [
  {
    id: 'paris',
    city: 'Paris',
    district: 'Place Vendôme',
    country: 'France',
    address: '12 Place Vendôme, 75001 Paris',
    timeZone: 'Europe/Paris',
    hours: 'Mon – Fri, 10:00 – 19:00 CET by Private Vernissage',
    conciergeEmail: 'vendome@atelier-vericourt.com',
    conciergePhone: '+33 1 42 68 55 00',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Classical Parisian stone architecture in morning mist',
    photographer: 'Alexander Kagan',
    curator: 'Éléonore de Véricourt',
    description: 'The founding salon nestled beside historical joailliers, dedicated to haute digital architecture and fine typography.',
  },
  {
    id: 'kyoto',
    city: 'Kyoto',
    district: 'Gion-machi',
    country: 'Japan',
    address: '57 Gion-machi Minamigawa, Higashiyama-ku, Kyoto 605-0074',
    timeZone: 'Asia/Tokyo',
    hours: 'Tue – Sat, 11:00 – 18:00 JST by Private Invitation',
    conciergeEmail: 'kyoto@atelier-vericourt.com',
    conciergePhone: '+81 75 561 2280',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Serene wooden architectural pavilion in Kyoto surrounded by nature',
    photographer: 'Su San Lee',
    curator: 'Kenji Takahashi',
    description: 'An architectural sanctuary of cedar, tatami, and diffused natural light where digital metiers merge with centuries-old joinery traditions.',
  },
  {
    id: 'newyork',
    city: 'New York',
    district: 'Madison Avenue',
    country: 'United States',
    address: '740 Madison Avenue, New York, NY 10065',
    timeZone: 'America/New_York',
    hours: 'Mon – Fri, 09:30 – 18:30 EST by Appointment',
    conciergeEmail: 'madison@atelier-vericourt.com',
    conciergePhone: '+1 212 555 0192',
    heroImage: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sculptural stone architecture and dramatic shadows in Manhattan',
    photographer: 'Freddie Marriage',
    curator: 'Arthur Pendelton',
    description: 'A discreet duplex studio serving private foundations, luxury conglomerates, and haute horlogerie collectors across the Americas.',
  },
  {
    id: 'london',
    city: 'London',
    district: 'Mayfair',
    country: 'United Kingdom',
    address: '14 Old Bond Street, Mayfair, London W1S 4PP',
    timeZone: 'Europe/London',
    hours: 'Mon – Fri, 10:00 – 18:00 GMT by Appointment',
    conciergeEmail: 'mayfair@atelier-vericourt.com',
    conciergePhone: '+44 20 7946 0912',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Georgian architectural facades and historic street lamp in London',
    photographer: 'Luke Stackpoole',
    curator: 'Camille Laurent',
    description: 'A private townhouse salon devoted to fine binding monographs, bespoke type design, and archival editorial exhibitions.',
  },
];

// ── SELECTED WORKS ────────────────────────────────────────────────
export const LUXURY_PROJECTS: LuxuryProject[] = [
  {
    id: 'chronometrie-nocturne',
    slug: 'chronometrie-nocturne',
    title: 'Chronométrie Nocturne',
    subtitle: 'Interactive High Horology Flagship & Complication Simulator',
    discipline: 'horology',
    disciplineLabel: 'Haute Horlogerie',
    year: '2026',
    salonLocation: 'Geneva / Paris',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Precision horological complication dial with tourbillon balance wheel',
    photographer: 'Jaelynn Castillo',
    clientSector: 'Independent Haute Horlogerie Maison',
    palette: ['#0A0A0B', '#C5A059', '#EAE6DF', '#222226'],
    brief: 'Create a tactile 60fps digital flagship that mirrors the sub-millimeter precision of a manual-wind perpetual calendar mechanism with astronomical moonphase.',
    scenography: 'We orchestrated an obsidian darkroom atmosphere with mathematical lighting shaders that simulate brushed rhodium bevels, Geneva stripes, and heat-blued screws under shifting light.',
    technicalCraft: 'Custom WebGL raymarching shaders, haptic audio resonance synthesized from real escapement oscillations, micro-spring drag physics.',
    metricsResult: 'Featured at Salon International de la Haute Horlogerie; average engagement surpassed 8 minutes 40 seconds per collector visit.',
    featured: true,
  },
  {
    id: 'pavilion-whispering-stone',
    slug: 'pavilion-whispering-stone',
    title: 'The Pavilion of Whispering Stone',
    subtitle: 'Spatial Scenography & Light Choreography for Kyoto Tea Foundation',
    discipline: 'spatial',
    disciplineLabel: 'Spatial Scenography',
    year: '2025',
    salonLocation: 'Kyoto / Tokyo',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Sculptural stone architecture with serene reflecting pool and warm light',
    photographer: 'RArchitecture',
    clientSector: 'Cultural Heritage Trust & Architectural Biennial',
    palette: ['#1A1918', '#8A6518', '#F5F2EB', '#4A4845'],
    brief: 'Design an interactive pavilion and spatial installation celebrating the acoustics of dry-stacked granodiorite stone and natural mountain spring water.',
    scenography: 'A sequence of five low-contrast chambers engineered with basalt monoliths and concealed fiber-optic uplighting tuned to the 24 micro-seasons of the solar calendar.',
    technicalCraft: 'Spatial audio mapping with ultrasonic directional arrays; custom ambient lighting controllers synchronized with live barometric pressure.',
    metricsResult: 'Awarded the Grand Prix de Scénographie Architecturale 2025; over 62,000 visitors welcomed with zero physical tactile wear.',
    featured: true,
  },
  {
    id: 'maison-orfevrerie',
    slug: 'maison-orfevrerie',
    title: 'Maison d’Orfèvrerie',
    subtitle: 'Haute Joaillerie Archive & Digital Private Viewing Salon',
    discipline: 'jewellery',
    disciplineLabel: 'High Jewellery',
    year: '2025',
    salonLocation: 'Place Vendôme, Paris',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Fine emerald-cut diamond ring on textured alabaster stone surface',
    photographer: 'Cornelia Ng',
    clientSector: 'Heritage High Jewellery House (Est. 1888)',
    palette: ['#0E0D0C', '#D4AF37', '#FFFDF9', '#2E2B27'],
    brief: 'Replace physical print lookbooks with a high-security encrypted digital salon for confidential viewing of one-of-a-kind high jewellery parures.',
    scenography: 'Velvet-black canvas punctuated by spectral diamond refractions, allowing clients to examine facet geometries under morning, noon, and candlelight settings.',
    technicalCraft: 'Client-side biometric authentication, 16K macro zoom without compression artifacts, custom SVG jewelry setting exploded view schematics.',
    metricsResult: '100% confidential transaction rate; private viewing conversions increased by 42% across European and Middle Eastern private collectors.',
    featured: true,
  },
  {
    id: 'acoustic-sanctuary-nine',
    slug: 'acoustic-sanctuary-nine',
    title: 'Sanctuary No. IX',
    subtitle: 'Spatial Acoustic Architecture & Kinetic Digital Chamber',
    discipline: 'digital',
    disciplineLabel: 'Digital Metiers',
    year: '2024',
    salonLocation: 'Zurich / London',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Minimalist interior gallery with curved concrete walls and soft natural illumination',
    photographer: 'RArchitecture',
    clientSector: 'Private Contemporary Art Foundation',
    palette: ['#121110', '#BFA15F', '#E7E2D9', '#383633'],
    brief: 'Create a permanent digital listening environment bridging 12th-century vocal polyphony with generative contemporary sound design.',
    scenography: 'Zero visible cables or hardware; an uninterrupted vaulted chamber where acoustic reverberations are visually echoed in soft ambient luminescence.',
    technicalCraft: 'Web Audio API generative algorithmic resonance, zero-latency convolution reverbs, custom tactile wall controls cast in brushed bronze.',
    metricsResult: 'Selected for the Venice Architecture Biennale collateral program; recognized for acoustic clarity and psychological tranquility.',
    featured: true,
  },
  {
    id: 'typographia-sacra',
    slug: 'typographia-sacra',
    title: 'Typographia Sacra',
    subtitle: 'Limited-Edition Archival Monograph & Bespoke Typeface Foundry',
    discipline: 'monograph',
    disciplineLabel: 'Bespoke Publishing',
    year: '2024',
    salonLocation: 'Milan / London',
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Antiquarian handmade paper, copperplate engravings and artisan bookbinding tools',
    photographer: 'Annie Spratt',
    clientSector: 'Bibliophile Guild & University Press',
    palette: ['#181512', '#C5A059', '#F4EFE6', '#4A3E31'],
    brief: 'Produce a 420-page handbound monograph chronicling Renaissance proportional type geometry alongside a modern optical-size variable font family.',
    scenography: 'Letterpress printed on mould-made cotton paper with Japanese silk ribbon markers, accompanied by an interactive specimen microsite.',
    technicalCraft: 'Three optical type masters (Display, Text, Subhead), custom OpenType ligatures, hot-stamped gold foil covers with blind debossing.',
    metricsResult: 'Edition of 500 numbered copies sold out within 72 hours; acquired by the British Library and Bibliothèque nationale de France.',
    featured: false,
  },
  {
    id: 'aethelgard-complications',
    slug: 'aethelgard-complications',
    title: 'Aethelgard Horological Complications',
    subtitle: 'Digital Spatial Flagship for Double-Axis Celestial Tourbillon',
    discipline: 'digital',
    disciplineLabel: 'Digital Flagship',
    year: '2026',
    salonLocation: 'New York / Madison Ave',
    coverImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    ],
    imageAlt: 'Mechanical tourbillon watch movement with intricate blued titanium gears',
    photographer: 'Jaelynn Castillo',
    clientSector: 'Haute Horlogerie Atelier',
    palette: ['#0A0908', '#D4AF37', '#EDE8DF', '#24201B'],
    brief: 'Orchestrate an online commissioning portal for ultra-high-net-worth collectors to customize bespoke complications in real time.',
    scenography: 'An austere obsidian landscape with interactive lighting control, real-time metal alloy swapping, and engraved balance cock inspection.',
    technicalCraft: 'Physics-driven gear train kinematics, custom WebGL depth-of-field post-processing, and end-to-end encrypted concierge order dispatch.',
    metricsResult: 'Generated €14.8M in direct bespoke commissions within the first 60 days of private launch.',
    featured: false,
  },
];

// ── DISCIPLINES & METIERS ──────────────────────────────────────────
export const LUXURY_DISCIPLINES: LuxuryDiscipline[] = [
  {
    id: 'metier-1',
    number: '01',
    title: 'Brand Metiers & Haute Identity',
    subtitle: 'Bespoke Monograms, Proportional Typography & Sensorial Codes',
    description: 'We construct timeless visual languages for maisons that endure for generations. From custom variable typefaces to wax seals and sensory packaging guidelines, every mark is grounded in classical architectural proportions.',
    deliverables: [
      'Proprietary Custom Typefoundry (Display & Text)',
      'Monogram Crest & Mathematical Geometry Grids',
      'Tactile Material Standards (Paper, Silk, Metals)',
      'Global Brand Guidelines & Executive Editions',
    ],
    materials: ['Hand-laid cotton rag', 'Hot-stamped 24k gold foil', 'Blind debossed leather', 'Pure vegetable inks'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Artisanal papermaking and typography specimen craft',
    photographer: 'Annie Spratt',
  },
  {
    id: 'metier-2',
    number: '02',
    title: 'Spatial Scenography & Light Architecture',
    subtitle: 'Physical Flagships, Exhibition Pavilions & Acoustic Design',
    description: 'Translating brand philosophy into physical space. We orchestrate architectural flow, acoustic calm, and lighting choreographies for flagship salons, VIP private viewing lounges, and museum pavilions.',
    deliverables: [
      'Spatial Masterplanning & Circulation Choreography',
      'Acoustic Calibration & Negative Space Engineering',
      'Bespoke Vitrine & Display Furniture Architecture',
      'Sensory Environmental Lighting (Daylight to Nocturne)',
    ],
    materials: ['Honed travertine', 'Smoked oak joinery', 'Fluted alabaster', 'Satin patinated bronze'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modernist stone architectural interior with tranquil water channel',
    photographer: 'RArchitecture',
  },
  {
    id: 'metier-3',
    number: '03',
    title: 'Digital Haute Flagships & 3D Interactive Salons',
    subtitle: 'Precision WebGL Scenography, Micro-Physics & Tactile Interfaces',
    description: 'Award-winning digital experiences that evoke the weight, luster, and intimate silence of a private salon. We push the frontiers of WebGL and micro-interactions while maintaining effortless 60fps fluidity and accessibility.',
    deliverables: [
      'Interactive 3D Complication & Product Explorers',
      'Encrypted Private Client Viewing Suites',
      'Kinetic Micro-Interactions & Spring Physics',
      'Full WCAG AA Compliance & Flawless Mobile Responsiveness',
    ],
    materials: ['Real-time raymarching shaders', 'Sub-millimeter geometry models', 'Web Audio API synthesizers', 'Kinetic typography'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High horology complication escapement and micro-gears',
    photographer: 'Jaelynn Castillo',
  },
  {
    id: 'metier-4',
    number: '04',
    title: 'Editorial Direction & Archival Monographs',
    subtitle: 'Fine Publishing, Curatorial Essays & Exhibition Catalogues',
    description: 'Crafting printed and digital literature that commands reverence. We direct editorial narratives, commission master photographers, and oversee archival binding to produce collector-grade publications.',
    deliverables: [
      'Hardcover Clothbound Monographs & Slipcases',
      'Curatorial Essays & Academic Provenance Texts',
      'Art Direction for Medium-Format Film Photography',
      'Limited-Edition Box Sets with Certificates of Authenticity',
    ],
    materials: ['Japanese archival book cloth', 'Mould-made deckle edge paper', 'Hand-sewn Smyth binding', 'Gilded page edges'],
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Artisanal jewellery composition on sculpted marble pedestal',
    photographer: 'Cornelia Ng',
  },
];

// ── EDITORIAL ESSAYS / JOURNAL ────────────────────────────────────
export const LUXURY_ESSAYS: LuxuryEssay[] = [
  {
    id: 'acoustic-architecture-silence',
    slug: 'acoustic-architecture-silence',
    title: 'The Acoustic Architecture of Silence',
    subtitle: 'Why Negative Space is the Ultimate Metric of True Luxury',
    category: 'Aesthetics',
    author: 'Éléonore de Véricourt',
    readTime: '6 min read',
    publishDate: 'Autumn 2026',
    summary: 'In an era of relentless visual clutter and algorithmic noise, deliberate restraint is not a stylistic choice — it is a moral and aesthetic imperative.',
    pullQuote: 'Luxury is never the addition of ornament; it is the courage to let the void speak with absolute clarity.',
    content: [
      'To enter a sacred stone cathedral, an ancient Kyoto teahouse, or an unadorned modernist pavilion is to experience a physical deceleration. The pulse slows. The gaze settles. There is no urgency to consume, because the space does not demand anything of the visitor.',
      'In digital design, this quality of negative space has been tragically eroded by growth metrics, intrusive banners, and perpetual stimulation. When every square pixel is forced to justify its conversion yield, majesty becomes impossible.',
      'At Atelier Véricourt, we approach digital canvases as architectural volumes. The whitespace around a single line of serif typography is treated with the same acoustic reverence as the courtyard of a cloister. It is where contemplation occurs.',
      'Restraint requires mastery. When an interface contains only three elements, each element must be beyond reproach: the letter-spacing must be mathematically harmonious, the contrast gentle yet legible, and the micro-physics natural and weightless.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Architectural stone wall and serene minimalist courtyard',
    photographer: 'RArchitecture',
  },
  {
    id: 'from-kyoto-to-digital-glass',
    slug: 'from-kyoto-to-digital-glass',
    title: 'From Kyoto Joinery to Digital Glass',
    subtitle: 'Trans-Cultural Principles of Harmony in Contemporary Scenography',
    category: 'Scenography',
    author: 'Kenji Takahashi',
    readTime: '8 min read',
    publishDate: 'Summer 2026',
    summary: 'How centuries of Japanese shoji joinery, timber interlocking, and diffused paper illumination inform our WebGL lighting models.',
    pullQuote: 'A master joiner does not use nails because wood breathes with the seasons. A digital interface must breathe with the user.',
    content: [
      'In traditional Japanese architecture (Sukiya-zukuri), walls are not barriers; they are translucent screens that filter seasonal weather into soft gradients of shadow and illumination (In\'ei Raisan).',
      'When translating this spatial philosophy into modern digital surfaces, we reject harsh drop-shadows and crude neon glows. Instead, we compute multi-layer ambient occlusions and soft frosted glass blurs that feel organically warm.',
      'A button should not abruptly change color; it should reveal an inner luminescence, like a candle shielded by washi paper. When the interaction ceases, the light recedes gently, leaving no residual distraction.',
      'This dialogue between Kyoto craftsmanship and Paris digital metiers forms the bedrock of our atelier. It ensures our works age with dignity rather than fading with ephemeral trends.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Traditional wooden architecture in Kyoto surrounded by serene greenery',
    photographer: 'Su San Lee',
  },
  {
    id: 'weight-of-typography',
    slug: 'weight-of-typography',
    title: 'The Weight of Typography',
    subtitle: 'How Custom Letterforms Evoke Heritage and Timeless Authority',
    category: 'Typography',
    author: 'Camille Laurent',
    readTime: '5 min read',
    publishDate: 'Spring 2026',
    summary: 'The subtle difference between a generic digital font and a proprietary typeface cut specifically for a maison’s history.',
    pullQuote: 'A serif is not a decorative flourish; it is the anchor that holds a reader’s eye in quiet contemplation.',
    content: [
      'Type is the spoken voice of an institution made visible on paper and screen. Before a single sentence is comprehended, the rhythm of stems, counters, and serifs has already communicated trust, prestige, or vulgarity.',
      'When designing proprietary typefaces for high horology houses and private art collections, we study archival lapidary inscriptions from the Renaissance alongside 18th-century French Didot matrices.',
      'We sculpt optical sizes: at monumental display scales, hairlines become delicate threads of spun silver; at small text sizes, the counters open up to preserve effortless legibility under low ambient lighting.',
      'The result is a typographic presence that feels eternal — an identity that belongs uniquely to one house and cannot be replicated by any standard software template.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Handcrafted typographic prints and artisanal paper specimens',
    photographer: 'Annie Spratt',
  },
  {
    id: 'high-horology-scenography',
    slug: 'high-horology-scenography',
    title: 'Tactile Scenography in High Horology',
    subtitle: 'Staging Grand Complications for the Discerning Collector',
    category: 'Horology',
    author: 'Arthur Pendelton',
    readTime: '7 min read',
    publishDate: 'Winter 2025',
    summary: 'Techniques for conveying mechanical gravitas, metallurgical textures, and acoustic balance chimes in digital mediums.',
    pullQuote: 'In high horology, time is not counted; it is celebrated as an astronomical choreography of hand-polished steel.',
    content: [
      'A minute repeater or double-axis tourbillon is among humanity’s most miraculous micro-mechanical achievements. Yet on a computer monitor, it is too often reduced to flat, lifeless catalog photography.',
      'To honor the hundreds of hours invested by a master watchmaker, digital scenography must reproduce the play of oblique raking light across Côtes de Genève engravings and mirror-polished anglage bevels.',
      'In our interactive simulators, collectors can pull the winding crown, engage the minute repeater slide, and listen to the authentic acoustic chime captured in an anechoic chamber in Vallée de Joux.',
      'This emotional fidelity bridges the physical and digital realms, allowing collectors to fall in love with the soul of a timepiece long before they touch the physical creation.',
    ],
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hand-assembled mechanical watch movement with gold chatons and rubies',
    photographer: 'Jaelynn Castillo',
  },
];

// ── MASTER CRAFTSMEN & DIRECTORS ──────────────────────────────────
export const MASTER_CRAFTSMEN: MasterCraftsman[] = [
  {
    id: 'eleonore-vericourt',
    name: 'Éléonore de Véricourt',
    role: 'Founding Creative Director & Architect',
    location: 'Paris, France',
    heritage: 'École Nationale Supérieure des Arts Décoratifs, Paris',
    bio: 'Pioneered the integration of classical French architectural scenography with interactive digital canvases. Advisor to international heritage foundations.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photographer: 'Averie Woodard',
  },
  {
    id: 'kenji-takahashi',
    name: 'Kenji Takahashi',
    role: 'Director of Spatial Scenography & Light',
    location: 'Kyoto, Japan',
    heritage: 'Master Joiner Guild, Kyoto / Tokyo University of the Arts',
    bio: 'Fourth-generation architectural scenographer specializing in acoustic silence, dry-timber engineering, and Japanese shadow theory.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photographer: 'Joseph Gonzalez',
  },
  {
    id: 'arthur-pendelton',
    name: 'Arthur Pendelton',
    role: 'Head of Creative Engineering & WebGL',
    location: 'New York, USA',
    heritage: 'MIT Media Lab / Cooper Union',
    bio: 'Renowned digital artisan crafting mathematical shader physics, real-time complication simulations, and low-latency haptic experiences.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photographer: 'Jurica Koletić',
  },
  {
    id: 'camille-laurent',
    name: 'Camille Laurent',
    role: 'Director of Archival Typography & Print',
    location: 'London, UK',
    heritage: 'Royal College of Art / Imprimerie Nationale Fellow',
    bio: 'Master typographer and bibliophile directing bespoke font development, watermarked papermaking, and museum monograph publications.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    photographer: 'Christian Buehner',
  },
];

// ── PROVENANCE TIMELINE ───────────────────────────────────────────
export const LUXURY_TIMELINE: LuxuryTimelineMilestone[] = [
  {
    year: '2014',
    title: 'Founding of the Paris Atelier',
    city: 'Place Vendôme, Paris',
    description: 'Established as an independent atelier devoted to bespoke digital typography and private exhibition scenography for Parisian joailliers.',
  },
  {
    year: '2018',
    title: 'Inauguration of the Kyoto Pavilion',
    city: 'Gion-machi, Kyoto',
    description: 'Expanded across the Pacific to establish our physical timber sanctuary, merging centuries of Japanese woodwork with emerging digital metiers.',
  },
  {
    year: '2021',
    title: 'Grand Prix de Design Numérique',
    city: 'Geneva / Milan',
    description: 'Awarded the international Grand Prix for Chronométrie Nocturne, heralded as the defining benchmark for digital haute horlogerie.',
  },
  {
    year: '2024',
    title: 'Opening of Madison Avenue Salon',
    city: 'New York City',
    description: 'Opened private duplex quarters on Madison Avenue to steward transatlantic commissions for private art foundations and family offices.',
  },
  {
    year: '2026',
    title: 'The Restraint Protocol',
    city: 'Global Salons',
    description: 'Formalized our pledge: zero algorithmic trackers, 100% green-sequestered server infrastructure, and lifelong archival code preservation.',
  },
];

// ── METRICS & LAURELS ─────────────────────────────────────────────
export const LUXURY_METRICS = [
  {
    value: 24,
    suffix: '',
    label: 'International Laurels',
    description: 'Grand Prix honors across Paris, Milan, Tokyo & Geneva',
  },
  {
    value: 180,
    suffix: '+',
    label: 'Bespoke Commissions',
    description: 'Delivered for royal foundations, heritage maisons & private patrons',
  },
  {
    value: 4,
    suffix: '',
    label: 'Global Salons',
    description: 'Private quarters in Paris, Kyoto, New York & London',
  },
  {
    value: 99.8,
    suffix: '%',
    label: 'Patron Retention',
    description: 'Multi-decade stewardship across consecutive generations',
  },
];

// ── IMAGE CREDITS & COPYRIGHT CITATIONS ───────────────────────────
export const LUXURY_IMAGE_CREDITS: ImageCredit[] = [
  {
    title: 'Paris Classical Architecture in Morning Mist',
    photographer: 'Alexander Kagan',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Paris Salon Hero Banner',
  },
  {
    title: 'Traditional Kyoto Wooden Pavilion & Gardens',
    photographer: 'Su San Lee',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Kyoto Salon Architecture & Craftsmanship Banner',
  },
  {
    title: 'Manhattan Sculptural Stone Architecture',
    photographer: 'Freddie Marriage',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'New York Madison Salon Banner',
  },
  {
    title: 'Mayfair Historic Townhouse & Street Lamp',
    photographer: 'Luke Stackpoole',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'London Old Bond Street Salon Banner',
  },
  {
    title: 'High Horology Complication Mechanism & Escapement',
    photographer: 'Jaelynn Castillo',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Chronométrie Nocturne Project Showcase',
  },
  {
    title: 'Minimalist Architecture & Natural Water Channel',
    photographer: 'RArchitecture',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Pavilion of Whispering Stone & Spatial Scenography',
  },
  {
    title: 'Fine Emerald-Cut Diamond Ring on Marble Pedestal',
    photographer: 'Cornelia Ng',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Maison d’Orfèvrerie High Jewellery Showcase',
  },
  {
    title: 'Antiquarian Handcrafted Paper & Binding Tools',
    photographer: 'Annie Spratt',
    source: 'Unsplash',
    license: 'Free Commercial Use (Unsplash License)',
    usage: 'Typographia Sacra Monograph Specimen Banner',
  },
];

// ── FAQ ───────────────────────────────────────────────────────────
export interface LuxuryFAQ {
  question: string;
  answer: string;
}

export const LUXURY_FAQS: LuxuryFAQ[] = [
  {
    question: 'How are private bespoke commissions initiated?',
    answer: 'Patrons may submit an enquiry via our encrypted salon portal or request an in-person private audience at our Paris, Kyoto, New York, or London salons. Following initial verification, our Curatorial Board conducts a confidential diagnostic consultation within 48 business hours.',
  },
  {
    question: 'What is the standard engagement timeline for a bespoke digital flagship?',
    answer: 'A comprehensive commission typically spans sixteen to twenty-four weeks, encompassing deep historical research, custom typefoundry sculpting, 3D WebGL scenography, spatial acoustics, and rigorous security verification.',
  },
  {
    question: 'How does Atelier Véricourt guarantee intellectual property and confidentiality?',
    answer: 'Every commission is executed under strict non-disclosure covenants. All proprietary assets, custom fonts, 3D assets, and codebases are transferred with full, unencumbered perpetual ownership to the patron.',
  },
  {
    question: 'What is the typical investment threshold for atelier works?',
    answer: 'Bespoke engagements begin at €65,000 for brand identity and monograph editions, and scale upwards depending on the complexity of interactive 3D simulations, spatial architecture, and multi-disciplinary scope.',
  },
];


// ── SENSORIAL NOBLE MATERIALS ────────────────────────────────────
export interface LuxuryNobleMaterial {
  id: string;
  name: string;
  category: 'Stone' | 'Precious Metal' | 'Timber' | 'Paper & Silk' | 'Crystal';
  origin: string;
  colorHex: string;
  textureDescription: string;
  mohsHardness: number;
  acousticFrequency: number; // Hz for acoustic timbre synthesis
  reflectionCoeff: number; // 0 to 1
  description: string;
  architecturalApplications: string[];
}

export const LUXURY_NOBLE_MATERIALS: LuxuryNobleMaterial[] = [
  {
    id: 'travertine',
    name: 'Honed Roman Travertine',
    category: 'Stone',
    origin: 'Tivoli Quarries, Lazio, Italy',
    colorHex: '#E6DECE',
    textureDescription: 'Subtle micro-porous sedimentary striations with a matte silk hand-honed finish.',
    mohsHardness: 3.5,
    acousticFrequency: 440,
    reflectionCoeff: 0.32,
    description: 'The monumental stone of Rome. Absorbs ambient glare and diffuses low-frequency room echoes into serene warmth.',
    architecturalApplications: ['Monolithic reception plinths', 'Floating cantilevered stairs', 'Acoustic gallery floors'],
  },
  {
    id: 'ormolu-gold',
    name: '18k Brushed Ormolu Gold',
    category: 'Precious Metal',
    origin: 'Val-de-Travers & Paris Foundry',
    colorHex: '#C5A059',
    textureDescription: 'Micro-linear wire-brushed satin luster with warm 750‰ gold saturation.',
    mohsHardness: 2.8,
    acousticFrequency: 2160,
    reflectionCoeff: 0.88,
    description: 'Crafted following classical French gilding treatises. Reflects flickering candlelight with majestic warmth.',
    architecturalApplications: ['Haute horlogerie balance bridges', 'Monogram brand seals', 'Bespoke lighting vitrines'],
  },
  {
    id: 'kyoto-cedar',
    name: 'Smoked Kyoto Hinoki Cedar',
    category: 'Timber',
    origin: 'Kitayama Sacred Forest, Kyoto, Japan',
    colorHex: '#4A3E31',
    textureDescription: 'Tight straight grain charred gently under Japanese cedar shavings and sealed with camellia oil.',
    mohsHardness: 2.2,
    acousticFrequency: 220,
    reflectionCoeff: 0.18,
    description: 'Centuries-old timber possessing subtle natural cedar aroma and acoustic damping that calms the human nervous system.',
    architecturalApplications: ['Sukiya shoji joinery', 'Private salon wall panelling', 'Acoustic baffle ceilings'],
  },
  {
    id: 'washi-paper',
    name: 'Kurotani Mulberry Washi',
    category: 'Paper & Silk',
    origin: 'Ayabe River Valleys, Kyoto',
    colorHex: '#F5F0E6',
    textureDescription: 'Hand-beaten long kozo fibers dried on ginkgo wood boards with deckle edges.',
    mohsHardness: 0.5,
    acousticFrequency: 880,
    reflectionCoeff: 0.12,
    description: 'Translucent paper with a lifespan exceeding one thousand years. Filters direct sunlight into a gentle celestial mist.',
    architecturalApplications: ['Limited edition monographs', 'Diffused architectural lanterns', 'Provenance certificates'],
  },
  {
    id: 'rhodium-steel',
    name: 'Mirror-Polished Rhodium Anglage',
    category: 'Precious Metal',
    origin: 'Vallée de Joux, Switzerland',
    colorHex: '#D8D8DC',
    textureDescription: 'Sub-millimeter 45-degree chamfered edges hand-buffed with gentian wood paste.',
    mohsHardness: 6.0,
    acousticFrequency: 3240,
    reflectionCoeff: 0.94,
    description: 'The pinnacle of high horology finishing. Casts razor-sharp prismatic reflections under moving illumination.',
    architecturalApplications: ['Perpetual calendar movement bridges', 'Precision tactile dials', 'Interactive 3D complication shaders'],
  },
  {
    id: 'obsidian-crystal',
    name: 'Basaltic Obsidian Crystal',
    category: 'Crystal',
    origin: 'Lipari Volcanic Dome, Mediterranean',
    colorHex: '#0B0A0C',
    textureDescription: 'Conchoidal vitreous fracture with pitch-black specular depth and zero porosity.',
    mohsHardness: 5.5,
    acousticFrequency: 1440,
    reflectionCoeff: 0.76,
    description: 'Born of rapid volcanic quenching. Creates an abyssal darkroom background against which fine materials glow.',
    architecturalApplications: ['Monochrome watch dials', 'Submerged reflection pools', 'Private viewing chamber walls'],
  },
];

// ── CURATORIAL DIAGNOSTIC ARCHETYPES ──────────────────────────────
export interface CuratorialArchetype {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  recommendedMetier: string;
  recommendedSalon: string;
  palette: string[];
  materials: string[];
  projectedTimelineWeeks: number;
  investmentGuide: string;
  diagnosticNarrative: string;
}

export const CURATORIAL_ARCHETYPES: Record<string, CuratorialArchetype> = {
  monumental_quietude: {
    id: 'monumental_quietude',
    title: 'The Cathedral of Whispered Light',
    subtitle: 'Spatial Monolith Architecture & Acoustic Sacred Restraint',
    quote: 'True authority does not shout across the square; it invites the world into quiet communion.',
    recommendedMetier: 'Spatial Scenography & Light Architecture',
    recommendedSalon: 'Paris (Place Vendôme)',
    palette: ['#0C0B0A', '#E6DECE', '#C5A059', '#3A3733'],
    materials: ['Honed Roman Travertine', 'Fluted Alabaster', '18k Ormolu Gold'],
    projectedTimelineWeeks: 22,
    investmentGuide: '€140,000 – €280,000',
    diagnosticNarrative: 'Your vision calls for an immovable, permanent spatial statement. We recommend monolithic stone volumes punctuated by calibrated daylight shafts and custom acoustic absorption.',
  },
  mathematical_horology: {
    id: 'mathematical_horology',
    title: 'The Celestial Gear Train',
    subtitle: 'Interactive 3D Complication Simulator & Micro-Mechanical Art',
    quote: 'In the microscopic heart of a tourbillon, geometry and astronomy become one.',
    recommendedMetier: 'Digital Haute Flagships & 3D WebGL Salons',
    recommendedSalon: 'New York (Madison Avenue)',
    palette: ['#0A0909', '#D8D8DC', '#C5A059', '#1F1E22'],
    materials: ['Mirror-Polished Rhodium Anglage', 'Blued Titanium', 'Smoked Obsidian'],
    projectedTimelineWeeks: 18,
    investmentGuide: '€95,000 – €190,000',
    diagnosticNarrative: 'Your commission demands sub-millimeter precision. We recommend a custom WebGL raymarching engine with 60fps micro-physics, allowing collectors to operate complications in real time.',
  },
  sensorial_organicism: {
    id: 'sensorial_organicism',
    title: 'The Pavilion of Sacred Timber',
    subtitle: 'Shoji Joinery, Natural Resins & Trans-Cultural Harmony',
    quote: 'When wood breathes with the rain and sun, an interface ceases to be a machine.',
    recommendedMetier: 'Spatial Scenography & Bespoke Monographs',
    recommendedSalon: 'Kyoto (Gion-machi)',
    palette: ['#141210', '#4A3E31', '#F5F0E6', '#8A6518'],
    materials: ['Smoked Kyoto Hinoki Cedar', 'Kurotani Washi', 'Natural Camellia Oil'],
    projectedTimelineWeeks: 20,
    investmentGuide: '€110,000 – €220,000',
    diagnosticNarrative: 'Your vision seeks an organic, seasonal dialogue. We suggest a harmonious blend of charred Japanese timber joinery and deckle-edged letterpress literature.',
  },
  archival_sovereignty: {
    id: 'archival_sovereignty',
    title: 'Typographia Perpetua',
    subtitle: 'Proprietary Typefoundry & Hardbound Collector Monographs',
    quote: 'A word set in a maison’s own typeface endures longer than empires.',
    recommendedMetier: 'Brand Metiers & Archival Monographs',
    recommendedSalon: 'London (Mayfair)',
    palette: ['#121110', '#C5A059', '#F4EFE6', '#2D2822'],
    materials: ['Hand-Laid Cotton Rag', '24k Hot-Stamped Gold Foil', 'Smyth-Sewn Book Cloth'],
    projectedTimelineWeeks: 16,
    investmentGuide: '€75,000 – €160,000',
    diagnosticNarrative: 'Your heritage commands typographic permanence. We propose a bespoke three-master variable font family (Display, Text, Inscription) paired with numbered hardcover publications.',
  },
};

// ── DIURNAL LIGHTING PRESETS ──────────────────────────────────────
export interface DiurnalLightPreset {
  id: 'aube' | 'zenith' | 'crepuscule' | 'nocturne';
  name: string;
  timeLabel: string;
  frenchTitle: string;
  colorTempK: string;
  sunElevationDeg: number;
  accentGlow: string;
  surfaceBrightness: number;
  description: string;
}

export const DIURNAL_LIGHT_PRESETS: DiurnalLightPreset[] = [
  {
    id: 'aube',
    name: 'Dawn',
    frenchTitle: 'L’Aube Dorée',
    timeLabel: '06:30 CET',
    colorTempK: '2800K',
    sunElevationDeg: 8,
    accentGlow: 'rgba(235, 178, 110, 0.4)',
    surfaceBrightness: 0.95,
    description: 'Gentle low-angle morning rays casting long, warm amber shadows across travertine facades.',
  },
  {
    id: 'zenith',
    name: 'Zenith',
    frenchTitle: 'Le Zénith Pur',
    timeLabel: '12:00 CET',
    colorTempK: '5600K',
    sunElevationDeg: 68,
    accentGlow: 'rgba(255, 235, 195, 0.5)',
    surfaceBrightness: 1.05,
    description: 'Crisp, high-contrast architectural chiaroscuro under pure noon sun with razor-sharp bevel definition.',
  },
  {
    id: 'crepuscule',
    name: 'Dusk',
    frenchTitle: 'Le Crépuscule',
    timeLabel: '18:45 CET',
    colorTempK: '2200K',
    sunElevationDeg: -2,
    accentGlow: 'rgba(212, 138, 62, 0.45)',
    surfaceBrightness: 0.88,
    description: 'Rich cognac amber and violet twilight slipping into soft velvet darkness with warm fireplace glow.',
  },
  {
    id: 'nocturne',
    name: 'Midnight',
    frenchTitle: 'La Nuit Noire',
    timeLabel: '00:00 CET',
    colorTempK: '1800K',
    sunElevationDeg: -45,
    accentGlow: 'rgba(197, 160, 89, 0.3)',
    surfaceBrightness: 0.75,
    description: 'Obsidian silence punctuated by pin-point diamond starlight and brushed platinum luminescence.',
  },
];
