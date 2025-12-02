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

export const queryNewsAPI = async (query) => {
  try {
    const endpoint = query
      ? `${baseUrl}/everything?q=${encodeURIComponent(query)}`
      : `${baseUrl}/top-headlines?country=us`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const news = await response.json();

    return news;
  } catch (err) {
    console.error(err);
  }
};
