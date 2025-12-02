import "./NewsCard.css";
import { stripHtml } from "../../utils/helpers.js";
import { formatDate } from "../../utils/helpers.js";
import placeholder from "../../assets/placeholder.svg";

const NewsCard = ({ children, newsArticle }) => {
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
        {children}
      </div>
    </li>
  );
};
export default NewsCard;
