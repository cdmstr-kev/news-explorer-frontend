import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";
import { getTags } from "../../utils/helpers.js";

const SavedNews = ({ bookmarkedNews, handleDelete, currentUser }) => {
  const userBookmarks = bookmarkedNews.filter(
    (article) => article.user === currentUser.email
  );
  const allTags = getTags(userBookmarks);
  const totalArticles = userBookmarks.length;
  const userTags = allTags.uniqueTags;
  const displayedTags = allTags.displayedTags;
  const otherTags = allTags.otherTags;

  return (
    <div className={"saved-news__container"}>
      <p className={"saved-news__articles"}>Saved articles</p>
      <h1 className={"saved-news__title"}>
        {currentUser.username}, You have {totalArticles} saved
        <br /> articles
      </h1>
      <p className={"saved-news__subtitle"}>
        By keywords:{" "}
        {userTags.length === 1 ? (
          userTags[0]
        ) : userTags.length === 2 ? (
          displayedTags.join(", ")
        ) : (
          <>
            {displayedTags.join(", ")} and {otherTags} other
          </>
        )}
      </p>
      <img src="" alt="" />
      <ul className={"saved-news__cardlist"}>
        {userBookmarks.map((article) => {
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
