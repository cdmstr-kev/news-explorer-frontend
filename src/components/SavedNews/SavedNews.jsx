import NewsCard from "../NewsCard/NewsCard.jsx";
import "./SavedNews.css";

const SavedNews = () => {
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
      <section className={"saved-news__cardlist"}>
        <p>The cards go in here</p>
      </section>
    </div>
  );
};
export default SavedNews;
