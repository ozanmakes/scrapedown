import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import TurndownService from "./turndown";

export const scrape = async ({
  url,
  markdown,
}: {
  url: string;
  markdown: boolean;
}) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    },
  });
  const html = await response.text();
  console.log("html", html);
  const article = extract(html);

  if (article == null) {
    return null;
  }

  if (markdown) {
    const textContent = convertToMarkdown(article.content);
    return { ...article, textContent };
  } else {
    const content = cleanString(article.content);
    const textContent = cleanString(article.textContent);

    return { ...article, content, textContent };
  }
};

const extract = (html: string) => {
  var doc = parseHTML(html);
  let reader = new Readability(doc.window.document);
  return reader.parse();
};

const convertToMarkdown = (html: string) => {
  const turndown = new TurndownService();
  const doc = parseHTML(html);
  return turndown.turndown(doc.window.document);
};

//
const cleanString = (str: string) =>
  str
    // Replace various whitespace and zero-width characters with a single space
    .replace(/[\s\t\u200B-\u200D\uFEFF]+/g, " ")
    // Remove leading whitespace from each line in the string
    .replace(/^\s+/gm, "")
    // Collapse multiple newline characters into a single newline
    .replace(/\n+/g, "\n");
