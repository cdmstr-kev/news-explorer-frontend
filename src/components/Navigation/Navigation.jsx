import logoutIcon from "../../assets/logout.png";
import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleSignOut, handleSignIn }) => {
  return (
    <div className={"nav"}>
      <Link
        to={"/"}
        className={`nav__title ${!isLoggedIn ? "nav__title_position_right" : ""} `}
      >
        HOME
      </Link>
      {isLoggedIn && (
        <Link
          to={"/savedNews"}
          className={"nav__title nav__title_position_right "}
        >
          Saved articles
        </Link>
      )}
      {isLoggedIn ? (
        <button type="button" onClick={handleSignOut} className="nav__btn">
          Sign out
          <img className={"nav__btn-icon"} src={logoutIcon} alt="logout-icon" />
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
