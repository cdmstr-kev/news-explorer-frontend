import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { ModalContext } from "../../contexts/ModalContext.jsx";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { queryNewsApi } from "../../utils/newsapi.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { saveUserToStorage } from "../../utils/helpers.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import { authorize } from "../../utils/auth.js";
import { saveArticle, deleteArticle } from "../../utils/api.js";

function App() {
  const {
    activeModal,
    setActiveModal,
    handleCloseActiveModal,
    handleOpenRegister,
    handleOpenSignIn,
    handleMobileMenuClick,
  } = useContext(ModalContext);

  const { isLoggedIn, currentUser, loginErrors, handleSignIn, handleSignOut } =
    useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState("Default");
  const [searchError, setSearchError] = useState("");
  // const [activeModal, setActiveModal] = useState("");
  // const [loginErrors, setLoginErrors] = useState("");
  const [apiError, setApiError] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   return JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  // });
  // const [currentUser, setCurrentUser] = useState(() => {
  //   return JSON.parse(localStorage.getItem("currentUser") || null);
  // });
  const [bookmarkedNews, setBookmarkedNews] = useState(() => {
    const savedNews = localStorage.getItem("bookmarkedNews");
    return savedNews ? JSON.parse(savedNews) : [];
  });
  const navigate = useNavigate();

  // const handleCloseActiveModal = () => {
  //   setLoginErrors("");
  //   setActiveModal("");
  // };
  //
  const handleRegistration = (newUser) => {
    saveUserToStorage(newUser);
  };
  //
  // const handleOpenRegister = () => {
  //   setActiveModal("register-modal");
  // };
  //
  // const handleMobileMenuClick = () => {
  //   setActiveModal("header-modal");
  //   console.log(activeModal);
  // };

  // const handleOpenSignIn = () => {
  //   setActiveModal("signin-modal");
  // };

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

  // const handleSignOut = () => {
  //   setIsLoggedIn(false);
  //   navigate("/");
  // };
  //
  // const handleSignIn = (user) => {
  //   setIsLoading(true);
  //   const { email, password } = user;
  //
  //   authorize(email, password)
  //     .then((res) => {
  //       setCurrentUser(res.user);
  //       setIsLoggedIn(true);
  //       setLoginErrors("");
  //       setIsLoading(false);
  //       handleCloseActiveModal();
  //     })
  //     .catch((err) => {
  //       console.error("Failed to authorize user:", err);
  //       setLoginErrors("Invalid credentials. Please try again.");
  //       setIsLoading(false);
  //     });
  // };

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

  // useEffect(() => {
  //   localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarkedNews));
  // }, [bookmarkedNews]);
  //
  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  // }, [isLoggedIn]);
  //
  // useEffect(() => {
  //   localStorage.setItem("currentUser", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                tags={tags}
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
                searchError={searchError}
                apiError={apiError}
              />
            }
          />
          <Route
            path={"/saved-news"}
            element={
              <SavedNews
                bookmarkedNews={bookmarkedNews}
                handleDelete={handleDeleteBookmark}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>

        <Footer />
        <RegisterModal
          onUserRegister={handleRegistration}
          setIsLoading={setIsLoading}
        />
        <LoginModal />
        <ConfirmationModal
          message={"Registration successfully completed!"}
          buttonText={"Sign in"}
        />
      </div>
    </div>
  );
}

export default App;
