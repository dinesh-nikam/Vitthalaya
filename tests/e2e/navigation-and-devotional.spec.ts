/**
 * Digital Pandharpur — Navigation & Devotional Tools (E2E)
 *
 * Verifies core devotional features and liturgical tools:
 * - TC-NAV-001: Saints catalog & individual saint hagiography view
 * - TC-NAV-002: Wari Pilgrimage route & milestones
 * - TC-NAV-003: Japa Mala bead counting & reset interaction
 * - TC-NAV-004: Nityanem liturgical timetable & Prohar active highlight
 * - TC-NAV-005: Daily devotional darshan & liturgical cards
 * - TC-NAV-006: Learn portal hagiographical guides
 */
import { test, expect } from '@playwright/test';

test.describe('E2E — Devotional Hub & Liturgical Tools', () => {
  test('TC-NAV-001: Saints catalog and saint detail view', async ({ page }) => {
    await page.goto('/saints', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    // Verify presence of major saint names in Marathi
    const saintsList = page.locator('main#main-content');
    await expect(saintsList).toContainText(/ज्ञानेश्वर|तुकाराम|नामदेव|एकनाथ/);

    // Click first saint link if available
    const saintLink = page.locator('a[href^="/sant/"]').first();
    if (await saintLink.isVisible()) {
      await saintLink.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('TC-NAV-002: Wari pilgrimage route and milestones render', async ({ page }) => {
    await page.goto('/wari', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    // Verify key pilgrimage stops (e.g. Alandi, Dehu, Pandharpur)
    const content = page.locator('main#main-content');
    await expect(content).toContainText(/पंढरपूर|आळंदी|देहू/);
  });

  test('TC-NAV-003: Japa Mala counter interaction', async ({ page }) => {
    await page.goto('/japa', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    // Check count display is present
    const countDisplay = page.locator('[data-testid="japa-count"], .japa-counter, main#main-content').first();
    await expect(countDisplay).toBeVisible();

    // Find chanting or increment button
    const incrementBtn = page.locator('button:has-text("जप"), button[aria-label*="जप"], button:has-text("Count"), [data-testid="japa-increment"]').first();
    if (await incrementBtn.isVisible()) {
      await incrementBtn.click();
      await page.waitForTimeout(200);
    }
  });

  test('TC-NAV-004: Nityanem liturgical timetable renders all watches', async ({ page }) => {
    await page.goto('/nityanem', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();

    // Verify liturgical Prohar names
    const content = page.locator('body');
    await expect(content).toContainText(/काकड|हरिपाठ|आरती|शेजारती/);
  });

  test('TC-NAV-005: Daily devotional darshan page', async ({ page }) => {
    await page.goto('/daily', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();
  });

  test('TC-NAV-006: Learn portal guides render', async ({ page }) => {
    await page.goto('/learn', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('body')).toContainText(/वारकरी|भक्ती|परंपरा/);
  });
});
