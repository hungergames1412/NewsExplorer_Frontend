import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/linkedin.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__social-container">
        <ul className="footer__social footer__social_type_nav">
          <li className="footer__social-item">
            <a href="/" className="footer__link">
              Home
            </a>
          </li>
          <li className="footer__social-item">
            <a
              href="https://tripleten.com"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social footer__social_type_icons">
          <li className="footer__social-item">
            <a
              href="https://github.com/hungergames1412"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub Icon"
                className="footer__icon"
              />
            </a>
          </li>
          <li className="footer__social-item">
            <a
              href="https://www.linkedin.com/in/susan-hofmann/"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn Icon"
                className="footer__icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
