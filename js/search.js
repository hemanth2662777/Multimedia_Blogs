/*==================================================
                TMDB LIVE SEARCH
==================================================*/
console.log("search.js loaded");

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const clearSearchBtn = document.getElementById("clearSearch");

let debounceTimer = null;

/*==================================================
                INITIALIZE SEARCH
==================================================*/

if (searchInput) {
  searchInput.setAttribute("autocomplete", "off");

  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      handleSearch();
    }, 400);
  });
}

/*==================================================
                HANDLE SEARCH
==================================================*/

async function handleSearch() {
  const query = searchInput.value.trim();

  if (query.length < 2) {
    hideSearchResults();

    return;
  }

  showLoader();

  try {
    const movies = await searchMovies(query);

    renderSearchResults(movies);
  } catch (error) {
    console.error(error);

    showError();
  }
}

/*==================================================
                RENDER SEARCH RESULTS
==================================================*/

function renderSearchResults(movies) {
  searchResults.innerHTML = "";

  if (!movies || movies.length === 0) {
    searchResults.innerHTML = `

            <div class="search-empty">

                <h3>No Movies Found</h3>

            </div>

        `;

    searchResults.style.display = "block";

    return;
  }

  movies.slice(0, 8).forEach((movie) => {
    const poster = getPosterUrl(movie.poster_path);

    const year = movie.release_date
      ? movie.release_date.substring(0, 4)
      : "Unknown";

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    const overview = movie.overview
      ? movie.overview.substring(0, 100)
      : "No description available.";

    const card = document.createElement("div");

    card.className = "search-card";

    card.innerHTML = `

            <img
                src="${poster}"
                alt="${movie.title}"
            >

            <div class="search-info">

                <h3>${movie.title}</h3>

                <p>

                    ⭐ ${rating}

                    &nbsp;&nbsp;

                    📅 ${year}

                </p>

                <p>

                    ${overview}...

                </p>

                <div class="search-buttons">

                    <button
                        class="details-btn"
                        data-id="${movie.id}"
                    >

                        View Details

                    </button>

                    <button
                        class="trailer-btn"
                        data-id="${movie.id}"
                    >

                        ▶ Trailer

                    </button>

                </div>

            </div>

        `;

    searchResults.appendChild(card);
  });

  attachMovieEvents();

  searchResults.style.display = "block";
}

/*==================================================
                ATTACH EVENTS
==================================================*/

function attachMovieEvents() {
  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const movieId = button.dataset.id;

      openMovieDetails(movieId);
    });
  });

  document.querySelectorAll(".trailer-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const movieId = button.dataset.id;

      openTrailer(movieId);
    });
  });
}

/*==================================================
                MOVIE DETAILS
==================================================*/

async function openMovieDetails(movieId) {
  try {
    const movie = await getMovieDetails(movieId);

    const videos = await getMovieVideos(movieId);

    const trailer = videos.find(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser"),
    );

    showMovieModal(movie, trailer);
  } catch (error) {
    console.error(error);

    alert("Unable to load movie details.");
  }
}

/*==================================================
                TRAILER
==================================================*/

async function openTrailer(movieId) {
  try {
    const videos = await getMovieVideos(movieId);

    const trailer = videos.find(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser"),
    );

    if (!trailer) {
      alert("Trailer not available.");

      return;
    }

    showTrailerModal(trailer.key);
  } catch (error) {
    console.error(error);
  }
}

/*==================================================
                MOVIE MODAL
==================================================*/

function showMovieModal(movie, trailer) {
  const oldModal = document.getElementById("movieModal");

  if (oldModal) oldModal.remove();

  const modal = document.createElement("div");

  modal.id = "movieModal";

  modal.className = "movie-modal";

  modal.innerHTML = `

        <div class="movie-modal-content">

            <button class="movie-close">

                &times;

            </button>

            <img
                class="movie-backdrop"
                src="${getBackdropUrl(movie.backdrop_path)}"
            >

            <div class="movie-info">

                <h2>${movie.title}</h2>

                <p>

                    ⭐ ${movie.vote_average}

                    •

                    ${formatReleaseDate(movie.release_date)}

                </p>

                <p>

                    Runtime:
                    ${formatRuntime(movie.runtime)}

                </p>

                <p>

                    ${movie.overview}

                </p>

                ${
                  trailer
                    ? `<button
                        class="watch-trailer-btn"
                        data-key="${trailer.key}">
                        ▶ Watch Trailer
                    </button>`
                    : ""
                }

            </div>

        </div>

    `;

  document.body.appendChild(modal);

  modal.querySelector(".movie-close").onclick = () => {
    modal.remove();
  };

  const trailerBtn = modal.querySelector(".watch-trailer-btn");

  if (trailerBtn) {
    trailerBtn.onclick = () => {
      showTrailerModal(trailerBtn.dataset.key);
    };
  }
}

/*==================================================
                TRAILER MODAL
==================================================*/

function showTrailerModal(videoKey) {
  const old = document.getElementById("trailerPopup");

  if (old) old.remove();

  const modal = document.createElement("div");

  modal.id = "trailerPopup";

  modal.className = "trailer-modal";

  modal.innerHTML = `

        <div class="trailer-modal-content">

            <button class="trailer-close">

                &times;

            </button>

            <iframe

                src="https://www.youtube.com/embed/${videoKey}"

                allowfullscreen>

            </iframe>

        </div>

    `;

  document.body.appendChild(modal);

  modal.querySelector(".trailer-close").onclick = () => {
    modal.remove();
  };

  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.remove();
    }
  };
}

/*==================================================
                LOADER
==================================================*/

function showLoader() {
  searchResults.style.display = "block";

  searchResults.innerHTML = `

        <div class="search-loading">

            Searching movies...

        </div>

    `;
}

/*==================================================
                ERROR
==================================================*/

function showError() {
  searchResults.style.display = "block";

  searchResults.innerHTML = `

        <div class="search-error">

            Something went wrong.

        </div>

    `;
}

/*==================================================
                HIDE RESULTS
==================================================*/

function hideSearchResults() {
  searchResults.innerHTML = "";

  searchResults.style.display = "none";
}

/*==================================================
                CLICK OUTSIDE
==================================================*/

document.addEventListener("click", function (e) {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    hideSearchResults();
  }
});

/*==================================================
                CLEAR BUTTON
==================================================*/

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";

    hideSearchResults();
  });
}
