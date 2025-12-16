import "./Footer.css";
import githubIcon from "../../assets/github.png";
import linkedInIcon from "../../assets/LinkedIn.png";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <p className={"footer__copyright"}>
        © 2024 Supersite, Powered by News API
      </p>
      <div className={"footer__links"}>
        <nav className="footer__nav">
          <a className={"footer__link"} href="/">
            Home
          </a>
          <a
            className={"footer__link"}
            target={"_blank"}
            href="https://tripleten.com/"
          >
            TripleTen
          </a>
        </nav>
        <div className={"footer__social"}>
          <a
            href="https://github.com/cdmstr-kev"
            target={"_blank"}
            aria-label="Visit GitHub profile"
          >
            <img src={githubIcon} alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-nedd/"
            target={"_blank"}
            aria-label="Visit LinkedIn profile"
          >
            <img src={linkedInIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
