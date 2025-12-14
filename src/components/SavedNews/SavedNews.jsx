import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { NewsContext } from "../../contexts/NewsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";
import { getTags } from "../../utils/helpers.js";

const SavedNews = () => {
  const { currentUser, isLoggedIn } = useContext(AuthContext);
  const { bookmarkedNews, handleDeleteBookmark } = useContext(NewsContext);
  const navigate = useNavigate();

  const userBookmarks = bookmarkedNews.filter(
    (article) => article.user === currentUser.email
  );
  const allTags = getTags(userBookmarks);
  const totalArticles = userBookmarks.length;
  const userTags = allTags.uniqueTags;
  const displayedTags = allTags.displayedTags;
  const otherTags = allTags.otherTags;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={"saved-news__container"}>
      <div className={"saved-news__header"}>
        <p className={"saved-news__articles"}>Saved articles</p>
        <h1 className={"saved-news__title"}>
          {currentUser?.username}, You have {totalArticles} saved articles
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
      </div>
      <ul className={"saved-news__card-list"}>
        {userBookmarks.map((article) => {
          const onhandleDelete = () => {
            handleDeleteBookmark(article);
          };

          const formattedTag = article.tag;

          return (
            <NewsCard
              onActionClick={onhandleDelete}
              key={article.url}
              newsArticle={article}
              variant={"saved"}
              tag={formattedTag}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default SavedNews;
