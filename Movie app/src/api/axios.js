import axios from "axios";
import apiConfig from "./apiConfig";
import Pagination from "../components/Pagination";

const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  params: {
    api_key: apiConfig.apiKey,
    include_adult: false,
    include_video: true,
    language: "en-US",
    sort_by: "popularity.desc",
  },
});

export default axiosInstance;