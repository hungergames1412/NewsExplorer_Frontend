import "./Main.css";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import NewsGrid from "../NewsGrid/NewsGrid";
import About from "../About/About";
import notfoundImg from "../../assets/not-found.svg";

const Main = ({
  isLoggedIn,
  handleLogout,
  handleSigninClick,
  onSearch,
  onShowMore,
  searchResults,
  totalResults,
  searchQuery,
  isLoading,
  searchError,
  hasSearched,
}) => {
  const moreArticles = searchResults.length < totalResults;

  return (
    <>
      <header>
        <Header
          isLoggedIn={isLoggedIn}
          onSearch={onSearch}
          handleLogout={handleLogout}
          handleSigninClick={handleSigninClick}
        />
      </header>

      <main>
        <section className="main__search-results" aria-label="Search results">
          {isLoading && <Preloader />}

          {!isLoading && searchError && (
            <div className="error-message">
              <p>{searchError}</p>
            </div>
          )}

          {!isLoading && !searchError && searchResults.length > 0 && (
            <NewsGrid
              searchResults={searchResults}
              onShowMore={onShowMore}
              isLoggedIn={isLoggedIn}
              moreArticles={moreArticles}
              searchQuery={searchQuery}
              handleSigninClick={handleSigninClick}
            />
          )}

          {!isLoading &&
            !searchError &&
            hasSearched &&
            searchResults.length === 0 && (
              <div className="no-results">
                <img src={notfoundImg} alt="Not found" />
                <h1>Nothing found</h1>
                <p>Sorry, nothing matched your search for "{searchQuery}".</p>
              </div>
            )}
        </section>

        <section className="main__about">
          <About />
        </section>
      </main>
    </>
  );
};

export default Main;
