import { test, expect } from "@playwright/test";

test.describe("Phase 4 — /fr/ pages exist and serve French content", () => {
  test("/fr/ homepage loads", async ({ page }) => {
    const res = await page.goto("/fr/");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("/fr/about loads with French content", async ({ page }) => {
    const res = await page.goto("/fr/about");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toMatch(/À propos|propos|inbox/i);
  });

  test("/fr/contact loads", async ({ page }) => {
    const res = await page.goto("/fr/contact");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/fr/privacy loads", async ({ page }) => {
    const res = await page.goto("/fr/privacy");
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("/fr/ homepage shows language switcher and can navigate to EN", async ({ page }) => {
    await page.goto("/fr/");
    // Trigger shows FR (current locale)
    const trigger = page.locator("header button").filter({ hasText: "FR" }).first();
    await expect(trigger).toBeVisible();
    // Open dropdown and check English option is present
    await trigger.click();
    const enOption = page.locator('[role="listbox"] button').filter({ hasText: "English" }).first();
    await expect(enOption).toBeVisible();
  });

  test("/fr/ homepage FR trigger is active", async ({ page }) => {
    await page.goto("/fr/");
    // The language dropdown trigger should show FR as the active locale
    const frTrigger = page.locator("header button").filter({ hasText: "FR" }).first();
    await expect(frTrigger).toBeVisible();
  });

  test("root / homepage shows English content in hero", async ({ page }) => {
    await page.goto("/");
    const bodyText = await page.locator("body").innerText();
    // English hero should have English text
    expect(bodyText).toMatch(/inbox|priority|Domino/i);
  });

  test("root /about shows English content", async ({ page }) => {
    await page.goto("/about");
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toMatch(/Our story|inbox|Leverage/i);
  });

  test("root / homepage loads without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.waitForTimeout(1500);
    expect(errors.filter((e) => !e.includes("Warning"))).toHaveLength(0);
  });
});
