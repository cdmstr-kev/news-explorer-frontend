import "./NewsCard.css";
import { stripHtml } from "../../utils/helpers.js";
import { formatDate } from "../../utils/helpers.js";
import placeholder from "../../assets/placeholder.svg";

const NewsCard = ({
  newsArticle,
  isBookmarked,
  isLoggedIn,
  variant,
  onActionClick,
  tag,
}) => {
  const publishedDate = formatDate(newsArticle.date);
  const newsContent = stripHtml(newsArticle.text);

  return (
    <li className="card">
      {newsArticle.image === null || !newsArticle.image ? (
        <img className={"card__image"} src={placeholder} alt="card-image" />
      ) : (
        <img
          className={"card__image"}
          src={newsArticle.image}
          alt="card-image"
        />
      )}
      <div className="card__contents">
        <p className={"card__date"}>{publishedDate}</p>
        <h1 className={"card__title"}>
          {" "}
          <a className={"card__link"} target={"_blank"} href={newsArticle.url}>
            {newsArticle.title}
          </a>
        </h1>
        {!newsArticle.text ? (
          <p className={"card__description"}>No Content</p>
        ) : (
          <p className={"card__description"}>{newsContent}</p>
        )}
        <p className={"card__subtitle"}>{newsArticle.source}</p>
      </div>
      <div className={"card__actions"}>
        {variant === "search" ? (
          <>
            <button
              onClick={onActionClick}
              className={`card__bookmark ${isBookmarked ? "card__bookmark_type_active" : ""}`}
            ></button>

            {!isLoggedIn && (
              <span className={"card__alert card__alert_type_active"}>
                Sign in to save articles
              </span>
            )}
          </>
        ) : (
          <>
            <button
              onClick={onActionClick}
              type={"button"}
              className={"card__trash"}
            ></button>
            <h2 className={"card__tag"}>{tag}</h2>
          </>
        )}
      </div>
    </li>
  );
};
export default NewsCard;
