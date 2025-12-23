import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/auth-context.js";
import { NewsContext } from "../../contexts/news-context.js";
import { ModalContext } from "../../contexts/modal-context.js";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

function App() {
  const { handleSignup, isLoggedIn } = useContext(AuthContext);
  const { setActiveModal, handleCloseActiveModal } = useContext(ModalContext);

  const handleRegistration = (newUser) => {
    handleSignup(newUser)
      .then(() => {
        handleCloseActiveModal();
        setActiveModal("confirmation-modal");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

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
  } = useContext(NewsContext);

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
              <ProtectedRoute>
                <SavedNews />
              </ProtectedRoute>
            }
          />
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
