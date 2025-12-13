import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import { useLocation } from "react-router-dom";

const Header = ({
  isLoggedIn,
  handleSignOut,
  handleSignIn,
  onSignInClick,
  handleMobileMenu,
  activeModal,
  handleCloseModal,
}) => {
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
          handleSignIn={handleSignIn}
          onSignInClick={onSignInClick}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          activeModal={activeModal}
          handleMobileMenu={handleMobileMenu}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </header>
  );
};
export default Header;
