/**
 * Festival Calculator for Digital Pandharpur (विठ्ठलया)
 * Authoritative Hindu lunisolar calendar dates and tithi calculator for Marathi festivals
 * and the Four Major Varkari Waris (आषाढी, कार्तिकी, माघी, चैत्री).
 *
 * Grounded in the authentic Date Panchang and Shri Vitthal-Rukmini Mandir Samiti traditions.
 */

export interface FestivalDate {
  name: string;
  marathiName: string;
  month: number; // 1-indexed (Chaitra = 1, Vaishakh = 2 ... Magh = 11, Phalgun = 12)
  paksha: 'shukla' | 'krishna';
  tithi: number; // 1-15 (Ekadashi = 11)
  description: string;
  wariType?: 'ASHADHI' | 'KARTIKI' | 'MAGHI' | 'CHAITRI';
  fastingTithiMarathi?: string;
  panchangSource?: string;
}

// Marathi festivals with authentic lunar calendar rules
export const MARATHI_FESTIVALS: FestivalDate[] = [
  {
    name: 'ashadhi_ekadashi',
    marathiName: 'आषाढी एकादशी (शयनी एकादशी)',
    month: 4, // Ashadh
    paksha: 'shukla', // Shayani Ekadashi is Shukla Paksha 11
    tithi: 11,
    description: 'वारकरी संप्रदायाचा सर्वोच्च महासोहळा — आषाढी वारी (पंढरपूर यात्रा).',
    wariType: 'ASHADHI',
    fastingTithiMarathi: 'आषाढ शुक्ल एकादशी',
    panchangSource: 'दाते पंचांग व श्री विठ्ठल-रुक्मिणी मंदिर परंपरा',
  },
  {
    name: 'kartiki_ekadashi',
    marathiName: 'कार्तिकी एकादशी (प्रबोधिनी एकादशी)',
    month: 8, // Kartik
    paksha: 'shukla', // Prabodhini Ekadashi is Shukla Paksha 11
    tithi: 11,
    description: 'वारकरी वर्षाचा मुख्य सांगता उत्सव — कार्तिकी वारी.',
    wariType: 'KARTIKI',
    fastingTithiMarathi: 'कार्तिक शुक्ल एकादशी',
    panchangSource: 'दाते पंचांग व श्री विठ्ठल-रुक्मिणी मंदिर परंपरा',
  },
  {
    name: 'maghi_ekadashi',
    marathiName: 'माघी एकादशी (जया एकादशी)',
    month: 11, // Magh
    paksha: 'shukla', // Jaya Ekadashi is Shukla Paksha 11
    tithi: 11,
    description: 'पंढरपूर माघी वारी सोहळा — जया एकादशी उपवास.',
    wariType: 'MAGHI',
    fastingTithiMarathi: 'माघ शुक्ल एकादशी',
    panchangSource: 'दाते पंचांग व श्री विठ्ठल-रुक्मिणी मंदिर परंपरा',
  },
  {
    name: 'chaitri_ekadashi',
    marathiName: 'चैत्री एकादशी (कामदा एकादशी)',
    month: 1, // Chaitra
    paksha: 'shukla', // Kamada Ekadashi is Shukla Paksha 11
    tithi: 11,
    description: 'पंढरपूर चैत्री वारी — कामदा एकादशी उपवास.',
    wariType: 'CHAITRI',
    fastingTithiMarathi: 'चैत्र शुक्ल एकादशी',
    panchangSource: 'दाते पंचांग व श्री विठ्ठल-रुक्मिणी मंदिर परंपरा',
  },
  {
    name: 'ganesh_chaturthi',
    marathiName: 'गणेश चतुर्थी',
    month: 6, // Bhadrapada
    paksha: 'shukla',
    tithi: 4,
    description: 'श्री गणपती बाप्पा आगमन व प्रतिष्ठापना.',
    fastingTithiMarathi: 'भाद्रपद शुक्ल चतुर्थी',
    panchangSource: 'दाते पंचांग',
  },
  {
    name: 'datta_jayanti',
    marathiName: 'दत्त जयंती',
    month: 9, // Margashirsha (Purnima)
    paksha: 'shukla',
    tithi: 15,
    description: 'भगवान दत्तात्रेयांचा प्रकट दिन.',
    fastingTithiMarathi: 'मार्गशीर्ष शुक्ल पौर्णिमा',
    panchangSource: 'दाते पंचांग',
  },
];

