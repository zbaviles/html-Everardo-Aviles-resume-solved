// @ts-check
import { test, expect } from "@playwright/test";
import {
  fileExists,
  htmlContent,
  shouldRunTests,
  validationErrors,
  getValidationErrorMessage,
} from "./html-validate-helper";
import { parse } from "node-html-parser";

/**
 * This file runs the HTML validation tests using the validation logic from the helper
 */

// Run the validation tests
test.describe("HTML Structure Validation", () => {
  // Check file existence first
  test("index.html file exists", async () => {
    expect(fileExists, "index.html file should exist").toBe(true);
    if (!fileExists) {
      test.info().annotations.push({
        type: "error",
        description:
          "index.html file not found. Please create this file before running tests.",
      });
    }
  });

  // Skip remaining tests if file doesn't exist
  test.describe("Content tests", () => {
    test.skip(!fileExists, "index.html file not found, skipping content tests");

    test("index.html content can be read", async () => {
      expect(htmlContent, "HTML content should be readable").not.toBeNull();
      if (!htmlContent) {
        test.info().annotations.push({
          type: "error",
          description:
            "Could not read index.html content. Check file permissions and encoding.",
        });
      }
    });

    // Skip structure tests if content couldn't be read
    test.describe("Structure tests", () => {
      test.skip(
        !htmlContent,
        "Could not read index.html content, skipping structure tests"
      );

      // Make TypeScript happy with non-null assertion and runtime check
      test("DOCTYPE declaration exists", async () => {
        if (!htmlContent) return;

        const hasDoctype = htmlContent.startsWith("<!DOCTYPE");
        expect(hasDoctype, "DOCTYPE declaration should exist").toBe(true);
        if (!hasDoctype) {
          test.info().annotations.push({
            type: "error",
            description:
              "DOCTYPE declaration is missing. Add <!DOCTYPE html> at the beginning of your HTML file.",
          });
        }
      });

      test("HTML element exists and is unique", async () => {
        if (!htmlContent) return;

        const htmlMatches = htmlContent.match(/<html[\s\S]*?<\/html>/gi);
        expect(htmlMatches, "HTML element should exist").not.toBeNull();
        expect(
          htmlMatches?.length,
          "There should be exactly one HTML element"
        ).toBe(1);

        if (!htmlMatches || htmlMatches.length !== 1) {
          test.info().annotations.push({
            type: "error",
            description:
              "Document must have exactly one HTML element. Check for missing or extra <html> tags.",
          });
        }
      });

      test("Document has proper structure at top level", async () => {
        if (!htmlContent) return;

        const root = parse(htmlContent);
        const topLevelNodes = root.childNodes.filter(
          (node) => node.nodeType === 1
        );
        const htmlElement = topLevelNodes.find((node) => {
          return node.rawTagName === "html";
        });
        expect(htmlElement, "HTML element should be found").not.toBeUndefined();
        expect(
          topLevelNodes.length,
          "Only HTML should exist at top level"
        ).toBe(1);

        if (!htmlElement || topLevelNodes.length !== 1) {
          test.info().annotations.push({
            type: "error",
            description:
              "Document structure at top level is incorrect. Only HTML should exist at the top level.",
          });
        }
      });

      test("HEAD and BODY elements exist and are unique", async () => {
        if (!htmlContent) return;

        const headMatches = htmlContent.match(/<head[\s\S]*?<\/head>/gi);
        const bodyMatches = htmlContent.match(/<body[\s\S]*?<\/body>/gi);
        expect(headMatches, "HEAD element should exist").not.toBeNull();
        expect(bodyMatches, "BODY element should exist").not.toBeNull();
        expect(
          headMatches?.length,
          "There should be exactly one HEAD element"
        ).toBe(1);
        expect(
          bodyMatches?.length,
          "There should be exactly one BODY element"
        ).toBe(1);

        if (
          !headMatches ||
          !bodyMatches ||
          headMatches.length !== 1 ||
          bodyMatches.length !== 1
        ) {
          test.info().annotations.push({
            type: "error",
            description:
              "Document must have exactly one HEAD and one BODY element. Check for missing or extra <head> or <body> tags.",
          });
        }
      });

      test("HTML element has exactly two children (HEAD and BODY)", async () => {
        if (!htmlContent) return;

        const root = parse(htmlContent);
        const html = root.querySelector("html");
        if (!html) {
          expect(html, "HTML element should exist").not.toBeNull();
          test.info().annotations.push({
            type: "error",
            description:
              "HTML element could not be found. Make sure you have a valid <html> tag.",
          });
          return;
        }

        const children = html.childNodes.filter((node) => node.nodeType === 1);
        expect(
          children.length,
          "HTML should have exactly two children (HEAD and BODY)"
        ).toBe(2);

        if (children.length !== 2) {
          test.info().annotations.push({
            type: "error",
            description:
              "HTML element must have exactly two children (HEAD and BODY). Check for extra elements or missing <head> or <body> tags.",
          });
        }
      });
      test("HTML validation passes all checks", async () => {
        const validationPassed = shouldRunTests();
        expect(
          validationPassed,
          "HTML structure validation should pass all checks"
        ).toBe(true);

        if (!validationPassed) {
          test.info().annotations.push({
            type: "error",
            description: getValidationErrorMessage(),
          });
        }
      });
    });
  });
});
