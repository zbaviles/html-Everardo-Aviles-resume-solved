const {
  "liveServer.settings.port": liveServerPort,
} = require("../.vscode/settings.json");

// @ts-check
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
const mainPageUrl = `http://localhost:${liveServerPort}/`;
const cleanArrFromEmptyItems = (arr) => arr.filter((item) => item !== "");

test.beforeEach(async ({ page }) => {
  await page.goto(mainPageUrl);
});

test("The project development server is running", async ({ page }) => {
  expect(page.url()).toBe(mainPageUrl);
});

test("The document title should include 'resume'", async ({ page }) => {
  await expect(page).toHaveTitle(/resume/i);
});

test("The page has a single page heading HTML Element (<h1></h1>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("h1");
  await expect(locator).toHaveCount(1);
});

test("The page has 5 section heading HTML Elements (<h2></h2>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("h2");
  await expect(locator).toHaveCount(5);
});

test("The page has a section heading `Talented Frontend developer`", async ({
  page,
}) => {
  const locator = page
    .locator("h2")
    .filter({ hasText: "Talented Frontend developer" });
  await expect(locator).toBeAttached();
});

test("The page has an image HTML Element (<img>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("img");
  await expect(locator).toBeAttached();
});

test("There is a single image HTML Element (<img>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("img");
  await expect(locator).toHaveCount(1);
});

test("The image has the src attribute set and the attribute has a value", async ({
  page,
}) => {
  const sourceValueLength = await page
    .locator("img")
    .getAttribute("src")
    .then((data) => data?.length);
  await expect(sourceValueLength).toBeGreaterThan(0);
});

test("the image has the alt attribute set and the attribute has a value", async ({
  page,
}) => {
  const sourceValueLength = await page
    .locator("img")
    .getAttribute("alt")
    .then((data) => data?.length);
  await expect(sourceValueLength).toBeGreaterThan(0);
});

test("The page has a section heading `About Me`", async ({ page }) => {
  const locator = page.locator("h2").filter({ hasText: "About Me" });
  await expect(locator).toBeAttached();
});

test("The page has a paragraph HTML Element (<p></p>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("p");
  await expect(locator).toBeAttached();
});

test("The page has a single paragraph HTML Element (<p></p>) set on the page", async ({
  page,
}) => {
  const locator = page.locator("p");
  await expect(locator).toHaveCount(1);
});

test("the paragraph of text has at least 50 words", async ({ page }) => {
  const paragraphTextLength = page.locator("p").textContent();

  expect(
    await paragraphTextLength.then((content) => {
      return cleanArrFromEmptyItems(content?.trim().split(" ")).length;
    })
  ).toBeGreaterThanOrEqual(50);
});

test("The page has a section heading `My Skills`", async ({ page }) => {
  const locator = page.locator("h2").filter({ hasText: "My Skills" });
  await expect(locator).toBeAttached();
});

test("The page has the ordered list set on the page", async ({ page }) => {
  const orderedList = page.locator("ol");
  await expect(orderedList).toBeAttached();
});

test("has a single ordered list set on the page", async ({ page }) => {
  const orderedList = page.locator("ol");
  await expect(orderedList).toHaveCount(1);
});

test("the ordered list contains 6 list item elements", async ({ page }) => {
  const orderedListItems = page.locator("ol").locator("li");
  await expect(orderedListItems).toHaveCount(6);
});

test("The page has a section heading `My Hobbies`", async ({ page }) => {
  const locator = page.locator("h2").filter({ hasText: "My Hobbies" });
  await expect(locator).toBeAttached();
});

test("has the unordered list set on the page", async ({ page }) => {
  const orderedList = page.locator("ul");
  await expect(orderedList).toBeAttached();
});

test("has a single unordered list set on the page", async ({ page }) => {
  const orderedList = page.locator("ul");
  await expect(orderedList).toHaveCount(1);
});

test("the unordered list contains 4 list item elements", async ({ page }) => {
  const orderedListItems = page.locator("ul").locator("li");
  await expect(orderedListItems).toHaveCount(4);
});

test("The page has a section heading `Contact Me`", async ({ page }) => {
  const locator = page.locator("h2").filter({ hasText: "Contact me" });
  await expect(locator).toBeAttached();
});

test("has a table HTML Element set on the page", async ({ page }) => {
  const tableElement = page.locator("table");
  await expect(tableElement).toHaveCount(1);
});

test("the table has 4 rows", async ({ page }) => {
  const tableRows = page.locator("table").locator("tr");
  await expect(tableRows).toHaveCount(4);
});

test("the table has 4 table header cells", async ({ page }) => {
  const tableColumns = page.locator("table").locator("th");
  await expect(tableColumns).toHaveCount(4);
});

test("the table has 4 table data cells", async ({ page }) => {
  const tableColumns = page.locator("table").locator("td");
  await expect(tableColumns).toHaveCount(4);
});

test("The table has a table header cell for Discord", async ({ page }) => {
  const locator = page.locator("th").filter({ hasText: "Discord" });
  await expect(locator).toBeAttached();
});

test("The table has a table header cell for Email", async ({ page }) => {
  const locator = page.locator("th").filter({ hasText: "Email" });
  await expect(locator).toBeAttached();
});

test("The table has a table header cell for Github", async ({ page }) => {
  const locator = page.locator("th").filter({ hasText: "Github" });
  await expect(locator).toBeAttached();
});

test("The table has a table header cell for LinkedIn", async ({ page }) => {
  const locator = page.locator("th").filter({ hasText: "LinkedIn" });
  await expect(locator).toBeAttached();
});

test("the table has 3 anchor elements", async ({ page }) => {
  const links = page.locator("table").locator("a");
  await expect(links).toHaveCount(3);
});

test("the table has 2 anchor elements that open the link in a new tab", async ({
  page,
}) => {
  const linksWithBlankTargets = page
    .locator("table")
    .locator('[target="_blank"]');
  await expect(linksWithBlankTargets).toHaveCount(2);
});

test("has a an anchor element that has a valid email link text", async ({
  page,
}) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailAnchorAttributeValue = await page
    .locator("a")
    .filter({ hasText: emailRegex })
    .all()
    .then((val) => val.length);

  expect(emailAnchorAttributeValue).toBeGreaterThan(0);
});

test("has an anchor element that runs an email client when clicked", async ({
  page,
}) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailAnchorAttributeValue = await page
    .locator("a")
    .filter({ hasText: emailRegex })
    .getAttribute("href");

  expect(emailAnchorAttributeValue).toContain("mailto:");
});
