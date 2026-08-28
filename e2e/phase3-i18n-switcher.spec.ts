import { test, expect } from "@playwright/test";

test.describe("Phase 3 — Language switcher & copy.en completeness", () => {
  test("homepage has language dropdown trigger in nav", async ({ page }) => {
    await page.goto("/");
    // Trigger button shows the current locale code (EN on the root page)
    const trigger = page.locator("header button").filter({ hasText: "EN" }).first();
    await expect(trigger).toBeVisible();
  });

  test("language switcher EN trigger is active on homepage", async ({ page }) => {
    await page.goto("/");
    // The trigger button shows EN (current locale on root)
    const trigger = page.locator("header button").filter({ hasText: "EN" }).first();
    await expect(trigger).toBeVisible();
  });

  test("language switcher opens dropdown with Français option pointing to /fr/", async ({ page }) => {
    await page.goto("/");
    // Open the language dropdown
    const trigger = page.locator("header button").filter({ hasText: "EN" }).first();
    await trigger.click();
    // Panel should contain a Français option
    const frOption = page.locator('[role="listbox"] button').filter({ hasText: "Français" }).first();
    await expect(frOption).toBeVisible();
    // Click it and verify navigation to /fr/
    await frOption.click();
    await page.waitForURL("**/fr/**");
    expect(page.url()).toContain("/fr/");
  });

  test("homepage loads without JS errors (phase 3)", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.waitForTimeout(1500);
    expect(errors.filter((e) => !e.includes("Warning"))).toHaveLength(0);
  });
});
