import { useState, useEffect, useContext } from "react";
import { queryNewsApi } from "../utils/newsapi.js";
import { getArticles, saveArticle, deleteArticle } from "../utils/api.js";
import { AuthContext } from "./auth-context.js";
import { NewsContext } from "./news-context.js";

export const NewsProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState("Default");
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [apiError, setApiError] = useState("");
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      getArticles()
        .then((articles) => {
          setBookmarkedNews(articles);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load bookmarked news:", err);
          setIsLoading(false);
        });
    } else {
      setBookmarkedNews([]);
    }
  }, [isLoggedIn]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery || searchQuery.trim() === "") {
      setSearchError("Please enter a keyword to search.");
      return;
    }

    setSearchError("");
    setApiError("");
    setIsLoading(true);
    setTags(searchQuery);
    setArticlesToShow(3);

    queryNewsApi(searchQuery)
      .then((data) => {
        const transformedArticles = data.articles.map((article) => ({
          ...article,
          date: article.publishedAt,
          text: article.description || article.content,
          image: article.urlToImage,
          source: article.source?.name || "Unknown",
          url: article.url,
        }));
        setNews(transformedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
        setApiError(
          "Sorry, something went wrong during the request. Please try again later."
        );
        setIsLoading(false);
      });
  };

  const handleBookmark = (article) => {
    if (!isLoggedIn) return;

    const existingArticle = bookmarkedNews.find(
      (item) => item.link === article.url
    );

    if (existingArticle) {
      deleteArticle(existingArticle._id)
        .then(() => {
          setBookmarkedNews(
            bookmarkedNews.filter((item) => item._id !== existingArticle._id)
          );
        })
        .catch((err) => console.error("Failed to delete bookmark:", err));
    } else {
      const articleToSave = { ...article, tag: tags };

      saveArticle(articleToSave)
        .then((savedArticle) => {
          const mappedArticle = {
            ...savedArticle,
            tag: savedArticle.keyword,
            url: savedArticle.link,
          };
          setBookmarkedNews([mappedArticle, ...bookmarkedNews]);
        })
        .catch((err) => console.error("Failed to save bookmark:", err));
    }
  };

  const handleDeleteBookmark = (article) => {
    deleteArticle(article._id)
      .then(() => {
        setBookmarkedNews(
          bookmarkedNews.filter((item) => item._id !== article._id)
        );
      })
      .catch((err) => console.error("Failed to delete bookmark: ", err));
  };

  const value = {
    searchQuery,
    setSearchQuery,
    news,
    tags,
    articlesToShow,
    setArticlesToShow,
    isLoading,
    searchError,
    apiError,
    bookmarkedNews,
    handleSearch,
    handleBookmark,
    handleDeleteBookmark,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
