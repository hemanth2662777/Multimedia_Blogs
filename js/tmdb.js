/* ==========================================
   TMDB CONFIGURATION
========================================== */

const TMDB_API_KEY = "8f06a8010c57209ee2cd2c75f3bdb7d9";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const TMDB_ORIGINAL_IMAGE = "https://image.tmdb.org/t/p/original";

/* ==========================================
   GENERIC API REQUEST
========================================== */

async function tmdbRequest(endpoint) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}${endpoint}${
        endpoint.includes("?") ? "&" : "?"
      }api_key=${TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("TMDB Request Failed:", error);

    return null;
  }
}

/* ==========================================
   TRENDING MOVIES
========================================== */

async function getTrendingMovies() {
  const data = await tmdbRequest("/trending/movie/week");

  return data?.results || [];
}

/* ==========================================
   POPULAR MOVIES
========================================== */

async function getPopularMovies() {
  const data = await tmdbRequest("/movie/popular");

  return data?.results || [];
}

/* ==========================================
   TOP RATED MOVIES
========================================== */

async function getTopRatedMovies() {
  const data = await tmdbRequest("/movie/top_rated");

  return data?.results || [];
}

/* ==========================================
   UPCOMING MOVIES
========================================== */

async function getUpcomingMovies() {
  const data = await tmdbRequest("/movie/upcoming");

  return data?.results || [];
}

/* ==========================================
   NOW PLAYING
========================================== */

async function getNowPlayingMovies() {
  const data = await tmdbRequest("/movie/now_playing");

  return data?.results || [];
}

/* ==========================================
   SEARCH MOVIES
========================================== */

async function searchMovies(query) {
  if (!query) return [];

  const data = await tmdbRequest(
    `/search/movie?query=${encodeURIComponent(query)}`,
  );

  return data?.results || [];
}

/* ==========================================
   MOVIE DETAILS
========================================== */

async function getMovieDetails(movieId) {
  return await tmdbRequest(`/movie/${movieId}`);
}

/* ==========================================
   MOVIE VIDEOS
========================================== */

async function getMovieVideos(movieId) {
  const data = await tmdbRequest(`/movie/${movieId}/videos`);

  return data?.results || [];
}

/* ==========================================
   MOVIE CAST
========================================== */

async function getMovieCredits(movieId) {
  return await tmdbRequest(`/movie/${movieId}/credits`);
}

/* ==========================================
   SIMILAR MOVIES
========================================== */

async function getSimilarMovies(movieId) {
  const data = await tmdbRequest(`/movie/${movieId}/similar`);

  return data?.results || [];
}

/* ==========================================
   GENRES
========================================== */

async function getGenres() {
  const data = await tmdbRequest("/genre/movie/list");

  return data?.genres || [];
}

/* ==========================================
   MOVIES BY GENRE
========================================== */

async function getMoviesByGenre(genreId) {
  const data = await tmdbRequest(`/discover/movie?with_genres=${genreId}`);

  return data?.results || [];
}

/* ==========================================
   IMAGE HELPERS
========================================== */

function getPosterUrl(path) {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Poster";
  }

  return `${TMDB_IMAGE_URL}${path}`;
}

function getBackdropUrl(path) {
  if (!path) {
    return "https://via.placeholder.com/1280x720?text=No+Image";
  }

  return `${TMDB_ORIGINAL_IMAGE}${path}`;
}

/* ==========================================
   RATING COLOR
========================================== */

function getRatingClass(rating) {
  if (rating >= 8) return "excellent";

  if (rating >= 6) return "good";

  return "average";
}

/* ==========================================
   YOUTUBE TRAILER
========================================== */

function getTrailerUrl(videos) {
  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  if (!trailer) return null;

  return `https://www.youtube.com/embed/${trailer.key}`;
}

/* ==========================================
   DATE FORMATTER
========================================== */

function formatReleaseDate(date) {
  if (!date) return "Unknown";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ==========================================
   RUNTIME FORMATTER
========================================== */

function formatRuntime(minutes) {
  if (!minutes) return "N/A";

  const hrs = Math.floor(minutes / 60);

  const mins = minutes % 60;

  return `${hrs}h ${mins}m`;
}
