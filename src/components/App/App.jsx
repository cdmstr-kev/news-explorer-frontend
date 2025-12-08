import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// TODO might need to protect the saved news page
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { queryNewsAPI } from "../../utils/newsapi.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import {
  validateUserCredentials,
  checkUserInStorage,
  getUsersFromStorage,
  saveUserToStorage,
} from "../../utils/helpers.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [news, setNews] = useState([]);
  const [tags, setTags] = useState("Default");
  const [activeModal, setActiveModal] = useState("");
  const [loginErrors, setLoginErrors] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || null);
  });
  const [bookmarkedNews, setBookmarkedNews] = useState(() => {
    const savedNews = localStorage.getItem("bookmarkedNews");
    return savedNews ? JSON.parse(savedNews) : [];
  });
  const navigate = useNavigate();

  const handleCloseActiveModal = () => {
    setLoginErrors("");
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
    setTags(searchQuery);

    setArticlesToShow(3);

    queryNewsAPI(searchQuery)
      .then((data) => {
        setNews(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
      });
  };

  const handleSignOut = (e) => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSignIn = (user) => {
    setIsLoading(true);
    const { email, password } = user;

    const users = getUsersFromStorage();
    const getUser = users.find((user) => user.email === email);

    const userExists = validateUserCredentials(email, password);

    if (!userExists) {
      setLoginErrors("Invalid credentials. Please try again.");
      setIsLoading(true);
      return console.error("User doesn't exist in storage: ", user);
    }

    setLoginErrors("");
    setCurrentUser(getUser);
    setIsLoggedIn(true);
    setIsLoading(false);
    handleCloseActiveModal();
  };

  const handleOpenSignIn = () => {
    setActiveModal("signin-modal");
  };

  const handleBookmark = (article) => {
    if (!isLoggedIn) return;

    const articleWithTag = { ...article, tag: tags };
    const updatedArticle = { ...articleWithTag, user: currentUser.email };

    const alreadyBookmarked = bookmarkedNews.some(
      (item) => item.url === updatedArticle.url
    );

    if (alreadyBookmarked) {
      setBookmarkedNews(
        bookmarkedNews.filter((item) => item.url !== updatedArticle.url)
      );
    } else {
      setBookmarkedNews([...bookmarkedNews, updatedArticle]);
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
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

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
          setActiveModal={setActiveModal}
        />
        <LoginModal
          isOpen={activeModal === "signin-modal"}
          handleCloseActiveModal={handleCloseActiveModal}
          handleSubmit={handleSignIn}
          handleOpenRegister={handleOpenRegister}
          loginError={loginErrors}
        />
        <ConfirmationModal
          isOpen={activeModal === "confirmation-modal"}
          handleCloseActiveModal={handleCloseActiveModal}
          handleOpenSignIn={handleOpenSignIn}
          message={"Registration successfully completed!"}
          buttonText={"Sign in"}
        />
      </div>
    </div>
  );
}

export default App;
