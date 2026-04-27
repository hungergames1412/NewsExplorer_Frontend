import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NewsCard.css";
import deleteButtonDefault from "../../assets/delete-normal.svg";
import deleteButtonHover from "../../assets/delete-hover.svg";
import bookmarknormal from "../../assets/bookmark-normal.svg";
import bookmarkhover from "../../assets/bookmark-hover.svg";
import bookmarkactive from "../../assets/bookmark-active.svg";
import { getToken } from "../../utils/token";
import { saveArticle, deleteArticle } from "../../utils/api";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const NewsCard = ({
  article,
  isLoggedIn,
  searchQuery,
  onDeleteSuccess,
  handleSigninClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(Boolean(article._id));
  const [isBusy, setIsBusy] = useState(false);
  const location = useLocation();
  const isSaveArticles = location.pathname === "/saved-news";

  const handleSavedArticle = () => {
    if (!isLoggedIn) {
      handleSigninClick?.();
      return;
    }

    if (isSaved || isBusy) return;

    const token = getToken();
    const articleData = {
      keyword: searchQuery,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source?.name,
      link: article.url,
      image: article.urlToImage,
    };

    setIsBusy(true);
    saveArticle(articleData, token)
      .then(() => {
        setIsSaved(true);
      })
      .catch((err) => {
        console.error("Failed to save article", err);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const handleDeleteArticle = () => {
    const token = getToken();
    deleteArticle(article._id, token)
      .then(() => {
        if (onDeleteSuccess) {
          onDeleteSuccess(article._id);
        }
      })
      .catch((err) => {
        console.error("Failed to delete article", err);
      });
  };

  return (
    <article className="news-card">
      <img
        src={article.urlToImage || article.image}
        alt={article.title}
        className="news-card__image"
      />
      <div className="news-card__content">
        {isSaveArticles && <p className="news-card__keyword">{article.keyword}</p>}

        <p className="news-card__date">
          {formatDate(article.publishedAt || article.date)}
        </p>

        <h3 className="news-card__title">{article.title}</h3>

        <p className="news-card__description">
          {article.description || article.text}
        </p>

        <p className="news-card__source">{article.source?.name || article.source}</p>

        <p className="news-card__author">{article.author || "Unknown author"}</p>

        {!isSaveArticles ? (
          <button
            type="button"
            className="news-card__bookmark-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSavedArticle}
            disabled={isBusy || isSaved}
          >
            <img
              className="news-card__bookmark"
              src={
                isSaved
                  ? bookmarkactive
                  : isHovered
                    ? bookmarkhover
                    : bookmarknormal
              }
              alt="bookmark"
            />
            {isHovered && (
              <span className="news-card__hover-message">
                {isLoggedIn
                  ? "Click to save article"
                  : "Sign in to save articles"}
              </span>
            )}
          </button>
        ) : (
          <button
            type="button"
            className="news-card__bookmark-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleDeleteArticle}
          >
            <img
              className="news-card__bookmark"
              src={isHovered ? deleteButtonHover : deleteButtonDefault}
              alt="delete bookmark"
            />
            {isHovered && (
              <span className="news-card__hover-message">
                Remove saved article
              </span>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default NewsCard;