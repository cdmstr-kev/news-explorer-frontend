import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { queryNewsAPI } from "../../utils/newsapi.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import {
  checkUserInStorage,
  getUsersFromStorage,
  saveUserToStorage,
} from "../../utils/helpers.js";

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

  const [activeModal, setActiveModal] = useState("");

  const handleCloseActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = (newUser) => {
    saveUserToStorage(newUser);
  };

  const handleOpenRegister = () => {
    setActiveModal("register-modal");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      setSearchQuery("Default");
    } else {
      setTags(searchQuery);
    }

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

  const handleSignIn = (user) => {
    const { email } = user;
    console.log(email);

    if (!checkUserInStorage(user.email)) {
      return console.error("User doesn't exist in storage: ", user);
    }

    setIsLoggedIn(true);
    handleCloseActiveModal();
  };

  const handleOpenSignIn = () => {
    console.log("Sign in clicked");
    setActiveModal("signin-modal");
    console.log(activeModal);
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
          onSignInClick={handleOpenSignIn}
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
        <RegisterModal
          isOpen={activeModal === "register-modal"}
          handleCloseActiveModal={handleCloseActiveModal}
          handleOpenSignIn={handleOpenSignIn}
          handleSignIn={handleSignIn}
          onUserRegister={handleRegistration}
          setIsLoading={setIsLoading}
          activeModal={activeModal}
        />
        <LoginModal
          isOpen={activeModal === "signin-modal"}
          handleCloseActiveModal={handleCloseActiveModal}
          handleSubmit={handleSignIn}
          isLoading={isLoading}
          handleOpenRegister={handleOpenRegister}
        />
      </div>
    </div>
  );
}

export default App;
