import { processMetadata } from "./metadata";
import { createTableRow } from "./table";

const report = document.getElementById("report");
const queryParams = document.getElementById("query-params");
const errorDiv = document.getElementById("error");
const urlEncodedLabel = document.getElementById("url-encoded-label");
const urlEncodedValue = document.getElementById("url-encoded-value");
const urlEncodedButton = document.getElementById("url-encoded-button");
const utmsTableBody = document.getElementById("query-params-table-body");
const utmsNoResults = document.getElementById("query-params-no-results");

export const lastUrlStorageKey = "last_url";

const CopyIcon = `
  <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-gray-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
  </svg>
`;

const CheckIcon = `
  <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path>
  </svg>
`;

// Store the current click handler so we can remove it
let currentCopyHandler = null;

export const processUrl = async (raw) => {
  try {
    const encoded = encodeURIComponent(raw);
    const decoded = decodeURIComponent(raw);
    const isEncoded = decoded !== raw;
    const url = isEncoded ? new URL(decoded) : new URL(raw);

    // Async - fetch metadata
    processMetadata(url.href);

    // Saving last url for future session (save the string, not the URL object)
    localStorage.setItem(lastUrlStorageKey, url.href);

    // Clear error div because url is valid
    errorDiv.textContent = "";

    let valueToCopy;
    // Set url encoded and decoded values
    if (isEncoded) {
      urlEncodedLabel.textContent = "URL Decoded";
      urlEncodedValue.textContent = valueToCopy = decoded;
    } else {
      urlEncodedLabel.textContent = "URL Encoded";
      urlEncodedValue.textContent = valueToCopy = encoded;
    }

    // Remove previous click handler to prevent stacking
    if (currentCopyHandler) {
      urlEncodedButton.removeEventListener("click", currentCopyHandler);
    }

    // Reset button icon
    urlEncodedButton.innerHTML = CopyIcon;

    // Create new click handler
    currentCopyHandler = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(valueToCopy).then(() => {
        urlEncodedButton.innerHTML = CheckIcon;
        setTimeout(() => {
          urlEncodedButton.innerHTML = CopyIcon;
        }, 1500);
      });
    };

    urlEncodedButton.addEventListener("click", currentCopyHandler);

    // Show report section
    report.classList.remove("hidden");

    utmsTableBody.replaceChildren();
    const params = Array.from(url.searchParams.entries());
    if (params.length > 0) {
      // Remove "no results message"
      utmsNoResults.classList.add("hidden");

      // We add each query param to the table
      for (const param of params) {
        const tr = createTableRow(param);
        utmsTableBody.appendChild(tr);
      }
    } else {
      // Show no results message
      utmsNoResults.classList.remove("hidden");
    }

    // Show query-params section
    queryParams.classList.remove("hidden");
  } catch (err) {
    console.log("error", err);

    errorDiv.textContent = "Invalid URL";

    // Hide report and query-params section
    report.classList.add("hidden");
    queryParams.classList.add("hidden");
  }
};
