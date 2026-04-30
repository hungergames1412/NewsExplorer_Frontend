import { useContext, useState, useEffect, useMemo } from "react";
import CurrentUserContext from "../Contexts/CurrentUserContext";
import NewsCard from "../NewsCard/NewsCard";
import Navigation from "../Navigation/Navigation";
import "./SaveArticles.css";
import { getUserArticles } from "../../utils/api";
import { getToken } from "../../utils/token";

const SaveArticles = ({ isLoggedIn, handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const [userArticles, setUserArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setUserArticles([]);
      setIsLoading(false);
      return;
    }

    getUserArticles(token)
      .then((data) => {
        setUserArticles(data);
      })
      .catch((err) => {
        console.error("Failed to fetch saved articles:", err);
        setUserArticles([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteSuccess = (id) => {
    setUserArticles((prev) => prev.filter((article) => article._id !== id));
  };

  const keywordSummary = useMemo(() => {
    const counts = userArticles.reduce((acc, article) => {
      const k = (article.keyword || "").trim();
      if (!k) return acc;
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

    const uniqueKeywords = Object.keys(counts);
    uniqueKeywords.sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));

    const topTwo = uniqueKeywords.slice(0, 2);
    const othersCount = uniqueKeywords.length - topTwo.length;

    return { topTwo, othersCount };
  }, [userArticles]);

  return (
    <>
      <header className="saved-news-header">
        <div className="saved-news-header_nav">
          <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>

        <div className="saved-news-header_hero">
          <h2 className="saved-articles__heading">Saved articles</h2>

          <h1 className="saved-articles__header">
            {currentUser?.name || "User"}, you have {userArticles.length} saved
            articles
          </h1>

          <p className="saved-articles__keywords">
            By keywords:{" "}
            {keywordSummary.topTwo.length > 0 && (
              <>
                <strong className="saved-articles__keyword">
                  {keywordSummary.topTwo[0]}
                </strong>
                {keywordSummary.topTwo[1] && (
                  <>
                    {", "}
                    <strong className="saved-articles__keyword">
                      {keywordSummary.topTwo[1]}
                    </strong>
                  </>
                )}
                {keywordSummary.othersCount > 0 && (
                  <>
                    {" "}
                    and{" "}
                    <strong className="saved-articles__keyword">
                      {keywordSummary.othersCount} other
                      {keywordSummary.othersCount > 1 ? "s" : ""}
                    </strong>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </header>

      <section className="saved-articles">
        {isLoading ? (
          <p className="saved-articles__status">Loading saved articles...</p>
        ) : (
          <div className="news-card-container">
            {userArticles.map((article) => (
              <NewsCard
                key={article._id}
                article={article}
                isLoggedIn={isLoggedIn}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SaveArticles;
