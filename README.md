# Cloudflare Worker Page Scraper

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/osener/scrapedown)

This project is a Cloudflare worker designed to scrape web pages and extract useful information, including a markdown-formatted version of the content. It's built to handle requests to scrape a given URL and return structured data about the page.

## Features

- Fetch and scrape content from any given URL.
- Extract metadata such as title, byline, excerpt, and more.
- Convert HTML content to clean markdown format.
- Handle requests with optional markdown formatting.

## Usage

To use this worker, send a GET request to the worker's endpoint with the `url` query parameter specifying the page to be scraped. Optionally, you can include the `markdown` query parameter to specify whether the content should be returned in markdown format (`true` or `false`).
e

### Example Request

```http
GET /?url=https://example.com&markdown=true
```

### Example Response

```json
{
  "page": {
    "byline": "Author Name",
    "content": "... stripped html content ...",
    "dir": null,
    "excerpt": "..."
    "lang": null,
    "length": 191,
    "siteName": null,
    "textContent": "... markdown content ...",
    "title": "Example Domain"
  }
}
```
