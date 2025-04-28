// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const {
  "liveServer.settings.port": liveServerPort,
} = require("./.vscode/settings.json");
const mainPageUrl = `http://localhost:${liveServerPort}/`;

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,

  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: mainPageUrl,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "html-structure",
      testMatch: /html-validate\.spec\.js/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "part1-tests",
      testMatch: /tests-p1\.spec\.js/,
      dependencies: ["html-structure"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "part2-tests",
      testMatch: /tests-p2\.spec\.js/,
      dependencies: ["html-structure"],
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
