// main.js

// Filter only puzzles for book 401
const currentBook = 401;
const puzzlesForBook = PUZZLES.filter((p) => p.book === currentBook);

const listEl = document.getElementById("puzzleList");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const backBtn = document.getElementById("backBtn");

// render list
function renderList(items) {
  listEl.innerHTML = "";

  items.forEach((puzzle) => {
    const item = document.createElement("div");
    item.className = "puzzle-item";

    const numberCircle = document.createElement("div");
    numberCircle.className = "puzzle-number-circle";
    numberCircle.textContent = puzzle.number;

    const main = document.createElement("div");
    main.className = "puzzle-main";

    const title = document.createElement("div");
    title.className = "puzzle-title";
    title.textContent = `Book ${puzzle.book}: ${puzzle.code}`;

    const subtitle = document.createElement("div");
    subtitle.className = "puzzle-subtitle";
    subtitle.textContent = `Puzzle #${puzzle.number}`;

    main.appendChild(title);
    main.appendChild(subtitle);

    const gridBtn = document.createElement("button");
    gridBtn.className = "puzzle-grid-btn";
    gridBtn.innerHTML = "▦"; // simple grid icon

    // click on row OR grid opens puzzle page
    function openPuzzle() {
      const url = `puzzle.html?book=${puzzle.book}&code=${encodeURIComponent(
        puzzle.code
      )}&number=${puzzle.number}`;
      window.location.href = url;
    }

    item.addEventListener("click", openPuzzle);
    gridBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // avoid double event
      openPuzzle();
    });

    item.appendChild(numberCircle);
    item.appendChild(main);
    item.appendChild(gridBtn);

    listEl.appendChild(item);
  });
}

// initial render
renderList(puzzlesForBook);

// search filter
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  const filtered = puzzlesForBook.filter((p) => {
    const numberStr = String(p.number);
    const codeStr = p.code.toLowerCase();
    return numberStr.includes(q) || codeStr.includes(q);
  });

  renderList(filtered);
});

// clear search
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderList(puzzlesForBook);
});

// Back button – here you can redirect somewhere if you like
backBtn.addEventListener("click", () => {
  // Currently just goes back in browser history
  window.history.back();
});
