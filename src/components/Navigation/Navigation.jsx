import logoutIcon from "../../assets/logout.png";
import logoutIconDark from "../../assets/logout-dark.png";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleSignOut, handleSignIn }) => {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  return (
    <div className={"nav"}>
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
          className={`
        nav__btn
        ${isOnSavedNews ? "nav__btn_theme_dark" : ""}
        `}
        >
          Sign out
          <img
            className={"nav__btn-icon"}
            src={isOnSavedNews ? logoutIconDark : logoutIcon}
            alt="logout-icon"
          />
        </button>
      ) : (
        <button onClick={handleSignIn} type="button" className="nav__btn">
          Sign in
        </button>
      )}
    </div>
  );
};
export default Navigation;
