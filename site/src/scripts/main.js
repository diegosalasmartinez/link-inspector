import { processUrl, lastUrlStorageKey } from "./url";

const form = document.getElementById("url-form");
const input = document.getElementById("url-input");

// Restore the last url submitted by the user
const lastUrl = localStorage.getItem(lastUrlStorageKey);
if (lastUrl) {
  input.value = lastUrl;
  processUrl(lastUrl);
}

// Listen submits from the user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  processUrl(input.value.trim());
});
