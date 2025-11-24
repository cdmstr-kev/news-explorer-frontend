import React from 'react'
import './Header.css'

const Header = () => {
  return (
      <header className="header">
        <h1 className="header__logo">NewsExplorer</h1>
        <div className={ "header__content"}>
          <a className={"header__nav "} href="https://vitejs.dev" target="_blank">HOME</a>
          <button type="button" className="header__btn">
            <a href="https://react.dev" target="_blank">Signup</a>
          </button>
        </div>
      </header>
  )
}
export default Header
