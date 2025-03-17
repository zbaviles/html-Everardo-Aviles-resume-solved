// @ts-check
import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";

/**
 * This file contains HTML validation logic without test code
 * to avoid Playwright's restriction on test files importing other test files.
 */

// File path configuration
const filePath = path.resolve(__dirname, "../index.html");

export const fileExists = fs.existsSync(filePath);

export const getHtmlContent = () => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return null;
  }
};

export const htmlContent = fileExists ? getHtmlContent() : null;
export const validationErrors = [];

export const shouldRunTests = () => {
  validationErrors.length = 0;

  if (!fileExists) {
    validationErrors.push(
      "index.html file not found. Please create this file before running tests."
    );
    return false;
  }

  if (!htmlContent) {
    validationErrors.push(
      "Could not read index.html content. Check file permissions and encoding."
    );
    return false;
  }

  // Basic HTML structure validation
  try {
    const hasDoctype = htmlContent.startsWith("<!DOCTYPE");
    if (!hasDoctype) {
      validationErrors.push(
        "DOCTYPE declaration is missing. Add <!DOCTYPE html> at the beginning of your HTML file."
      );
      return false;
    }

    const htmlMatches = htmlContent.match(/<html[\s\S]*?<\/html>/gi);
    if (!htmlMatches || htmlMatches.length !== 1) {
      validationErrors.push(
        "Document must have exactly one HTML element. Check for missing or extra <html> tags."
      );
      return false;
    }

    const root = parse(htmlContent);
    const html = root.querySelector("html");
    if (!html) {
      validationErrors.push(
        "HTML element could not be found. Make sure you have a valid <html> tag."
      );
      return false;
    }

    const headMatches = htmlContent.match(/<head[\s\S]*?<\/head>/gi);
    const bodyMatches = htmlContent.match(/<body[\s\S]*?<\/body>/gi);
    if (
      !headMatches ||
      !bodyMatches ||
      headMatches.length !== 1 ||
      bodyMatches.length !== 1
    ) {
      validationErrors.push(
        "Document must have exactly one HEAD and one BODY element. Check for missing or extra <head> or <body> tags."
      );
      return false;
    }

    const children = html.childNodes.filter((node) => node.nodeType === 1);
    if (children.length !== 2) {
      validationErrors.push(
        "HTML element must have exactly two children (HEAD and BODY). Check for extra elements or missing <head> or <body> tags."
      );
      return false;
    }

    return true;
  } catch (error) {
    validationErrors.push(
      `HTML validation failed with an error: ${error.message}`
    );
    return false;
  }
};

export const getValidationErrorMessage = () => {
  if (validationErrors.length === 0) {
    return "No validation errors";
  }

  return `HTML structure validation failed:\n${validationErrors
    .map((err) => `- ${err}`)
    .join("\n")}`;
};

shouldRunTests();
