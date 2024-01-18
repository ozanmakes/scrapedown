<img align="right" width="300"  src="https://github.com/osener/scrapedown/assets/111265/cc059686-c452-4982-82c9-023c7696699b">

# scrapedown

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/osener/scrapedown)

This project is a Cloudflare worker designed to scrape web pages and extract useful information, including a markdown-formatted version of the content. It's built to handle requests to scrape a given URL and return structured data about the page.

## Features

- Fetch and scrape content from any given URL.
- Extract metadata such as title, byline, excerpt, and more.
- Convert HTML content to clean markdown format.
- Handle requests with optional markdown formatting.
- Remove everything but the content (Reader Mode)

## Usage

To use this worker, send a GET request to the worker's endpoint with the `url` query parameter specifying the page to be scraped. Optionally, you can include the `markdown` query parameter to specify whether the content should be returned in markdown format (default: `true`).
e

### Example Request

```
GET https://<worker-name>.workers.dev/?url=https://example.com&markdown=true
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

## Deployment

To deploy this Cloudflare worker, you have two options:

1. Use Wrangler CLI:

   ```sh
   npx wrangler deploy
   ```

2. Click the "Deploy to Cloudflare Workers" button at the top of this README.

## Deployment with Docker

Run in a docker container by first building the image and then running the container.

Run the commands below from the project root.

```
docker compose -f docker-compose-dev.yaml build
docker compose -f docker-compose-dev.yaml up -d
```

Modifications to your running container can be made in the `docker-compose-dev.yaml`.

### Example usage with Docker

```
GET http://<IP ADDR>:8787/?url=https://example.com&markdown=true
```
