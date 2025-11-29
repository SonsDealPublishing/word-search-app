// puzzlePage.js

// Helper: read query params from URL
function getQueryParams() {
  const params = {};
  const query = window.location.search.substring(1);
  const pairs = query.split("&").filter(Boolean);

  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  return params;
}

const params = getQueryParams();
const book = Number(params.book);
const code = params.code;
const number = Number(params.number);

const titleEl = document.getElementById("puzzleTitle");
const infoEl = document.getElementById("puzzleInfo");
const gridEl = document.getElementById("wordGrid");
const wordListEl = document.getElementById("wordList");
const backBtn = document.getElementById("backToList");

// Find the puzzle in our data
const puzzle = PUZZLES.find(
  (p) => p.book === book && p.code === code
);

if (!puzzle) {
  titleEl.textContent = "Puzzle not found";
  infoEl.textContent =
    "This puzzle ID does not exist in the data file (puzzlesData.js).";
} else {
  // Title + info
  titleEl.textContent = `Book ${puzzle.book}: ${puzzle.code}`;
  infoEl.textContent = `Puzzle #${puzzle.number} — ${puzzle.grid.length} x ${
    puzzle.grid[0].length
  } grid`;

  // ----- Render grid -----
  const rows = puzzle.grid;
  const colsCount = rows[0].length;

  // set CSS columns based on puzzle width
  gridEl.style.gridTemplateColumns = `repeat(${colsCount}, 28px)`;

  rows.forEach((row) => {
    row.split("").forEach((ch) => {
      const cell = document.createElement("div");
      cell.className = "word-cell";
      cell.textContent = ch.toUpperCase();
      gridEl.appendChild(cell);
    });
  });

  // ----- Render word list -----
  if (Array.isArray(puzzle.wordList)) {
    puzzle.wordList.forEach((word) => {
      const li = document.createElement("li");
      li.textContent = word.toUpperCase();
      wordListEl.appendChild(li);
    });
  }
}

// Back button
backBtn.addEventListener("click", () => {
  window.history.back();
});
