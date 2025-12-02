import "./NewsCard.css";
import { stripHtml } from "../../utils/helpers.js";
import { formatDate } from "../../utils/helpers.js";
import placeholder from "../../assets/placeholder.svg";

const NewsCard = ({
  newsArticle,
  onCardBookmarked = () => {},
  bookmarkedNews = [],
  isLoggedIn = false,
}) => {
  const isThisArticleBookmarked = bookmarkedNews?.includes(newsArticle.url);

  const onToggleBookmark = () => {
    onCardBookmarked(newsArticle.url);
  };

  const publishedDate = formatDate(newsArticle.publishedAt);
  const newsContent = stripHtml(newsArticle.description);

  return (
    <li className="card">
      {newsArticle.urlToImage === null ? (
        <img className={"card__image"} src={placeholder} alt="card-image" />
      ) : (
        <img
          className={"card__image"}
          src={newsArticle.urlToImage}
          alt="card-image"
        />
      )}
      <div className="card__contents">
        <p className={"card__date"}>{publishedDate}</p>
        <h1 className={"card__title"}>
          {" "}
          <a
            className={"main__news-url"}
            target={"_blank"}
            href={newsArticle.url}
          >
            {newsArticle.title}
          </a>
        </h1>
        {newsArticle.content === null ? (
          <p className={"card__description"}>No Content</p>
        ) : (
          <p className={"card__description"}>{newsContent}</p>
        )}
        <p className={"card__subtitle"}>{newsArticle.source.name}</p>
        <div className={"card__actions"}>
          <button
            onClick={onToggleBookmark}
            className={`card__bookmark ${isThisArticleBookmarked ? "card__bookmark_type_active" : ""}`}
          ></button>
          {!isLoggedIn && (
            <span className={"card__alert card__alert_type_active"}>
              Sign in to save articles
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
export default NewsCard;
