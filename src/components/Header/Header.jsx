import React from 'react'
import './Header.css'
import logoutIcon from "../../assets/logout.png"

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
      <header className="header">
        <h1 className="header__logo">NewsExplorer</h1>
        <div className={ "header__content" }>
          <a className={`header__nav ${!isLoggedIn ? "header__nav_position_right" : ""} `} href="https://vitejs.dev" target="_blank">HOME</a>
          {isLoggedIn && (
              <a className={"header__nav header__nav_position_right "} href="https://vitejs.dev" target="_blank">Saved articles</a>
          )}
          {isLoggedIn ? (
              <button type="button" className="header__btn">
                <div className={"signout-btn"}>
                  <a href="https://react.dev" target="_blank">Sign out</a>
                  <img src={logoutIcon} alt="logout-icon"/>
                </div>
              </button>

          ):(
              <button type="button" className="header__btn">
                <a href="https://react.dev" target="_blank">Sign in</a>
              </button>
          )}


        </div>
      </header>
  )
}
export default Header
