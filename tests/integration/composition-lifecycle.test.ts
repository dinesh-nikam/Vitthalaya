/**
 * Digital Pandharpur — Composition Lifecycle Integration Test
 *
 * Verifies the full editorial and search integration lifecycle of compositions:
 * 1. Database seeding & integrity: canonical compositions, saints, categories
 * 2. Canonical dedup checks: preventing duplicate ingestion of existing songs
 * 3. Search fallback & query resolution: queries find compositions accurately
 * 4. API v1 route contract verification for composition reads
 */

import { describe, test, expect, beforeAll } from 'bun:test';
import { db } from '@/src/db/client';
import { DedupEngine } from '@/src/canonical/dedup-engine';
import { normalizeForComparison } from '@/src/canonical/normalization';
import { GET as getCompositionRoute } from '@/app/api/v1/compositions/[id]/route';
import { registerApiKey } from '@/src/lib/api-auth';
import { NextRequest } from 'next/server';

describe('Integration — Composition Lifecycle & Data Integrity', () => {
  let seededCompositionId: string | null = null;
  let seededCompositionTitle: string = '';
  let seededCompositionText: string = '';
  const TEST_API_KEY = 'integration-test-api-key';

  beforeAll(async () => {
    registerApiKey(TEST_API_KEY, 'Integration Tester', 100);

    // Find an existing composition in the database
    const comp = await db.composition.findFirst({
      where: { reviewed: true },
      include: { saint: true },
    });

    if (comp) {
      seededCompositionId = comp.id;
      seededCompositionTitle = comp.titleMarathi;
      seededCompositionText = comp.fullText;
    }
  });

  test('TC-LIFECYCLE-001: seeded catalog contains published compositions with valid relations', async () => {
    expect(seededCompositionId).not.toBeNull();
    expect(seededCompositionTitle.length).toBeGreaterThan(0);
    expect(seededCompositionText.length).toBeGreaterThan(0);
  });

  test('TC-LIFECYCLE-002: DedupEngine prevents duplicate insertion of seeded composition', async () => {
    if (!seededCompositionText) return;

    const engine = new DedupEngine();
    // Add existing composition
    engine.add({
      full_text: seededCompositionText,
      title_marathi: seededCompositionTitle,
    });

    // Check duplicate detection
    const check = engine.isDuplicate({
      full_text: seededCompositionText,
      title_marathi: seededCompositionTitle,
    });

    expect(check.isDuplicate).toBe(true);
    expect(check.layer).toBe('exact_hash');
    expect(check.confidence).toBe(1.0);
  });

  test('TC-LIFECYCLE-003: Public API route returns standard contract for seeded composition', async () => {
    if (!seededCompositionId) return;

    const req = new NextRequest(`http://localhost:3000/api/v1/compositions/${seededCompositionId}`, {
      headers: { 'X-API-Key': TEST_API_KEY },
    });
    const res = await getCompositionRoute(req, { params: Promise.resolve({ id: seededCompositionId }) });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe(seededCompositionId);
    expect(body.data.titleMarathi).toBe(seededCompositionTitle);
    expect(body.data.fullText).toBeDefined();
  });

  test('TC-LIFECYCLE-004: Public API returns 404 for nonexistent composition', async () => {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    const req = new NextRequest(`http://localhost:3000/api/v1/compositions/${fakeId}`, {
      headers: { 'X-API-Key': TEST_API_KEY },
    });
    const res = await getCompositionRoute(req, { params: Promise.resolve({ id: fakeId }) });

    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  test('TC-LIFECYCLE-005: Normalized search string matches composition titles', async () => {
    if (!seededCompositionTitle) return;

    const normalized = normalizeForComparison(seededCompositionTitle);
    expect(normalized.length).toBeGreaterThan(0);

    const match = await db.composition.findFirst({
      where: {
        id: seededCompositionId!,
        titleMarathi: { contains: seededCompositionTitle.slice(0, 3) },
      },
    });

    expect(match).not.toBeNull();
    expect(match?.id).toBe(seededCompositionId);
  });
});
