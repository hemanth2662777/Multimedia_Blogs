/* ==========================================
   HOME PAGE INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", initializeHomePage);

async function initializeHomePage() {
  try {
    showHomeLoader();

    const [trendingMovies, popularMovies, upcomingMovies] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getUpcomingMovies(),
    ]);

    renderHomeSection(trendingMovies.slice(0, 8), "trendingMovies");

    renderHomeSection(popularMovies.slice(0, 8), "popularMovies");

    renderHomeSection(upcomingMovies.slice(0, 8), "upcomingMovies");

    initializeCounters();

    initializeNewsletter();
  } catch (error) {
    console.error("Homepage Error:", error);

    showHomeError();
  }

  hideHomeLoader();
}

/* ==========================================
   RENDER HOME MOVIES
========================================== */

function renderHomeSection(movies, containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    container.innerHTML += `
      <div class="movie-card fade-up">

        <img
          src="${getPosterUrl(movie.poster_path)}"
          alt="${movie.title}"
          loading="lazy"
        >

        <div class="movie-info">

          <h3>${movie.title}</h3>

          <p>⭐ ${movie.vote_average.toFixed(1)}</p>

          <p>
            ${movie.release_date ? movie.release_date.substring(0, 4) : "Unknown"}
          </p>

          <button
            class="primary-btn home-trailer-btn"
            data-id="${movie.id}"
          >
            ▶ Watch Trailer
          </button>

        </div>

      </div>
    `;
  });

  attachTrailerEvents();
}

/* ==========================================
   TRAILER EVENTS
========================================== */

function attachTrailerEvents() {
  document.querySelectorAll(".home-trailer-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const movieId = e.target.dataset.id;

      const videos = await getMovieVideos(movieId);
      const trailer = getTrailerUrl(videos);

      if (trailer) {
        window.open(trailer, "_blank");
      } else {
        alert("Trailer not available");
      }
    });
  });
}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);

    let value = 0;

    const increment = target / 100;

    const updateCounter = () => {
      if (value < target) {
        value += increment;

        counter.innerText = Math.floor(value);

        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

/* ==========================================
   NEWSLETTER
========================================== */

function initializeNewsletter() {
  const form = document.getElementById("newsletterForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    if (!email || !email.includes("@")) {
      alert("Enter valid email.");
      return;
    }

    localStorage.setItem("newsletterEmail", email);

    alert("Subscription successful.");

    form.reset();
  });
}

/* ==========================================
   LOADER
========================================== */

function showHomeLoader() {
  const loader = document.getElementById("loader");

  if (loader) loader.style.display = "flex";
}

function hideHomeLoader() {
  const loader = document.getElementById("loader");

  if (loader) loader.style.display = "none";
}

/* ==========================================
   ERROR STATE
========================================== */

function showHomeError() {
  const sections = document.querySelectorAll(".movie-grid");

  sections.forEach((section) => {
    section.innerHTML = `
        <div class="empty-state">

            <h2>
                Unable to load content
            </h2>

            <p>
                Please refresh and try again.
            </p>

        </div>
        `;
  });
}

function renderMoviesPage(movies, containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    container.innerHTML += `
      <div class="movie-card fade-up">

        <img src="${getPosterUrl(movie.poster_path)}">

        <div class="movie-info">

          <h3>${movie.title}</h3>

          <p>${movie.overview?.substring(0, 100) || ""}...</p>

          <button class="primary-btn watch-btn" data-title="${movie.title}">
            ▶ Watch Full Movie
          </button>

        </div>

      </div>
    `;
  });

  attachWatchEvents();
}

function attachWatchEvents() {
  document.querySelectorAll(".watch-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const title = e.target.dataset.title;

      // YouTube full movie search
      const url = `https://www.youtube.com/results?search_query=${title}+full+movie`;

      window.open(url, "_blank");
    });
  });
}
