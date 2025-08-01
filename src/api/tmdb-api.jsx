const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
export const fetchTrendingMoviesFromTMDB = async (query = "") => {
  const endpoint = query
    ? `${API_BASE_URL}/search/multi?query=${encodeURIComponent(
        query
      )}&language=en-US`
    : `${API_BASE_URL}/trending/all/day?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");

  const data = await response.json();

  // console.log(data.results);

  // Filter only movies and TV shows
  return (data.results || []).filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};
const genreMap = {
  action: 28,
  comedy: 35,
  drama: 18,
  thriller: 53,
  "sci-fi": 878,
};

export const fetchMoviesFromTMDB = async (query = "", page = 1) => {
  const genreId = genreMap[query.toLowerCase()];

  const endpoint = genreId
    ? `${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&language=en-US`
    : query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}&language=en-US`
    : `${API_BASE_URL}/discover/movie?language=en-US&page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");

  const data = await response.json();
  return {
    results: data.results || [],
    totalPages: data.total_pages || 1,
  };
};
const tvGenreMap = {
  action: 10759,
  comedy: 35,
  drama: 18,
  thriller: 9648,
  "sci-fi": 10765,
};
export const fetchSeriesFromTMDB = async (query = "", page = 1) => {
  const genreId = tvGenreMap[query.toLowerCase()];

  const endpoint = genreId
    ? `${API_BASE_URL}/discover/tv?with_genres=${genreId}&page=${page}&language=en-US`
    : query
    ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(
        query
      )}&page=${page}&language=en-US`
    : `${API_BASE_URL}/discover/tv?language=en-US&page=${page}`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch series");

  const data = await response.json();

  return {
    results: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

export const fetchNowPlayingFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/movie/now_playing?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchPopularFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/movie/popular?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchTopRatedFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/movie/top_rated?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchUpcomingFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/movie/upcoming?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchPopularSeriesFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/tv/popular?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchTopRatedSeriesFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/tv/top_rated?language=en-US&page=1`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};
export const fetchTrendingSeriesFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/trending/tv/day?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};
export const fetchAiringTodaySeriesFromTMDB = async () => {
  const endpoint = `${API_BASE_URL}/tv/airing_today?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();

  return data.results || [];
};

export const fetchMovieDetailsFromTMDB = async ({ params }) => {
  // console.log(params);

  const id = params.id;

  const endpoint = `${API_BASE_URL}/movie/${id}?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  // console.log(data);
  return data;
};

// Get cast & crew
export const fetchMovieCredits = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}/credits?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
};

// Get trailers/videos
export const fetchMovieVideos = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}/videos?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

// Get similar movies
export const fetchSimilarMovies = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}/similar?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
};

// Get reviews
export const fetchMovieReviews = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}/reviews?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

export const fetchSeriesDetailsFromTMDB = async ({ params }) => {
  console.log(params);

  const id = params.id;

  const endpoint = `${API_BASE_URL}/tv/${id}?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch series");
  const data = await response.json();
  // console.log(data);
  return data;
};

export const fetchSeriesDetails = async (id) => {
  const endpoint = `${API_BASE_URL}/tv/${id}?language=en-US`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch series");
  const data = await response.json();
  // console.log(data);
  return data;
};

// Get cast & crew
export const fetchSeriesCredits = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${id}/credits?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
};

// Get trailers/videos
export const fetchSeriesVideos = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${id}/videos?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

// Get Series Episodes
export const fetchSeriesEpisodes = async (id, seasonNumber) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${id}/season/${seasonNumber}?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

// Get similar Series
export const fetchSimilarSeries = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${id}/similar?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch similar Series");
  return res.json();
};

// Get reviews
export const fetchSeriesReviews = async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${id}/reviews?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};
