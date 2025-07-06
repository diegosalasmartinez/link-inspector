# ☁️ Link Inspector API (Cloudflare Worker)

This folder contains the serverless API used by the Link Inspector app to extract metadata from URLs (e.g., SEO tags, OpenGraph, Twitter cards).
Powered by **Cloudflare Workers** using [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

## 📦 Project Structure

```
api/
├── index.ts           # Entry point for the Worker
└── wrangler.toml      # Wrangler configuration
```

## 🧪 Local Development

To test the worker locally:

```bash
npx wrangler dev
````

This runs your worker at:
👉 `http://localhost:8787/?url=https://github.com`

## 🚀 Deploy to Cloudflare

Make sure you're authenticated with Cloudflare:

```bash
npx wrangler login
```

Then deploy:

```bash
npx wrangler publish
```

## 📘 Docs

* [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
* [Workers Runtime API](https://developers.cloudflare.com/workers/runtime-apis/)

