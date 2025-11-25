import React from 'react'
import "./Footer.css"
import githubIcon from "../../assets/github.png"
import linkedInIcon from "../../assets/LinkedIn.png"

const Footer = () => {
  return (
      <footer className={"footer"}>
        <p className={"footer__copyright"}>© 2024 Supersite, Powered by News API</p>
        <nav className="footer__nav">
          <a className={"footer__link"} href="/">Home</a>
          <a className={"footer__link"} href="/about">TripleTen</a>
        </nav>
        <div className={"footer__social"}>
          <img src={githubIcon} alt="Github Icon"/>
          <img src={linkedInIcon} alt="LinkedIn"/>
        </div>
      </footer>
  )
}
export default Footer
