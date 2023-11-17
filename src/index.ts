import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { scrape } from "./scrape";

const app = new Hono();

app.get(
  "/",
  zValidator(
    "query",
    z.object({
      url: z.string().url(),
      markdown: z.union([z.literal("true"), z.literal("false")]).optional(),
    })
  ),
  async (c) => {
    const url = c.req.query("url")!;
    const markdownParam = c.req.query("markdown") || "true";
    const markdown = markdownParam === "true" || markdownParam === "1";
    try {
      console.log("scraping", url, markdown);
      const page = await scrape({ url, markdown });
      return c.json({ page });
    } catch (e) {
      if (e instanceof Error) {
        return c.json({ page: null, error: e.message });
      } else {
        return c.json({ page: null, error: "An unknown error occurred" });
      }
    }
  }
);

export default app;
