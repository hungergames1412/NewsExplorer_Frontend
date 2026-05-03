import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessRegisterModal from "../SuccessRegisterModal/SuccessRegisterModal";
import { signin, signup, checkToken, fetchNews } from "../../utils/api";
import { setToken, getToken, removeToken } from "../../utils/token";

import Footer from "../Footer/Footer";
import SaveArticles from "../SaveArticles/SaveArticles";
import Main from "../Main/Main";
import CurrentUserContext from "../Contexts/CurrentUserContext";

const App = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const onSignup = (data) => {
    return signup(data);
  };

  const handleSignin = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const data = await signin({ email, password });
    if (!data.token) {
      throw new Error("No token returned from sign in.");
    }

    setToken(data.token);

    try {
      const user = await checkToken(data.token);
      setIsLoggedIn(true);
      setCurrentUser(user);
      return user;
    } catch (err) {
      removeToken();
      setIsLoggedIn(false);
      setCurrentUser(null);
      throw err;
    }
  };

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setHasSearched(true);
    setSearchQuery(trimmedQuery);
    setIsLoading(true);
    setSearchError("");
    setArticles([]);
    setVisibleCount(3);

    try {
      const fetchedArticles = await fetchNews(trimmedQuery);
      setArticles(fetchedArticles);
    } catch (err) {
      setArticles([]);
      setSearchError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((count) => count + 3);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSigninClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setActiveModal("signin");
    }
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };

  const handleSuccessRegistration = () => {
    setActiveModal("success");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        removeToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <main className="page__main">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  handleSigninClick={handleSigninClick}
                  onSearch={handleSearch}
                  onShowMore={handleShowMore}
                  searchResults={articles.slice(0, visibleCount)}
                  totalResults={articles.length}
                  searchQuery={searchQuery}
                  isLoading={isLoading}
                  searchError={searchError}
                  hasSearched={hasSearched}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <SaveArticles
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                />
              }
            />
          </Routes>
        </main>

        <div className="page__modals">
          <RegisterModal
            isOpen={activeModal === "signup"}
            handleCloseClick={handleCloseClick}
            handleSigninClick={handleSigninClick}
            handleSuccessRegistration={handleSuccessRegistration}
            onSignup={onSignup}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            handleCloseClick={closeActiveModal}
            handleSignupClick={handleSignupClick}
            handleSignin={handleSignin}
          />
          <SuccessRegisterModal
            isOpen={activeModal === "success"}
            handleSigninClick={handleSigninClick}
            handleCloseClick={handleCloseClick}
          />
        </div>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
