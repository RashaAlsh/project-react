const api_key = import.meta.env.VITE_API_KEY;

const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: api_key,
  image: (posterPath) => `https://image.tmdb.org/t/p/w500/${posterPath}`,
};

export default apiConfig;