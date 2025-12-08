import { handleApiResponse } from "./api.js";
// TODO: check error handling, refactor to use promises
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-Api-Key": API_KEY,
  },
};

export const queryNewsAPI = (query) => {
  const endpoint = `${baseUrl}/everything?q=${encodeURIComponent(query)}`;

  return fetch(endpoint, API_OPTIONS).then(handleApiResponse);
};
