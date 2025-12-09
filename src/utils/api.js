const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
};

const makeRequest = (endpoint, options = {}) => {
  const url = `${newsApiBaseUrl}${endpoint}`;

  return fetch(`${newsApiBaseUrl}${endpoint}`, options).then(handleApiResponse);
};

function getNews() {
  return makeRequest(`/top-headlines?country=us&${apiKey}`);
}

export { makeRequest, handleApiResponse };