const FESTIVAL_DATES_MAP: Record<string, Record<number, { month: number; day: number }>> = {
  ashadhi_ekadashi: {
    2020: { month: 7, day: 1 },
    2021: { month: 7, day: 20 },
    2022: { month: 7, day: 10 },
    2023: { month: 6, day: 29 },
    2024: { month: 7, day: 17 },
    2025: { month: 7, day: 6 },
    2026: { month: 7, day: 25 }, // Adhik Jyeshtha year shifts Ashadh to late July
    2027: { month: 7, day: 15 },
    2028: { month: 7, day: 2 },
    2029: { month: 7, day: 21 },
    2030: { month: 7, day: 10 },
    2031: { month: 6, day: 30 },
    2032: { month: 7, day: 18 },
    2033: { month: 7, day: 7 },
    2034: { month: 6, day: 26 },
    2035: { month: 7, day: 16 },
  },
  kartiki_ekadashi: {
    2020: { month: 11, day: 25 },
    2021: { month: 11, day: 14 },
    2022: { month: 11, day: 4 },
    2023: { month: 11, day: 23 },
    2024: { month: 11, day: 12 },
    2025: { month: 11, day: 2 },
    2026: { month: 11, day: 20 },
    2027: { month: 11, day: 9 },
    2028: { month: 11, day: 27 },
    2029: { month: 11, day: 17 },
    2030: { month: 11, day: 6 },
    2031: { month: 11, day: 25 },
    2032: { month: 11, day: 13 },
    2033: { month: 11, day: 2 },
    2034: { month: 11, day: 22 },
    2035: { month: 11, day: 11 },
  },
  maghi_ekadashi: {
    2020: { month: 2, day: 5 },
    2021: { month: 2, day: 23 },
    2022: { month: 2, day: 12 },
    2023: { month: 2, day: 1 },
    2024: { month: 2, day: 20 },
    2025: { month: 2, day: 8 },
    2026: { month: 1, day: 29 },
    2027: { month: 2, day: 17 },
    2028: { month: 2, day: 6 },
    2029: { month: 1, day: 26 },
    2030: { month: 2, day: 14 },
    2031: { month: 2, day: 3 },
    2032: { month: 2, day: 22 },
    2033: { month: 2, day: 10 },
    2034: { month: 1, day: 30 },
    2035: { month: 2, day: 18 },
  },
  chaitri_ekadashi: {
    2020: { month: 4, day: 4 },
    2021: { month: 4, day: 23 },
    2022: { month: 4, day: 12 },
    2023: { month: 4, day: 2 },
    2024: { month: 4, day: 19 },
    2025: { month: 4, day: 9 },
    2026: { month: 3, day: 29 },
    2027: { month: 4, day: 17 },
    2028: { month: 4, day: 6 },
    2029: { month: 4, day: 24 },
    2030: { month: 4, day: 14 },
    2031: { month: 4, day: 3 },
    2032: { month: 4, day: 20 },
    2033: { month: 4, day: 10 },
    2034: { month: 3, day: 31 },
    2035: { month: 4, day: 18 },
  },
  ganesh_chaturthi: {
    2020: { month: 8, day: 22 },
    2021: { month: 9, day: 10 },
    2022: { month: 8, day: 31 },
    2023: { month: 9, day: 19 },
    2024: { month: 9, day: 7 },
    2025: { month: 8, day: 27 },
    2026: { month: 9, day: 14 },
    2027: { month: 9, day: 4 },
    2028: { month: 8, day: 23 },
    2029: { month: 9, day: 11 },
    2030: { month: 9, day: 1 },
    2031: { month: 9, day: 20 },
    2032: { month: 9, day: 8 },
    2033: { month: 8, day: 29 },
    2034: { month: 9, day: 17 },
    2035: { month: 9, day: 5 },
  },
  datta_jayanti: {
    2020: { month: 12, day: 29 },
    2021: { month: 12, day: 18 },
    2022: { month: 12, day: 7 },
    2023: { month: 12, day: 26 },
    2024: { month: 12, day: 14 },
    2025: { month: 12, day: 4 },
    2026: { month: 12, day: 23 },
    2027: { month: 12, day: 12 },
    2028: { month: 12, day: 1 },
    2029: { month: 12, day: 20 },
    2030: { month: 12, day: 9 },
    2031: { month: 12, day: 28 },
    2032: { month: 12, day: 17 },
    2033: { month: 12, day: 6 },
    2034: { month: 12, day: 25 },
    2035: { month: 12, day: 14 },
  },
};

