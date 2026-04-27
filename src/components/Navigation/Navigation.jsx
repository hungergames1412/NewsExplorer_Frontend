import { useContext, useState } from "react";
import "./Navigation.css";
import menu from "../../assets/menu.svg";
import darkMenuIcon from "../../assets/menu-dark.svg";
import Logout from "../../assets/logout.svg";
import logoutDark from "../../assets/logout-light.svg";
import closeBtn from "../../assets/close.svg";
import CurrentUserContext from "../Contexts/CurrentUserContext";
import { Link, useLocation, NavLink } from "react-router-dom";

const Navigation = ({ handleSigninClick, isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSaveArticles = location.pathname === "/saved-news";
  const isHome = location.pathname === "/";

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navigation">
      <Link to="/" className="navigation__logo-link">
        <p
          className={`navigation__logo ${
            isSaveArticles ? "navigation__logo_dark" : ""
          }`}
        >
          NewsExplorer
        </p>
      </Link>

      <button
        type="button"
        className="navigation__mobile"
        onClick={handleMenuToggle}
      >
        <img src={isSaveArticles ? darkMenuIcon : menu} alt="nav menu mobile" />
      </button>

      <div
        className={`navigation__overlay ${
          isMenuOpen ? "navigation__overlay_open" : ""
        }`}
      >
        <div className="navigation__mobile-header">
          <h1 className="navigation__mobile-logo">NewsExplorer</h1>

          <button
            type="button"
            className="navigation__close"
            onClick={handleMenuToggle}
          >
            <img src={closeBtn} alt="" className="navigation__mobile-close" />
          </button>
        </div>

        {!isLoggedIn && (
          <div className="navigation__menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navigation-logged__link navigation-logged__link-home ${
                  isActive ? "navigation__link_active" : ""
                }`
              }
            >
              Home
            </NavLink>

            <button
              onClick={() => {
                handleSigninClick();
                handleMenuToggle();
              }}
              type="button"
              className="navigation__link navigation__link-signin"
            >
              Sign in
            </button>
          </div>
        )}

        {isLoggedIn && (
          <div className="navigation-logged">
            <div className="navigation-logged__menu">
              <Link
                to="/"
                className={`navigation-logged__link navigation-logged__link-home ${
                  isHome
                    ? "navigation__link-active"
                    : "navigation-logged__link_dark"
                }`}
              >
                Home
              </Link>

              <Link
                to="/saved-news"
                className={`navigation-logged__link navigation-logged__article-save ${
                  isSaveArticles
                    ? "navigation-logged__link_dark navigation__link-active_black"
                    : ""
                }`}
              >
                Saved Articles
              </Link>

              <button
                onClick={handleLogout}
                type="button"
                className={`navigation-logged__button navigation-logged_link-logout ${
                  isSaveArticles ? "navigation-logged__button_dark" : ""
                }`}
              >
                {currentUser?.name}
                <img
                  src={isSaveArticles ? logoutDark : Logout}
                  alt="logout logo"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
