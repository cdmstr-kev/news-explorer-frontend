import './Header.css'
import Navigation from "../Navigation/Navigation.jsx";


const Header = ({ isLoggedIn }) => {
  return (
      <header className="header">
        <h1 className="header__logo">NewsExplorer</h1>
        <div className={ "header__content" }>
          <Navigation
          isLoggedIn={isLoggedIn}
          />
        </div>
      </header>
  )
}
export default Header
