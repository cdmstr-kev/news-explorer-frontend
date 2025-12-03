import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import * as api from "../../utils/api.js";
// import { getTopHeadlines } from "../../utils/newsapi.js";
import { queryNewsAPI } from "../../utils/newsapi.js";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  });

  const [isLoading, setIsLoading] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState(3);

  const [bookmarkedNews, setBookmarkedNews] = useState(() => {
    const savedNews = localStorage.getItem("bookmarkedNews");
    return savedNews ? JSON.parse(savedNews) : [];
  });

  const [news, setNews] = useState([]);
  const [tags, setTags] = useState("Default");

  const handleSearch = (e) => {
    e.preventDefault();
    setTags(searchQuery);
    setArticlesToShow(3);

    queryNewsAPI(searchQuery)
      .then((data) => {
        setNews(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });

    setSearchQuery("");
  };

  const handleSignOut = (e) => {
    setIsLoggedIn(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleBookmark = (article) => {
    if (!isLoggedIn) return;

    const articleWithTag = { ...article, tag: tags };

    const alreadyBookmarked = bookmarkedNews.some(
      (item) => item.url === articleWithTag.url
    );

    if (alreadyBookmarked) {
      setBookmarkedNews(
        bookmarkedNews.filter((item) => item.url !== articleWithTag.url)
      );
    } else {
      setBookmarkedNews([...bookmarkedNews, articleWithTag]);
    }
  };

  const handleDeleteBookmark = (article) => {
    setBookmarkedNews(
      bookmarkedNews.filter((item) => item.url !== article.url)
    );
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarkedNews));
  }, [bookmarkedNews]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    setTags("Default");

    queryNewsAPI(searchQuery)
      .then((data) => {
        setNews(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearch}
                bookmarkedNews={bookmarkedNews}
                onCardBookmarked={handleBookmark}
                newsArray={news}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                setArticlesToShow={setArticlesToShow}
                articlesToShow={articlesToShow}
              />
            }
          />
          <Route
            path={"/saved-news"}
            element={
              <SavedNews
                searchQuery={searchQuery}
                bookmarkedNews={bookmarkedNews}
                handleDelete={handleDeleteBookmark}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
