const CopyIcon = `
    <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-gray-600 hover:text-black transition-colors' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
      <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
    </svg>
  `;

const CheckIcon = `
    <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path>
    </svg>
  `;

export function createTableRow([key, value]) {
  const tr = document.createElement("tr");
  tr.className = "hover:bg-gray-50 transition-colors border-b border-gray-100";

  // Key cell
  const tdKey = document.createElement("td");
  tdKey.className = "relative group px-4 py-2 font-medium text-gray-800";

  const keySpan = document.createElement("span");
  keySpan.className = "break-all";
  keySpan.textContent = key;

  const keyButton = document.createElement("button");
  keyButton.className = "absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100 border border-gray-300 px-1 py-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200";
  keyButton.setAttribute("aria-label", "Copy key");
  keyButton.innerHTML = CopyIcon;
  keyButton.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(key).then(() => {
      keyButton.innerHTML = CheckIcon;
      setTimeout(() => {
        keyButton.innerHTML = CopyIcon;
      }, 1500);
    });
  });

  tdKey.appendChild(keySpan);
  tdKey.appendChild(keyButton);

  // Value cell
  const tdValue = document.createElement("td");
  tdValue.className = "relative group px-4 py-2 text-gray-600";

  const valueSpan = document.createElement("span");
  valueSpan.className = "break-all";
  valueSpan.textContent = value;

  const valueButton = document.createElement("button");
  valueButton.className = "absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100 border border-gray-300 px-1 py-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200";
  valueButton.setAttribute("aria-label", "Copy value");
  valueButton.innerHTML = CopyIcon;
  valueButton.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      valueButton.innerHTML = CheckIcon;
      setTimeout(() => {
        valueButton.innerHTML = CopyIcon;
      }, 1500);
    });
  });

  tdValue.appendChild(valueSpan);
  tdValue.appendChild(valueButton);

  tr.appendChild(tdKey);
  tr.appendChild(tdValue);
  return tr;
}
