import { useContext, useState } from "react";
import "./Navigation.css";
import menu from "../../assets/menu.svg";
import darkMenuIcon from "../../assets/menu-dark.svg";
import logoutIconLight from "../../assets/logout.svg";
import logoutIconDark from "../../assets/logout-light.svg";
import closeBtn from "../../assets/close.svg";
import CurrentUserContext from "../Contexts/CurrentUserContext";
import { Link, useLocation, NavLink } from "react-router-dom";

const Navigation = ({ handleSigninClick, isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedArticlesPage = location.pathname === "/saved-news";

  const handleMenuToggle = () => {
    setIsMenuOpen((open) => !open);
  };

  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/" className="navigation__logo-link">
        <p
          className={`navigation__logo${
            isSavedArticlesPage ? " navigation__logo_theme_dark" : ""
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
        <img
          src={isSavedArticlesPage ? darkMenuIcon : menu}
          alt="Open navigation menu"
        />
      </button>

      <div
        className={`navigation__overlay${
          isMenuOpen ? " navigation__overlay_open" : ""
        }`}
      >
        <div className="navigation__mobile-header">
          <h2 className="navigation__mobile-logo">NewsExplorer</h2>

          <button
            type="button"
            className="navigation__close"
            onClick={handleMenuToggle}
          >
            <img src={closeBtn} alt="Close navigation menu" />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="navigation__menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navigation__link${
                  isSavedArticlesPage ? " navigation__link_theme_dark" : ""
                }${isActive ? " navigation__link_state_active" : ""}`
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
        ) : (
          <div className="navigation-logged">
            <div className="navigation-logged__menu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navigation__link${
                    isSavedArticlesPage ? " navigation__link_theme_dark" : ""
                  }${
                    isActive
                      ? isSavedArticlesPage
                        ? " navigation__link_state_active-dark"
                        : " navigation__link_state_active"
                      : ""
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `navigation__link${
                    isSavedArticlesPage ? " navigation__link_theme_dark" : ""
                  }${
                    isActive
                      ? isSavedArticlesPage
                        ? " navigation__link_state_active-dark"
                        : " navigation__link_state_active"
                      : ""
                  }`
                }
              >
                Saved Articles
              </NavLink>

              <button
                onClick={handleLogout}
                type="button"
                className={`navigation-logged__button${
                  isSavedArticlesPage
                    ? " navigation-logged__button_theme_dark"
                    : ""
                }`}
              >
                {currentUser?.name}
                <img
                  src={isSavedArticlesPage ? logoutIconDark : logoutIconLight}
                  alt="Log out"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
