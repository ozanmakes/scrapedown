import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return scraped page with markdown contents", async () => {
    const resp = await worker.fetch("/?url=https://www.robotstxt.org");
    if (resp) {
      expect(resp.status).toEqual(200);
      const data = await resp.json();
      expect(data).toMatchInlineSnapshot(
        `
        {
          "page": {
            "byline": null,
            "content": "<DIV class=\\"page\\" id=\\"readability-page-1\\"><div id=\\"content\\">


        <p> Web Robots (also known as Web Wanderers, Crawlers, or Spiders),
        are programs that traverse the Web automatically. Search engines such
        as <a href=\\"http://www.google.com/\\">Google</a> use them to index the web
        content, spammers use them to scan for email addresses, and they have
        many other uses.</p>

        <p>On this site you can learn more about web robots.</p>

        <ul>

        <li><a href=\\"robotstxt.html\\">About /robots.txt</a> explains what
        /robots.txt is, and how to use it.</li>

        <li>The <a href=\\"faq.html\\">FAQ</a> answers many frequently asked
        questions, such as <a href=\\"/faq/prevent.html\\">How do I stop robots
        visiting my site?</a> and <a href=\\"/faq/bestlisting.html\\">How can I get the best listing
        in search engines?\\"</a></li>

        <li>The <a href=\\"other.html\\">Other Sites</a> page links to external
        resources for robot writers and webmasters.</li>

        <li>The <a href=\\"db.html\\">Robots Database</a> has a list of robots.</li>

        <li>The <a href=\\"checker.html\\">/robots.txt checker</a> can check
        your site's /robots.txt file and meta tags.</li>

        <li>The <a href=\\"iplookup.html\\">IP Lookup</a> can help find out
        more about what robots are visiting you.</li>

        </ul>

        	  </div></DIV>",
            "dir": null,
            "excerpt": "Web Robots (also known as Web Wanderers, Crawlers, or Spiders),
        are programs that traverse the Web automatically. Search engines such
        as Google use them to index the web
        content, spammers use them to scan for email addresses, and they have
        many other uses.",
            "lang": null,
            "length": 820,
            "siteName": null,
            "textContent": "Web Robots (also known as Web Wanderers, Crawlers, or Spiders), are programs that traverse the Web automatically. Search engines such as [Google](http://www.google.com/) use them to index the web content, spammers use them to scan for email addresses, and they have many other uses.

        On this site you can learn more about web robots.

        *   [About /robots.txt](robotstxt.html) explains what /robots.txt is, and how to use it.
        *   The [FAQ](faq.html) answers many frequently asked questions, such as [How do I stop robots visiting my site?](/faq/prevent.html) and [How can I get the best listing in search engines?\\"](/faq/bestlisting.html)
        *   The [Other Sites](other.html) page links to external resources for robot writers and webmasters.
        *   The [Robots Database](db.html) has a list of robots.
        *   The [/robots.txt checker](checker.html) can check your site's /robots.txt file and meta tags.
        *   The [IP Lookup](iplookup.html) can help find out more about what robots are visiting you.",
            "title": "The Web Robots Pages",
          },
        }
      `
      );
    }
  });
});
