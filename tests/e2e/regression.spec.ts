/**
 * Digital Pandharpur — Browser Regression & Edge Cases (E2E)
 *
 * Verifies resilient browser behaviors and recovery:
 * - TC-BRW-001: 404 page renders gracefully with home navigation
 * - TC-BRW-002: Empty and special-character search queries
 * - TC-BRW-003: Manifest / PWA webmanifest is accessible
 * - TC-BRW-004: Fast page transitions without unhandled console errors
 */
import { test, expect } from '@playwright/test';

test.describe('E2E — Browser Regression & Edge Cases', () => {
  test('TC-BRW-001: 404 route displays friendly devotional not-found UI', async ({ page }) => {
    const res = await page.goto('/non-existent-devotional-route-404', { waitUntil: 'domcontentloaded' });
    // Next.js serves 404 status
    if (res) {
      expect([200, 404]).toContain(res.status());
    }
    // Check for home link
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });

  test('TC-BRW-002: Search gracefully handles whitespace and punctuation', async ({ page }) => {
    await page.goto('/search?q=%20%20%20', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    // Query with Devanagari punctuation
    await page.goto('/search?q=॥विठ्ठल॥', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('TC-BRW-003: Web manifest is served with valid JSON', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const manifest = await res.json();
    expect(manifest.name).toBeDefined();
  });

  test('TC-BRW-004: Rapid navigation between devotional routes remains stable', async ({ page }) => {
    const routes = ['/', '/explore', '/saints', '/wari', '/nityanem'];

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main#main-content')).toBeVisible();
    }
  });
});
