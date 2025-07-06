# 🔎 Link Inspector – Monorepo

This is the root of the Link Inspector project, containing:

- `site/` — Frontend UI built with Astro and Tailwind CSS
- `api/` — Cloudflare Worker for scraping and extracting URL metadata

## 📦 Folder Structure

```
├── site/               # Astro + Tailwind UI for inspecting URLs
├── api/                # Cloudflare Worker for metadata extraction
└── README.md
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd site
pnpm install
````

> This installs dependencies for `site/` (`api/` doesn't have dependencies)

---

### 2. Run frontend (UI)

```bash
cd site
pnpm dev
```

Open: `http://localhost:4321`

---

### 3. Run API (Worker)

```bash
cd api
npx wrangler dev
```

API runs at: `http://localhost:8787/?url=https://github.com`

---

## 🌐 Deployment

* `site/` can be deployed to:

  * Vercel
  * Netlify
  * Cloudflare Pages

* `api/` is deployed with:

  ```bash
  npx wrangler publish
  ```

## 📘 Docs

* [Astro Docs](https://docs.astro.build/)
* [Cloudflare Workers](https://developers.cloudflare.com/workers/)
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

