import { test, expect } from "@playwright/test";

test.describe("Phase 1 — FR blog locale (now at /fr/blog)", () => {
  test("FR blog index loads and lists posts at /fr/blog", async ({ page }) => {
    await page.goto("/fr/blog");
    await expect(page).not.toHaveURL(/error/);
    await expect(page.locator("h1, h2").first()).toBeVisible();
    // Post cards render as <a href="/fr/blog/slug"> links
    const cards = page.locator('a[href^="/fr/blog/"]').filter({ hasText: "Lire l'article" });
    await expect(cards.first()).toBeVisible();
  });

  test("a FR blog post loads without errors at /fr/blog/slug", async ({ page }) => {
    const res = await page.goto("/fr/blog/matrice-eisenhower");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("a second FR post loads at /fr/blog/slug", async ({ page }) => {
    const res = await page.goto("/fr/blog/deep-work");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("FR tag page loads at /fr/blog/tag/email", async ({ page }) => {
    await page.goto("/fr/blog/tag/email");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("homepage loads without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.waitForTimeout(1500);
    expect(errors.filter((e) => !e.includes("Warning"))).toHaveLength(0);
  });
});
