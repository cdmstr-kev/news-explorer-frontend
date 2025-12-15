import { handleApiResponse } from "./api.js";
import {
  NEWS_API_KEY,
  NEWS_API_BASE_URL_DEV,
  NEWS_API_BASE_URL_PROD,
} from "./constants.js";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || NEWS_API_KEY;

const newsApiBaseUrl = import.meta.env.PROD
  ? NEWS_API_BASE_URL_PROD
  : NEWS_API_BASE_URL_DEV;

export const queryNewsApi = (query) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const endpoint = `${newsApiBaseUrl}?q=${encodeURIComponent(query)}&from=${formatDate(sevenDaysAgo)}&to=${formatDate(today)}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(endpoint).then(handleApiResponse);
};
