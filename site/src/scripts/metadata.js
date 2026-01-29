const WORKER_URL = "https://link-inspector-api.diesalasmart.workers.dev/";
//const WORKER_URL = "http://localhost:8787/";

const section = document.getElementById("seo-section");
const loading = document.getElementById("seo-loading");
const errorDiv = document.getElementById("seo-error");
const card = document.getElementById("seo-preview-card");
const image = document.getElementById("seo-preview-image");
const title = document.getElementById("seo-preview-title");
const description = document.getElementById("seo-preview-description");
const previewUrl = document.getElementById("seo-preview-url");
const tagsGrid = document.getElementById("seo-preview-tags");

export const processMetadata = async (url) => {
  // Show section with loading state
  section.classList.remove("hidden");
  loading.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  card.classList.add("hidden");

  const metadata = await fetchSeoMetadata(url);

  // Hide loading
  loading.classList.add("hidden");

  if (!metadata) {
    errorDiv.classList.remove("hidden");
    card.classList.add("hidden");
    return;
  }

  renderSeoMetadata(metadata, url);
};

const renderSeoMetadata = (metadata, urlInspected) => {
  errorDiv.classList.add("hidden");
  card.classList.remove("hidden");
  tagsGrid.replaceChildren();

  const get = (key) => metadata[key] || metadata[key.replace(":", "_")] || "";

  // Main preview
  const imgUrl = get("og:image") || get("twitter:image");
  if (imgUrl) {
    image.src = imgUrl;
    image.classList.remove("hidden");
  } else {
    image.classList.add("hidden");
  }

  title.textContent = get("og:title") || get("title") || "No title found";
  description.textContent =
    get("og:description") || get("description") || "No description";
  previewUrl.textContent = urlInspected || "";

  // Metadata tags (using textContent to prevent XSS)
  const importantTags = [
    ["og:site_name", "Site"],
    ["twitter:card", "Twitter Card"],
    ["twitter:site", "Twitter Site"],
    ["twitter:creator", "Twitter Creator"],
    ["theme-color", "Theme Color"],
    ["viewport", "Viewport"],
  ];

  for (const [key, label] of importantTags) {
    const value = get(key);
    if (!value) continue;

    const div = document.createElement("div");

    const strong = document.createElement("strong");
    strong.className = "text-gray-700";
    strong.textContent = `${label}: `;

    const span = document.createElement("span");
    span.textContent = value;

    div.appendChild(strong);
    div.appendChild(span);
    tagsGrid.appendChild(div);
  }
};

async function fetchSeoMetadata(url) {
  try {
    const response = await fetch(
      `${WORKER_URL}?url=${encodeURIComponent(url)}`,
    );
    if (!response.ok) throw new Error("Failed to fetch metadata");

    return await response.json();
  } catch (err) {
    console.error("Error fetching metadata:", err);
    return null;
  }
}
