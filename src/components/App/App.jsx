import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { ModalContext } from "../../contexts/ModalContext.jsx";
import { NewsContext } from "../../contexts/NewsContext.jsx";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { saveUserToStorage } from "../../utils/helpers.js";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

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

  const {
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
  } = useContext(NewsContext);

  const handleRegistration = (newUser) => {
    saveUserToStorage(newUser);
  };

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
          <Route path={"/saved-news"} element={<SavedNews />} />
        </Routes>

        <Footer />
        <RegisterModal onUserRegister={handleRegistration} />
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
