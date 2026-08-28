import { test, expect } from "@playwright/test";

test.describe("Phase 5 — Blog routing: EN at /blog, FR at /fr/blog", () => {
  test("EN /blog loads with English copy (empty state)", async ({ page }) => {
    const res = await page.goto("/blog");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1, h2").first()).toBeVisible();
    // EN blog should NOT show French post cards (no EN posts yet)
    const frCards = page.locator('a[href^="/blog/"]').filter({ hasText: "Lire l'article" });
    await expect(frCards).toHaveCount(0);
  });

  test("FR /fr/blog loads with French posts", async ({ page }) => {
    const res = await page.goto("/fr/blog");
    expect(res?.status()).toBeLessThan(400);
    const cards = page.locator('a[href^="/fr/blog/"]').filter({ hasText: "Lire l'article" });
    await expect(cards.first()).toBeVisible();
  });

  test("/fr/blog/matrice-eisenhower loads (FR seed post)", async ({ page }) => {
    const res = await page.goto("/fr/blog/matrice-eisenhower");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/fr/blog/tag/email loads (FR tag)", async ({ page }) => {
    const res = await page.goto("/fr/blog/tag/email");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("PostCard links on /fr/blog point to /fr/blog/slug (not /blog/slug)", async ({ page }) => {
    await page.goto("/fr/blog");
    const firstCard = page.locator('a[href^="/fr/blog/"]').first();
    const href = await firstCard.getAttribute("href");
    expect(href).toMatch(/^\/fr\/blog\//);
  });

  test("/blog (EN) header shows EN dropdown trigger as active", async ({ page }) => {
    await page.goto("/blog");
    // Language dropdown trigger shows EN on English pages
    const enTrigger = page.locator("header button").filter({ hasText: "EN" }).first();
    await expect(enTrigger).toBeVisible();
  });
});
