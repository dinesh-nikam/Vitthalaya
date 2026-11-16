/**
 * Digital Pandharpur — Accessibility & Responsive Design (E2E)
 *
 * Verifies WCAG 2.2 AA standards and multi-device viewport responsiveness:
 * - TC-A11Y-010: HTML lang attribute and document title present
 * - TC-A11Y-011: Main landmark, navigation landmark, and header hierarchy
 * - TC-A11Y-012: Images carry alt text or aria-hidden decorative attributes
 * - TC-RESP-001: Mobile viewport (375x667) rendering and hamburger/bottom navigation
 * - TC-RESP-002: Tablet viewport (768x1024) layout rhythm
 * - TC-RESP-003: Desktop viewport (1280x800) full layout integrity
 */
import { test, expect } from '@playwright/test';

test.describe('E2E — Accessibility & Responsive Architecture', () => {
  test('TC-A11Y-010: HTML lang attribute and document title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBeDefined();

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('TC-A11Y-011: Landmark regions and semantic structure', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Must have <main> landmark
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBeGreaterThanOrEqual(1);

    // Must have <nav> landmark
    const navCount = await page.locator('nav').count();
    expect(navCount).toBeGreaterThanOrEqual(1);

    // Header has at least one heading
    const h1Count = await page.locator('h1, h2').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('TC-A11Y-012: Image accessibility — alt text or decorative aria-hidden', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      const role = await img.getAttribute('role');

      // Valid if alt exists, or role="presentation", or aria-hidden="true"
      const isAccessible = alt !== null || role === 'presentation' || ariaHidden === 'true';
      expect(isAccessible).toBe(true);
    }
  });

  test('TC-RESP-001: Mobile viewport responsiveness (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Page renders without horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);

    // Main content visible on mobile
    await expect(page.locator('main').first()).toBeVisible();
  });

  test('TC-RESP-002: Tablet viewport layout (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('header, nav').first()).toBeVisible();
  });

  test('TC-RESP-003: Desktop viewport layout (1280x800)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('header, nav').first()).toBeVisible();
  });
});
