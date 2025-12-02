import NewsCard from "../NewsCard/NewsCard.jsx";

const SavedNews = () => {
  return (
    <div className={"saved-news__container"}>
      <p className={"saved-news__articles"}>Saved articles</p>
      <h1 className={"saved-news__title"}>Elise, You have 5 saved articles</h1>
      <p className={"saved-news__subtitle"}>
        By keywords: Nature, Yellowstone, and 2 other
      </p>
      <img src="" alt="" />
      <section className={"saved-news__cardlist"}></section>
    </div>
  );
};
export default SavedNews;