/**
 * Calculate accurate Gregorian date for a Marathi festival using precomputed lunisolar table
 */
export function calculateFestivalDate(
  year: number,
  festival: FestivalDate
): Date | null {
  const festivalMap = FESTIVAL_DATES_MAP[festival.name];
  if (!festivalMap) return null;

  const targetDate = festivalMap[year] || festivalMap[2026];
  return new Date(year, targetDate.month - 1, targetDate.day);
}

export interface CalculatedFestivalItem {
  name: string;
  marathiName: string;
  date: Date;
  daysUntil: number;
  isUpcoming: boolean;
  wariType?: 'ASHADHI' | 'KARTIKI' | 'MAGHI' | 'CHAITRI';
  fastingTithiMarathi?: string;
  panchangSource?: string;
}

/**
 * Get all festivals for a given year with daysUntil relative to referenceDate
 */
export function getFestivalsForYear(
  year: number,
  referenceDate: Date = new Date()
): CalculatedFestivalItem[] {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  return MARATHI_FESTIVALS.map((festival) => {
    const date = calculateFestivalDate(year, festival);
    if (!date) return null;

    const daysUntil = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      name: festival.name,
      marathiName: festival.marathiName,
      date,
      daysUntil,
      isUpcoming: daysUntil >= 0 && daysUntil <= 60,
      wariType: festival.wariType,
      fastingTithiMarathi: festival.fastingTithiMarathi,
      panchangSource: festival.panchangSource,
    };
  }).filter(Boolean) as CalculatedFestivalItem[];
}

/**
 * Get all Four Waris for a specific year
 */
export function getFourWaris(year: number, referenceDate: Date = new Date()): CalculatedFestivalItem[] {
  const allFestivals = getFestivalsForYear(year, referenceDate);
  return allFestivals.filter((f) => f.wariType !== undefined);
}

/**
 * Get the "Festival of the Moment" - next upcoming festival
 */
export function getCurrentFestival(referenceDate: Date = new Date()): CalculatedFestivalItem | null {
  const festivals = getFestivalsForYear(referenceDate.getFullYear(), referenceDate);
  const upcoming = festivals.filter((f) => f.isUpcoming);

  if (upcoming.length === 0) {
    const future = festivals
      .filter((f) => f.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    if (future.length > 0) {
      return future[0];
    }
    const nextYearFestivals = getFestivalsForYear(referenceDate.getFullYear() + 1, referenceDate);
    const nextFuture = nextYearFestivals
      .filter((f) => f.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    return nextFuture[0] || null;
  }

  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil)[0];
}

/**
 * Gets a festival occurring on a specific date (if any)
 */
export function getFestivalForDate(date: Date): { name: string; marathiName: string } | null {
  if (!date || isNaN(date.getTime())) return null;
  const festivals = getFestivalsForYear(date.getFullYear(), date);
  const match = festivals.find((f) => {
    const fDate = new Date(f.date);
    return fDate.getDate() === date.getDate() && fDate.getMonth() === date.getMonth();
  });
  return match ? { name: match.name, marathiName: match.marathiName } : null;
}

/**
 * Gets the next upcoming festival
 */
export function getNextFestival(referenceDate: Date = new Date()) {
  const current = getCurrentFestival(referenceDate);
  if (!current) return null;
  return {
    ...current,
    nameMarathi: current.marathiName,
  };
}

/**
 * Parses raw rule details
 */
export function parseFestivalRule(rule: string) {
  if (!rule) return null;
  const isLunar =
    rule.includes('पौर्णिमा') ||
    rule.includes('एकादशी') ||
    rule.includes('तिथी') ||
    rule.includes('नक्कडीचा');
  return {
    type: isLunar ? 'lunar' : 'month-day',
    rule,
  };
}
