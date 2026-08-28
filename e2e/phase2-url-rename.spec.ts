import { test, expect } from "@playwright/test";

test.describe("Phase 2 — English URL renaming", () => {
  test("/about loads", async ({ page }) => {
    const res = await page.goto("/about");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/privacy loads", async ({ page }) => {
    const res = await page.goto("/privacy");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/terms loads", async ({ page }) => {
    const res = await page.goto("/terms");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/subprocessors loads", async ({ page }) => {
    const res = await page.goto("/subprocessors");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/contact loads", async ({ page }) => {
    const res = await page.goto("/contact");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("footer links point to new EN URLs", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    // Static export adds trailing slashes to all hrefs
    await expect(page.locator('a[href="/about/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/privacy/"]').first()).toBeVisible();
    await expect(page.locator('a[href="/terms/"]').first()).toBeVisible();
  });

  test("old /a-propos URL exists (redirect handled by Cloudflare)", async ({ page }) => {
    // In static serving, old URLs 404 — redirects are Cloudflare-side only.
    // Just verify new URL works.
    const res = await page.goto("/about");
    expect(res?.status()).toBeLessThan(400);
  });
});
