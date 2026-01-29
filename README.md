<div align="center">

# Link Inspector

**A fast, modern URL inspector that decodes query parameters and previews SEO metadata**

[![Astro](https://img.shields.io/badge/Astro-5.8-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)

[Live Demo](https://link-inspector.pages.dev) · [Report Bug](https://github.com/diegosalasmartinez/link-inspector/issues)

</div>

---

## What is this?

Link Inspector helps you understand what's inside a URL. Paste any link and instantly see:

- **Decoded URLs** — Converts `%20` back to spaces, reveals hidden characters
- **Query Parameters** — Every `?key=value` pair in a clean table
- **SEO Preview** — How your link appears when shared on social media

Perfect for debugging tracking links, checking UTM parameters, or inspecting how a page looks when shared.

---

## Features

### URL Decoding & Encoding
Automatically detects if your URL is encoded and shows both versions. One-click copy for either format.

### Query Parameter Table
All URL parameters extracted into a searchable table with:
- Parameter keys and raw values
- Copy buttons for each field
- Clean handling of complex nested params

### SEO & Social Preview
See exactly how a URL will appear when shared:
- **Open Graph** tags (og:title, og:description, og:image)
- **Twitter Card** metadata
- **Standard meta** tags (description, viewport, theme-color)

### Session Persistence
Your last inspected URL is saved locally — pick up right where you left off.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) |
| API | [Cloudflare Workers](https://workers.cloudflare.com) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com) |

---

## Project Structure

```
link-inspector/
├── site/                    # Frontend (Astro)
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Routes
│   │   └── scripts/         # Client-side JS
│   └── package.json
│
├── api/                     # Backend (Cloudflare Worker)
│   ├── index.ts             # Metadata scraper
│   └── wrangler.toml        # Worker config
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/diegosalasmartinez/link-inspector.git
cd link-inspector

# Install frontend dependencies
cd site
pnpm install
```

### Development

**Run the frontend:**
```bash
cd site
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321)

**Run the API locally:**
```bash
cd api
npx wrangler dev
```
API available at [http://localhost:8787](http://localhost:8787)

> **Note:** For local development, update the CORS settings in `api/index.ts` to allow `localhost`.

---

## API Usage

The metadata API accepts a URL and returns all meta tags as JSON:

```bash
GET /?url=https://github.com
```

**Response:**
```json
{
  "og:title": "GitHub",
  "og:description": "GitHub is where people build software.",
  "og:image": "https://github.githubassets.com/images/modules/open_graph/github-octocat.png",
  "twitter:card": "summary_large_image"
}
```

---

## Deployment

### Frontend (Cloudflare Pages)

```bash
cd site
pnpm build
```

Deploy the `dist/` folder to Cloudflare Pages, Vercel, or Netlify.

### API (Cloudflare Workers)

```bash
cd api
npx wrangler deploy
```

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  User URL   │────▶│  URL Parser  │────▶│  Query Params   │
└─────────────┘     └──────────────┘     │  Table          │
                           │             └─────────────────┘
                           ▼
                    ┌──────────────┐     ┌─────────────────┐
                    │  CF Worker   │────▶│  SEO Preview    │
                    │  (scraper)   │     │  Card           │
                    └──────────────┘     └─────────────────┘
```

1. **URL Parsing** — Client-side JavaScript parses the URL, detects encoding, extracts query parameters
2. **Metadata Fetching** — Cloudflare Worker fetches the target page and extracts meta tags via regex
3. **Preview Rendering** — Results displayed as an interactive card with copy functionality

---

## License

MIT

---

<div align="center">

Made with Astro, Tailwind, and Cloudflare Workers

</div>
