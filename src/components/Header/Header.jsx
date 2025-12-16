import { useContext } from "react";
import { ModalContext } from "../../contexts/modal-context.js";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { activeModal } = useContext(ModalContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  return (
    <header className={`header ${isOnSavedNews ? "header_theme_dark" : ""}`}>
      <h1
        className={`header__logo ${activeModal === "header-modal" ? "header__logo_color_white" : ""}`}
      >
        NewsExplorer
      </h1>
      <div className={"header__content"}>
        <Navigation />
      </div>
    </header>
  );
};
export default Header;
