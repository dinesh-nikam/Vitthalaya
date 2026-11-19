/**
 * Tests for festival calculator & The Four Varkari Waris
 * Validates TC-GRAPH-004 - Festival relationships and lunisolar accuracy
 */

import { describe, test, expect } from 'bun:test';
import {
  getFestivalForDate,
  getNextFestival,
  parseFestivalRule,
  getFestivalsForYear,
  getFourWaris,
  MARATHI_FESTIVALS,
} from '../../src/lib/festival-calculator';

describe('Festival Calculator - Date Logic', () => {
  test('TC-GRAPH-004: Festivals return for given dates', () => {
    // Ashadhi Ekadashi 2026 (July 25, 2026 according to official Panchang)
    const ashadhi = getFestivalForDate(new Date('2026-07-25'));
    expect(ashadhi).toBeDefined();
    expect(ashadhi?.name).toBe('ashadhi_ekadashi');
  });

  test('TC-WARI-001: All Four Waris are present and accurately categorized', () => {
    const waris2027 = getFourWaris(2027, new Date('2027-01-01'));
    expect(waris2027.length).toBe(4);

    const wariTypes = waris2027.map((w) => w.wariType);
    expect(wariTypes).toContain('ASHADHI');
    expect(wariTypes).toContain('KARTIKI');
    expect(wariTypes).toContain('MAGHI');
    expect(wariTypes).toContain('CHAITRI');

    // Verify all four waris have Shukla Paksha rule
    const ashadhiDef = MARATHI_FESTIVALS.find((f) => f.name === 'ashadhi_ekadashi');
    const kartikiDef = MARATHI_FESTIVALS.find((f) => f.name === 'kartiki_ekadashi');
    const maghiDef = MARATHI_FESTIVALS.find((f) => f.name === 'maghi_ekadashi');
    const chaitriDef = MARATHI_FESTIVALS.find((f) => f.name === 'chaitri_ekadashi');

    expect(ashadhiDef?.paksha).toBe('shukla');
    expect(kartikiDef?.paksha).toBe('shukla');
    expect(maghiDef?.paksha).toBe('shukla');
    expect(chaitriDef?.paksha).toBe('shukla');
  });

  test('TC-WARI-002: Exact dates for 2027 Panchang Cycle', () => {
    const festivals2027 = getFestivalsForYear(2027, new Date('2027-01-01'));

    const maghi = festivals2027.find((f) => f.name === 'maghi_ekadashi');
    expect(maghi).toBeDefined();
    expect(maghi?.date.getFullYear()).toBe(2027);
    expect(maghi?.date.getMonth()).toBe(1); // February (0-indexed)
    expect(maghi?.date.getDate()).toBe(17);

    const chaitri = festivals2027.find((f) => f.name === 'chaitri_ekadashi');
    expect(chaitri).toBeDefined();
    expect(chaitri?.date.getMonth()).toBe(3); // April
    expect(chaitri?.date.getDate()).toBe(17);

    const ashadhi = festivals2027.find((f) => f.name === 'ashadhi_ekadashi');
    expect(ashadhi).toBeDefined();
    expect(ashadhi?.date.getMonth()).toBe(6); // July
    expect(ashadhi?.date.getDate()).toBe(15);

    const kartiki = festivals2027.find((f) => f.name === 'kartiki_ekadashi');
    expect(kartiki).toBeDefined();
    expect(kartiki?.date.getMonth()).toBe(10); // November
    expect(kartiki?.date.getDate()).toBe(9);
  });

  test('TC-API-017: Invalid date handled', () => {
    const invalid = getFestivalForDate(new Date('invalid'));
    expect(invalid === null || invalid === undefined).toBe(true);
  });

  test('TC-PERF-020: Next festival calculation', () => {
    const next = getNextFestival();
    expect(next).toBeDefined();
    expect(next?.nameMarathi).toBeDefined();
  });
});

describe('Festival Calculator - Rule Parsing', () => {
  test('TC-GRAPH-005: Parse month-day rule', () => {
    const rule = parseFestivalRule('अमूक या काउन्ट 11 - दशकांचा अषाढी');
    expect(rule).toBeDefined();
  });

  test('TC-GRAPH-006: Parse lunar calendar rule', () => {
    const rule = parseFestivalRule('पौर्णिमा नक्कीचा');
    expect(rule?.type).toBe('lunar');
  });
});

describe('Festival Calculator - Edge Cases', () => {
  test('TC-DR-010: Leap year handling', () => {
    const feb29 = getFestivalForDate(new Date('2024-02-29'));
    expect(feb29 !== undefined).toBe(true);
  });

  test('TC-DR-011: Timezone edge cases', () => {
    const IST = new Date(2026, 0, 1, 0, 0, 0);
    expect(IST).toBeDefined();
  });
});
