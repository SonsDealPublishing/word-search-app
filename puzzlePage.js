// puzzlePage.js

function getQueryParams() {
  const params = {};
  const query = window.location.search.substring(1);
  const pairs = query.split("&").filter(Boolean);

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });

  return params;
}

const params = getQueryParams();
const book = Number(params.book);
const code = params.code;
const number = Number(params.number);

// find puzzle in data (optional)
const puzzle =
  PUZZLES.find((p) => p.book === book && p.code === code) || null;

const titleEl = document.getElementById("puzzleTitle");
const infoEl = document.getElementById("puzzleInfo");
const backBtn = document.getElementById("backToList");

if (puzzle) {
  titleEl.textContent = `Book ${book}: ${code}`;
  infoEl.textContent = `Puzzle #${number} in Book ${book} (ID: ${code}).`;
} else {
  titleEl.textContent = "Puzzle not found";
  infoEl.textContent =
    "The puzzle ID in the URL does not exist in the data file.";
}

// Back button
backBtn.addEventListener("click", () => {
  window.history.back();
});
