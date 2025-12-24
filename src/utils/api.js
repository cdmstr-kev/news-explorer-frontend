const backendBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.newsexplorer.cdmstr.com"
    : import.meta.env.VITE_BACKEND_API_URL;

export const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((data) => {
      const error = new Error(
        data.message || `HTTP ${res.status}: ${res.statusText}`
      );
      error.status = res.status;
      return Promise.reject(error);
    })
    .catch((parseError) => {
      const error = new Error(`HTTP ${res.status}: ${res.statusText}`);
      error.status = res.status;
      return Promise.reject(error);
    });
};

const makeBackendRequest = (endpoint, options = {}) => {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${backendBaseUrl}${endpoint}`, { ...options, headers }).then(
    handleApiResponse
  );
};

export const getArticles = () => {
  return makeBackendRequest("/articles").then((articles) => {
    return articles.map((article) => ({
      ...article,
      tag: article.keyword,
      url: article.link,
    }));
  });
};

export const saveArticle = (article) => {
  return makeBackendRequest("/articles", {
    method: "POST",
    body: JSON.stringify({
      keyword: article.tag,
      title: article.title,
      text: article.description || article.content,
      date: article.publishedAt,
      source: article.source?.name || "Unknown",
      link: article.url,
      image: article.urlToImage,
    }),
  });
};

export const deleteArticle = (articleId) => {
  return makeBackendRequest(`/articles/${articleId}`, { method: "DELETE" });
};
