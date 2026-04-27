import "./NewsGrid.css";
import NewsCard from "../NewsCard/NewsCard";

const NewsGrid = ({
  searchQuery,
  searchResults,
  onShowMore,
  isLoggedIn,
  moreArticles,
  handleSigninClick,
}) => {
  return (
    <section className="news-grid">
      <h2 className="news-grid__title">Search Results</h2>
      <div className="news-grid__container">
        {searchResults.map((article) => (
          <li key={article.url} className="news-grid__item">
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              searchQuery={searchQuery}
              handleSigninClick={handleSigninClick}
            />
          </li>
        ))}
      </div>

      {moreArticles && (
        <div className="show-more-container">
          <button type="button" onClick={onShowMore} className="news-grid__show-more">
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default NewsGrid;
