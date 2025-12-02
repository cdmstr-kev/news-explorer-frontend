const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
};

const makeRequest = (endpoint, options = {}) => {
  const url = `${baseUrl}${endpoint}`;

  return fetch(`${baseUrl}${endpoint}`, options).then(handleApiResponse);
};

function getNews() {
  return makeRequest(`/top-headlines?country=us&${apiKey}`);
}

export { makeRequest, handleApiResponse };
