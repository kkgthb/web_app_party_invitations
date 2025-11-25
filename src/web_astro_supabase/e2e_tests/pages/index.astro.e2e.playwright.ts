import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("has the correct title", async ({ page }) => {
    await test.step("Page title should be correct", async () => {
      await expect(page).toHaveTitle("Home | Event Party Inviter");
    });
  });

  test("displays the welcome message", async ({ page }) => {
    await test.step("Should display the welcome message", async () => {
      const welcomeMessage = page.locator("div:has-text('Hello world!')");
      await expect(welcomeMessage).toBeVisible();
    });
  });
});
