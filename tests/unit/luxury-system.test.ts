import { describe, it, expect } from 'bun:test';
import {
  LUXURY_SALONS,
  LUXURY_PROJECTS,
  LUXURY_DISCIPLINES,
  LUXURY_ESSAYS,
  MASTER_CRAFTSMEN,
  LUXURY_METRICS,
  LUXURY_IMAGE_CREDITS,
  LUXURY_FAQS,
  LUXURY_NOBLE_MATERIALS,
  CURATORIAL_ARCHETYPES,
  DIURNAL_LIGHT_PRESETS,
} from '@/src/data/luxury-data';

describe('Luxury Maison Data Registry & Architecture', () => {
  it('TC-LUX-001: All global salons exist with valid timezone, contact, and image metadata', () => {
    expect(LUXURY_SALONS.length).toBe(4);
    const cities = LUXURY_SALONS.map((s) => s.city);
    expect(cities).toContain('Paris');
    expect(cities).toContain('Kyoto');
    expect(cities).toContain('New York');
    expect(cities).toContain('London');

    LUXURY_SALONS.forEach((salon) => {
      expect(salon.conciergeEmail).toContain('@');
      expect(salon.timeZone).toBeTruthy();
      expect(salon.heroImage).toStartWith('https://images.unsplash.com/');
      expect(salon.imageAlt.length).toBeGreaterThan(10);
      expect(salon.photographer).toBeTruthy();
    });
  });

  it('TC-LUX-002: All luxury case studies contain verified copyright-safe Unsplash images and palettes', () => {
    expect(LUXURY_PROJECTS.length).toBeGreaterThanOrEqual(6);

    LUXURY_PROJECTS.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.coverImage).toStartWith('https://images.unsplash.com/');
      expect(project.palette.length).toBeGreaterThanOrEqual(3);
      expect(project.brief.length).toBeGreaterThan(20);
      expect(project.scenography.length).toBeGreaterThan(20);
      expect(project.technicalCraft.length).toBeGreaterThan(20);
      expect(project.photographer).toBeTruthy();
    });
  });

  it('TC-LUX-003: Core disciplines are sequentially numbered and contain detailed deliverables', () => {
    expect(LUXURY_DISCIPLINES.length).toBe(4);
    const numbers = LUXURY_DISCIPLINES.map((d) => d.number);
    expect(numbers).toEqual(['01', '02', '03', '04']);

    LUXURY_DISCIPLINES.forEach((discipline) => {
      expect(discipline.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(discipline.materials.length).toBeGreaterThanOrEqual(3);
      expect(discipline.image).toStartWith('https://images.unsplash.com/');
    });
  });

  it('TC-LUX-004: Editorial journal essays have realistic long-form paragraphs and pull quotes', () => {
    expect(LUXURY_ESSAYS.length).toBe(4);

    LUXURY_ESSAYS.forEach((essay) => {
      expect(essay.readTime).toContain('min read');
      expect(essay.content.length).toBeGreaterThanOrEqual(3);
      expect(essay.pullQuote.length).toBeGreaterThan(15);
      expect(essay.author).toBeTruthy();
    });
  });

  it('TC-LUX-005: Master craftsmen registry contains valid biographies and credentials', () => {
    expect(MASTER_CRAFTSMEN.length).toBe(4);

    MASTER_CRAFTSMEN.forEach((craftsman) => {
      expect(craftsman.name).toBeTruthy();
      expect(craftsman.role).toBeTruthy();
      expect(craftsman.heritage).toBeTruthy();
      expect(craftsman.bio.length).toBeGreaterThan(30);
    });
  });

  it('TC-LUX-006: Metrics are populated with valid values and descriptions', () => {
    expect(LUXURY_METRICS.length).toBe(4);
    LUXURY_METRICS.forEach((metric) => {
      expect(metric.value).toBeGreaterThan(0);
      expect(metric.label).toBeTruthy();
      expect(metric.description).toBeTruthy();
    });
  });

  it('TC-LUX-007: Image credit citations fulfill copyright safety obligations', () => {
    expect(LUXURY_IMAGE_CREDITS.length).toBeGreaterThanOrEqual(8);

    LUXURY_IMAGE_CREDITS.forEach((credit) => {
      expect(credit.source).toBe('Unsplash');
      expect(credit.license).toContain('Free Commercial Use');
      expect(credit.photographer).toBeTruthy();
      expect(credit.usage).toBeTruthy();
    });
  });

  it('TC-LUX-008: Curatorial FAQs address governance, timelines, and confidentiality', () => {
    expect(LUXURY_FAQS.length).toBeGreaterThanOrEqual(4);
    LUXURY_FAQS.forEach((faq) => {
      expect(faq.question).toEndWith('?');
      expect(faq.answer.length).toBeGreaterThan(40);
    });
  });

  it('TC-LUX-009: Sensorial noble materials contain calibrated physical and acoustic properties', () => {
    expect(LUXURY_NOBLE_MATERIALS.length).toBe(6);
    LUXURY_NOBLE_MATERIALS.forEach((mat) => {
      expect(mat.mohsHardness).toBeGreaterThan(0);
      expect(mat.acousticFrequency).toBeGreaterThan(100);
      expect(mat.reflectionCoeff).toBeGreaterThanOrEqual(0.1);
      expect(mat.reflectionCoeff).toBeLessThanOrEqual(1.0);
      expect(mat.colorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(mat.architecturalApplications.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('TC-LUX-010: Curatorial diagnostic archetypes map to realistic metiers and palettes', () => {
    const keys = Object.keys(CURATORIAL_ARCHETYPES);
    expect(keys.length).toBe(4);
    keys.forEach((k) => {
      const arch = CURATORIAL_ARCHETYPES[k];
      expect(arch.title).toBeTruthy();
      expect(arch.palette.length).toBeGreaterThanOrEqual(3);
      expect(arch.projectedTimelineWeeks).toBeGreaterThanOrEqual(12);
      expect(arch.materials.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('TC-LUX-011: Diurnal lighting engine defines four calibrated solar elevation stages', () => {
    expect(DIURNAL_LIGHT_PRESETS.length).toBe(4);
    const presetIds = DIURNAL_LIGHT_PRESETS.map((p) => p.id);
    expect(presetIds).toEqual(['aube', 'zenith', 'crepuscule', 'nocturne']);
    DIURNAL_LIGHT_PRESETS.forEach((preset) => {
      expect(preset.name).toBeTruthy();
      expect(preset.frenchTitle).toBeTruthy();
      expect(preset.colorTempK).toEndWith('K');
    });
  });
});
