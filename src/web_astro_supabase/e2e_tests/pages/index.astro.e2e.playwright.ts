import { test, expect } from "@playwright/test";

const sharedTests = () => {

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

}

test.describe("Home Page without server-side proof", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  sharedTests();

});

test.describe("Home Page with server-side proof", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/?showPublicEnvHello=true');
  });

  sharedTests();

  test("shows server-side environment variable", async ({ page }) => {
    // Check that the server label is visible
    const serverLabel = page.locator('#server-label');
    await expect(serverLabel, 'Server label should be visible').toBeVisible();
    await expect(serverLabel, 'Server label text is incorrect').toHaveText('Non-static-mode-only content:');

    // Check that the server value is visible and not empty
    const serverValue = page.locator('#server-value');
    await expect(serverValue, 'Server value should be visible').toBeVisible();
    const valueText = await serverValue.textContent();
    expect(valueText, 'Server value should not be empty').toBeTruthy();
    expect(valueText, 'Server value should not show fallback message').not.toBe('No environment variable found. Did you create a .env file?');
  });

});