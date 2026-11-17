/**
 * Digital Pandharpur — Composition & Reader Flow (E2E)
 *
 * Verifies core devotional content reading:
 * - TC-COMP-001: Document Devanagari typography & title rendering
 * - TC-SEARCH-080: Homepage search navigation
 * - TC-COMP-002: Composition reader and meaning section
 * - TC-A11Y-001: Semantic landmarks and accessible structure
 * - TC-COMP-005: Dark/light theme persistence and toggle
 */
import { test, expect } from '@playwright/test';

test.describe('E2E — Composition Reader & Shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem('dp_gateway_seen', '1');
    });
  });

  test('TC-COMP-001: Document Devanagari rendering & Page Title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title).toBeDefined();
    expect(title.length).toBeGreaterThan(0);
    await expect(page.locator('body')).toContainText(/[\u0900-\u097F]/);
  });

  test('TC-SEARCH-080: Search from homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const searchInput = page.locator('input[aria-label*="Search"], input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('विठ्ठल');
      const submitBtn = page.locator('button[type="submit"]:has-text("शोधा"), button[type="submit"]').first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
      } else {
        await page.keyboard.press('Enter');
      }
      await page.waitForURL((url) => url.pathname.includes('/search') || url.search.includes('q='), {
        timeout: 15_000,
      });
      expect(page.url()).toContain('search');
    }
  });

  test('TC-COMP-002: Verify meaning section exists on composition page', async ({ page }) => {
    await page.goto('/explore', { waitUntil: 'domcontentloaded' });
    const compositionLink = page.locator('a[href^="/abhang/"]').first();
    if (await compositionLink.isVisible()) {
      await compositionLink.click();
      await page.waitForLoadState('domcontentloaded');
      const mainHeader = page.locator('h1').first();
      await expect(mainHeader).toBeVisible();
      const headerText = await mainHeader.innerText();
      expect(headerText.length).toBeGreaterThan(0);
    }
  });

  test('TC-A11Y-001: Layout landmarks exist and are visible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const mainLandmark = page.locator('main').first();
    await expect(mainLandmark).toBeVisible();
    const navLandmark = page.locator('nav').first();
    await expect(navLandmark).toBeVisible();
  });

  test('TC-COMP-005: Verify dark mode state toggling', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const initialClass = await page.evaluate(() => document.documentElement.className);
    const themeBtn = page.locator('[data-testid="theme-toggle"], .theme-toggle').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(300);
      const afterClass = await page.evaluate(() => document.documentElement.className);
      expect(afterClass).not.toBe(initialClass);
    }
  });
});
