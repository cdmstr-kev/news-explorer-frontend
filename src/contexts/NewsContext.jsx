import { createContext, useState, useEffect, useContext } from "react";
import { queryNewsApi } from "../utils/newsapi.js";
import { saveArticle, deleteArticle } from "../utils/api.js";
import { AuthContext } from "./AuthContext.jsx";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { currentUser, isLoggedIn } = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState("Default");
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState("");
  const [apiError, setApiError] = useState("");

  const [bookmarkedNews, setBookmarkedNews] = useState(() => {
    const savedNews = localStorage.getItem("bookmarkedNews");
    return savedNews ? JSON.parse(savedNews) : [];
  });

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
        setNews(data.articles);
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

    const articleWithTag = { ...article, tag: tags };
    const updatedArticle = { ...articleWithTag, user: currentUser.email };

    const alreadyBookmarked = bookmarkedNews.some(
      (item) => item.url === updatedArticle.url
    );

    if (alreadyBookmarked) {
      deleteArticle(updatedArticle.url)
        .then(() => {
          setBookmarkedNews(
            bookmarkedNews.filter((item) => item.url !== updatedArticle.url)
          );
        })
        .catch((err) => console.error("Failed to delete bookmark:", err));
    } else {
      saveArticle(updatedArticle)
        .then((savedArticle) => {
          setBookmarkedNews([...bookmarkedNews, savedArticle]);
        })
        .catch((err) => console.error("Failed to save bookmark:", err));
    }
  };

  const handleDeleteBookmark = (article) => {
    deleteArticle(article.url)
      .then(() => {
        setBookmarkedNews(
          bookmarkedNews.filter((item) => item.url !== article.url)
        );
      })
      .catch((err) => console.error("Failed to delete bookmark:", err));
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarkedNews));
  }, [bookmarkedNews]);

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
