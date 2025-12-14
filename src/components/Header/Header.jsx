import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext.jsx";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import { useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, handleSignOut, currentUser }) => {
  const { activeModal } = useContext(ModalContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header ${isOnSavedNews ? "header_theme_dark" : ""}`}>
      <h1
        className={`header__logo ${activeModal === "header-modal" ? "header__logo-white" : ""}`}
      >
        NewsExplorer
      </h1>
      <div className={"header__content"}>
        <Navigation
          isLoggedIn={isLoggedIn}
          handleSignOut={handleSignOut}
          currentUser={currentUser}
        />
      </div>
    </header>
  );
};
export default Header;
