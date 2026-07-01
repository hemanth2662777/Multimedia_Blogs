const genreContainer = document.getElementById("genreContainer");
const loader = document.getElementById("loader");

console.log(moviesData);

let currentMovies = moviesData;

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadMovies();
  loadGenres();
});

/* ================= LOAD MOVIES ================= */

function loadMovies() {
  renderMovies(currentMovies);
}

/* ================= RENDER MOVIES ================= */

function renderMovies(movies) {
  if (!movieContainer) return;

  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    movieContainer.appendChild(createMovieCard(movie));
  });
}

/* ================= MOVIE CARD ================= */

function createMovieCard(movie) {
  const div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">

    <div class="movie-info">
      <h3>${movie.title}</h3>

      <div class="movie-meta">
        <span>⭐ ${movie.rating}</span>
        <span>${movie.year}</span>
      </div>

      <p>${movie.description.substring(0, 100)}...</p>

      <button class="primary-btn">▶ Watch Movie</button>
    </div>
  `;

  div.querySelector("button").addEventListener("click", () => {
    window.open(movie.trailer, "_blank");
  });

  return div;
}

/* ================= GENRE FILTER ================= */

function loadGenres() {
  if (!genreContainer) return;

  const genres = ["All", ...new Set(moviesData.map((m) => m.genre))];

  const genreIcons = {
    All: "🎬",
    Action: "💥",
    Drama: "🎭",
    "Sci-Fi": "🚀",
    Comedy: "😂",
    Romance: "❤️",
    Crime: "🕵️",
  };

  genreContainer.innerHTML = "";

  genres.forEach((genre) => {
    const btn = document.createElement("button");

    btn.className = "filter-btn";
    btn.innerHTML = `${genreIcons[genre] || "🎬"} ${genre}`;

    btn.addEventListener("click", () => {
      filterMovies(genre);
    });

    genreContainer.appendChild(btn);
  });
}

/* ================= FILTER ================= */

function filterMovies(genre) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  currentMovies =
    genre === "All" ? moviesData : moviesData.filter((m) => m.genre === genre);

  renderMovies(currentMovies);
}

/* ================= SEARCH ================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(value),
    );

    renderMovies(filtered);
  });
}
