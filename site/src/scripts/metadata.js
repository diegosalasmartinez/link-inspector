const WORKER_URL = "https://link-inspector-api.diesalasmart.workers.dev/";
//const WORKER_URL = "http://localhost:8787/";

const section = document.getElementById("seo-section");
const image = document.getElementById("seo-preview-image");
const title = document.getElementById("seo-preview-title");
const description = document.getElementById("seo-preview-description");
const previewUrl = document.getElementById("seo-preview-url");
const tagsGrid = document.getElementById("seo-preview-tags");

export const processMetadata = async (url) => {
  const metadata = await fetchSeoMetadata(url);
  if (!metadata) {
    section.classList.add("hidden");
    return;
  }

  renderSeoMetadata(metadata, url);
};

const renderSeoMetadata = (metadata, urlInspected) => {
  section.classList.remove("hidden");
  tagsGrid.innerHTML = "";

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

  // Metadata
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
    div.innerHTML = `<strong class="text-gray-700">${label}:</strong> ${value}`;
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
