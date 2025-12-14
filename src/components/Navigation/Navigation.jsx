import logoutIcon from "../../assets/logout.png";
import logoutIconDark from "../../assets/logout-dark.png";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import mobileMenu from "../../assets/mobile-menu.png";
import closeBtn from "../../assets/close.png";

const Navigation = ({
  isLoggedIn,
  handleSignOut,
  onSignInClick,
  handleMobileMenu,
  activeModal,
  handleCloseModal,
  currentUser,
}) => {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  const { username } = currentUser;

  console.log(typeof username);

  return (
    <nav className={"nav"}>
      <Link
        to={"/"}
        className={`
        nav__title
        ${isOnSavedNews ? "nav__title_theme_dark" : ""}
        ${!isLoggedIn ? "nav__title_position_right" : ""}
        `}
      >
        Home
      </Link>
      {isLoggedIn && (
        <Link
          to={"/saved-news"}
          className={`
          nav__title 
          nav__title_position_right
          ${isOnSavedNews ? "nav__title_theme_dark" : ""}
        `}
        >
          Saved articles
        </Link>
      )}
      {isLoggedIn ? (
        <button
          type="button"
          onClick={handleSignOut}
          className={`nav__btn ${isOnSavedNews ? "nav__btn_theme_dark" : ""}
        `}
        >
          {username}
          <img
            className={"nav__btn-icon"}
            src={isOnSavedNews ? logoutIconDark : logoutIcon}
            alt=""
          />
        </button>
      ) : (
        <button onClick={onSignInClick} type="button" className="nav__btn">
          Sign in
        </button>
      )}

      {activeModal !== "signin-modal" && activeModal !== "register-modal" && (
        <button
          onClick={handleMobileMenu}
          type="button"
          className={`nav__mobile-toggle ${isOnSavedNews ? "nav__mobile-toggle_theme_dark" : ""}`}
        >
          <img
            className="nav__mobile-toggle-icon"
            src={mobileMenu}
            alt="Open menu"
          />
        </button>
      )}

      <div
        className={`nav__mobile-menu ${
          activeModal === "header-modal" ? "nav__mobile-menu_is-open" : ""
        }`}
      >
        <button
          onClick={handleCloseModal}
          type="button"
          className="nav__mobile-close"
          aria-label="Close menu"
        >
          <img className="nav__mobile-close-icon" src={closeBtn} alt="" />
        </button>

        <div className="nav__mobile-content">
          <Link
            to="/"
            onClick={handleCloseModal}
            className={`nav__mobile-link ${isOnSavedNews ? "nav__mobile-link_theme_dark" : ""}`}
          >
            Home
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              onClick={handleCloseModal}
              className={`nav__mobile-link ${isOnSavedNews ? "nav__mobile-link_theme_dark" : ""}`}
            >
              Saved articles
            </Link>
          )}

          <button
            onClick={isLoggedIn ? handleSignOut : onSignInClick}
            type="button"
            className={`nav__mobile-btn ${isOnSavedNews ? "nav__mobile-btn_theme_dark" : ""}`}
          >
            {isLoggedIn ? (
              <>
                {isLoggedIn ? username : "Sign in"}
                {isLoggedIn && (
                  <img
                    className="nav__mobile-btn-icon"
                    src={isOnSavedNews ? logoutIconDark : logoutIcon}
                    alt=""
                  />
                )}
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
