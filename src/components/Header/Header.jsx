import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

const Header = ({ isLoggedIn, handleSignOut, handleSignIn }) => {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>
      <div className={"header__content"}>
        <Navigation
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
};
export default Header;
