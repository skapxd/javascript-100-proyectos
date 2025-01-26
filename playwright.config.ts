import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const fullScreamOptions = (() => {
  if (process.env.CI) return {};

  return {
    deviceScaleFactor: undefined,
    viewport: null,
    launchOptions: {
      args: [
        // argumento para ver en pantalla completa
        "--start-maximized",
      ],
    },
  };
})();

const snapshotPathTemplate = (() => {
  const folder = process.env.CI ? "ci" : "dev";

  return `{testDir}/{testFileDir}/{testFileName}-snapshots/${folder}/{arg}-{projectName}{ext}`;
})();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  expect: {
    // Configuración global para toHaveScreenshot()
    toHaveScreenshot: {
      // Tolerancia máxima de diferencia (en píxeles)
      maxDiffPixels: 50, // Aumenta según necesidad

      // Porcentaje de diferencia permitido (0.01 = 1%)
      maxDiffPixelRatio: 0.01,

      // Umbral de diferencia por píxel (0-1)
      // threshold: 0.2,

      // Animaciones/transiciones a esperar
      // animations: 'disabled',
      // transitions: 'disabled'
    }
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  snapshotPathTemplate,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:8080",
    video: "on",
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], ...fullScreamOptions },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "yarn dev",
    url: "http://localhost:8080",
    // reuseExistingServer: !process.env.CI,
  },
});
