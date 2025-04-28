const {
  "liveServer.settings.port": liveServerPort,
} = require("../.vscode/settings.json");

const { test, expect } = require("@playwright/test");
const {
  getValidationErrorMessage,
  shouldRunTests,
} = require("./html-validate-helper.js");

test.beforeAll(async () => {
  const validationPassed = shouldRunTests();
  if (!validationPassed) {
    test.skip(true, getValidationErrorMessage());
  }
});
test.beforeEach(async ({ page }) => {
  await page.goto(`localhost:${liveServerPort}`);
});

test("has the link tag set in the head", async ({ page }) => {
  const link = page.locator("head").locator("link");
  await expect(link).toBeAttached();
});

test("has the link rel attribute value to equal 'stylesheet'", async ({
  page,
}) => {
  const relValue = page.locator("head").locator("link").getAttribute("rel");
  expect(await relValue).toBe("stylesheet");
});

test("The link tag href attribute value should be a valid path to the css file", async ({
  page,
}) => {
  const paths = ["./css/styles.css", "/css/styles.css", "css/styles.css"];
  const hrefValue = await page
    .locator("head")
    .locator("link")
    .getAttribute("src");

  hrefValue && expect(paths.includes(hrefValue)).toBe(true);
});

test("The script tag src attribute value should be a valid path to the js file", async ({
  page,
}) => {
  const paths = ["./js/scripts.js", "/js/scripts.js", "js/scripts.js"];
  const headSrcValue = await page
    .locator("head")
    .locator("script")
    .getAttribute("src");

  headSrcValue && expect(paths.includes(headSrcValue)).toBe(true);
});

test("The script tag includes the defer attribute", async ({ page }) => {
  const deferValue = await page
    .locator("head")
    .locator("script")
    .getAttribute("defer");
  expect(deferValue).toBe("");
});

test("The page heading should have an id of `candidate-name`", async ({
  page,
}) => {
  const headingLocatorID = page.locator("h1");
  await expect(headingLocatorID).toBeAttached("candidate-name");
});

test("The section heading with an ID of `candidate-desired-role` should exist", async ({
  page,
}) => {
  const headingId = "candidate-desired-role";
  const allHeadings = [];
  for (const heading of await page.locator("h2").all()) {
    allHeadings.push(await heading.getAttribute("id"));
  }
  await expect(allHeadings.includes(headingId)).toBe(true);
});

test("The section heading with an ID of `about-me` should exist", async ({
  page,
}) => {
  const headingId = "about-me";
  const allHeadings = [];
  for (const heading of await page.locator("h2").all()) {
    allHeadings.push(await heading.getAttribute("id"));
  }
  await expect(allHeadings.includes(headingId)).toBe(true);
});

test("The person image HTML element should have should have an id of `candidate-image`", async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("img").getAttribute("id");
  expect(imageLocatorIdValue).toBe("candidate-image");
});

test("The bio paragraph HTML element should have should have be of `candidate-bio` class", async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("p").getAttribute("class");
  expect(imageLocatorIdValue).toBe("candidate-bio");
});

test("The section heading with an ID of `skills` should exist", async ({
  page,
}) => {
  const headingId = "skills";
  const allHeadings = [];
  for (const heading of await page.locator("h2").all()) {
    allHeadings.push(await heading.getAttribute("id"));
  }
  expect(allHeadings.includes(headingId)).toBe(true);
});

test("The skills ordered list HTML element should have should have have an id of `skills-list`", async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("ol").getAttribute("id");
  expect(imageLocatorIdValue).toBe("skills-list");
});

test("The section heading with an ID of `hobbies` should exist", async ({
  page,
}) => {
  const headingId = "hobbies";
  const allHeadings = [];
  for (const heading of await page.locator("h2").all()) {
    allHeadings.push(await heading.getAttribute("id"));
  }
  expect(allHeadings.includes(headingId)).toBe(true);
});

test("The hobbies unordered list HTML element should have should have an id of `hobbies-list`", async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("ul").getAttribute("id");
  expect(imageLocatorIdValue).toBe("hobbies-list");
});

test("The section heading with an ID of `contacts` should exist", async ({
  page,
}) => {
  const headingId = "contacts";
  const allHeadings = [];
  for (const heading of await page.locator("h2").all()) {
    allHeadings.push(await heading.getAttribute("id"));
  }
  expect(allHeadings.includes(headingId)).toBe(true);
});

test("The contacts table HTML element should have should be of `contacts-table` class", async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("table").getAttribute("class");
  expect(imageLocatorIdValue).toBe("contacts-table");
});

test('The document body should have "fancy-body" on the list of assigned classes', async ({
  page,
}) => {
  const imageLocatorIdValue = await page.locator("body").getAttribute("class");
  expect(imageLocatorIdValue).toBe("fancy-body");
});
