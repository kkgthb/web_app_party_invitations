import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e_tests",
  testMatch: "**/*playwright.{ts,js,mts,mjs,cts,cjs}",
  outputDir: "./e2e_test_results/test-results",
  fullyParallel: true,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "./e2e_test_results/html" }],
    ["json", { outputFile: "./e2e_test_results/json-results.json" }],
    ["junit", { outputFile: "./e2e_test_results/junit-results.xml" }],
    [
      "playwright-ctrf-json-reporter",
      {
        outputDir: "./e2e_test_results",
        outputFile: "ctrf-report.json",
      },
    ],
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 13"],
      },
    },
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:4321',
    trace: "on",
    video: "on",
    screenshot: "on",
  },
});
