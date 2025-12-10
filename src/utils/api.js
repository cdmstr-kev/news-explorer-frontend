const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`HTTP ${res.status}: ${res.statusText}`));
};

export const makeRequest = (endpoint, options = {}) => {
  const url = `${newsApiBaseUrl}${endpoint}`;

  return fetch(`${newsApiBaseUrl}${endpoint}`, options).then(handleApiResponse);
};

function getNews() {
  return makeRequest(`/top-headlines?country=us&${apiKey}`);
}

export const getItems = () => {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("bookmarkedNews");
    const articles = saved ? JSON.parse(saved) : [];
    resolve(articles);
  });
};

export const saveArticle = (article) => {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("bookmarkedNews");
    const articles = saved ? JSON.parse(saved) : [];

    const articleWithId = {
      ...article,
      _id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    articles.push(articleWithId);
    localStorage.setItem("bookmarkedNews", JSON.stringify(articles));
    resolve(articleWithId);
  });
};

export const deleteArticle = (articleUrl) => {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("bookmarkedNews");
    const articles = saved ? JSON.parse(saved) : [];

    const filtered = articles.filter((article) => article.url !== articleUrl);
    localStorage.setItem("bookmarkedNews", JSON.stringify(filtered));

    resolve({ message: "Article deleted", url: articleUrl });
  });
};
