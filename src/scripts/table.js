const CopyIcon = `
    <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-gray-600 hover:text-black transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
      <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
    </svg>
  `;

export function createTableRow([key, value]) {
  const tr = document.createElement("tr");
  tr.className = "hover:bg-gray-50 transition-colors border-b border-gray-100";

  // Key cell
  const tdKey = document.createElement("td");
  tdKey.className = "relative group px-4 py-2 font-medium text-gray-800";

  tdKey.innerHTML = `
    <span class="break-all">${key}</span>
    <button class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100 border border-gray-300 px-1 py-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200" aria-label="Copy key">
      ${CopyIcon}
    </button>
  `;
  tdKey.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(key);
  });

  // Value cell
  const tdValue = document.createElement("td");
  tdValue.className = "relative group px-4 py-2 text-gray-600";
  tdValue.innerHTML = `
    <span class="break-all">${value}</span>
    <button class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100 border border-gray-300 px-1 py-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200" aria-label="Copy value">
      ${CopyIcon}
    </button>
  `;
  tdValue.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
  });

  tr.appendChild(tdKey);
  tr.appendChild(tdValue);
  return tr;
}
