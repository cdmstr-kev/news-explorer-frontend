import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";
import { getTags } from "../../utils/helpers.js";

const SavedNews = ({ bookmarkedNews, handleDelete }) => {
  const totalArticles = bookmarkedNews.length;

  const allTags = getTags(bookmarkedNews);
  const displayedTags = allTags.displayedTags.map((tag) => tag + ", ").join("");
  const otherTags = allTags.otherTags;

  return (
    <div className={"saved-news__container"}>
      <p className={"saved-news__articles"}>Saved articles</p>
      <h1 className={"saved-news__title"}>
        Elise, You have {totalArticles} saved
        <br /> articles
      </h1>
      <p className={"saved-news__subtitle"}>
        By keywords:{" "}
        <span className={"saved-news__subtitle_type_bold"}>
          {displayedTags}
          and {otherTags} other
        </span>
      </p>
      <img src="" alt="" />
      <ul className={"saved-news__cardlist"}>
        {bookmarkedNews.map((article) => {
          const onhandleDelete = () => {
            handleDelete(article);
          };

          const formattedTag = article.tag;

          return (
            <NewsCard key={article.url} newsArticle={article}>
              <button
                onClick={onhandleDelete}
                type={"button"}
                className={"saved-news__trash"}
              ></button>
              <h2 className={"saved-news__tag"}>{formattedTag}</h2>
            </NewsCard>
          );
        })}
      </ul>
    </div>
  );
};
export default SavedNews;
