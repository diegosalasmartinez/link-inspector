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

export const processUrl = async (raw) => {
  try {
    const encoded = encodeURIComponent(raw);
    const decoded = decodeURIComponent(raw);
    const isEncoded = decoded !== raw;
    const url = isEncoded ? new URL(decoded) : new URL(raw);

    // Async
    processMetadata(url.href);

    // Saving last url for future session
    localStorage.setItem(lastUrlStorageKey, url);

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

    // Copy value to clipboard on click button
    urlEncodedButton.addEventListener("click", (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(valueToCopy);
    });

    // Show report section
    report.classList.remove("hidden");

    utmsTableBody.replaceChildren();
    const params = Array.from(url.searchParams.entries());
    if (params.length > 0) {
      // Remove "no results message"
      utmsNoResults.classList.add("hidden");

      // Remove current query-params
      utmsTableBody.replaceChildren();

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
