import { handleApiResponse } from "./api.js";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const queryNewsApi = (query) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const endpoint = `${newsApiBaseUrl}?q=${encodeURIComponent(query)}&from=${formatDate(sevenDaysAgo)}&to=${formatDate(today)}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(endpoint).then(handleApiResponse);
};
