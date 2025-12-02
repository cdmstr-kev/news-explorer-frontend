import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";
import trashIcon from "../../assets/trash.png";

const SavedNews = ({ bookmarkedNews, handleDelete }) => {
  console.log(bookmarkedNews);

  return (
    <div className={"saved-news__container"}>
      <p className={"saved-news__articles"}>Saved articles</p>
      <h1 className={"saved-news__title"}>
        Elise, You have 5 saved
        <br /> articles
      </h1>
      <p className={"saved-news__subtitle"}>
        By keywords:{" "}
        <span className={"saved-news__subtitle_type_bold"}>
          Nature, Yellowstone, and 2 other
        </span>
      </p>
      <img src="" alt="" />
      <ul className={"saved-news__cardlist"}>
        {bookmarkedNews.map((article) => {
          const onhandleDelete = () => {
            handleDelete(article);
          };

          return (
            <NewsCard key={article.url} newsArticle={article}>
              <button
                onClick={onhandleDelete}
                type={"button"}
                className={"saved-news__trash"}
              ></button>
            </NewsCard>
          );
        })}
      </ul>
    </div>
  );
};
export default SavedNews;
