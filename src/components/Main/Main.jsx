import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import hero from "../../assets/hero.png";
import NewsCard from "../NewsCard/NewsCard.jsx";
import notFound from "../../assets/not-found.svg";
import Preloader from "../Preloader/Preloader.jsx";

export const Main = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  newsArray,
  onCardBookmarked,
  bookmarkedNews,
  isLoggedIn,
  articlesToShow,
  setArticlesToShow,
  tags,
  searchError,
  apiError,
  isLoading,
}) => {
  const displayedArticles = newsArray.slice(0, articlesToShow);

  const handleShowMore = () => {
    setArticlesToShow((prevCount) => prevCount + 3);
  };

  return (
    <main className="main">
      <img className={"main__hero-bg"} src={hero} alt="" />
      <section className="main__hero">
        <h1 className="main__title">
          What's going on in
          <br /> the world?
        </h1>
        <h2 className="main__subtitle">
          Find the lastest news on any topic and save the in your personal
          account.
        </h2>
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSubmit={onSubmit}
          searchError={searchError}
        />
      </section>

      {/*Todo Review if !== Default this is still needed and if this section can be refactored to be simpler*/}

      {tags && tags !== "Default" && (
        <section className={"main__content"}>
          {isLoading ? (
            <Preloader />
          ) : apiError ? (
            <p className={"main__error"}>{apiError}</p>
          ) : displayedArticles?.length === 0 ? (
            <div className={"main__not-found-container"}>
              <img className={"main__not-found"} src={notFound} alt="" />
              <h2 className={"main__not-found-title"}>Nothing found</h2>
              <p className={"main__not-found-subtitle"}>
                Sorry, but nothing matched
                <br /> your search terms.
              </p>
            </div>
          ) : (
            <>
              <h1 className={"main__content-title"}>Search results</h1>

              <ul className={"main__card-list"}>
                {displayedArticles?.slice(0, articlesToShow).map((article) => {
                  const isThisArticleBookmarked =
                    isLoggedIn &&
                    bookmarkedNews?.some((item) => item.url === article.url);

                  const handleToggle = () => {
                    onCardBookmarked(article);
                  };

                  return (
                    <NewsCard
                      key={article.url}
                      newsArticle={article}
                      isBookmarked={isThisArticleBookmarked}
                      onActionClick={handleToggle}
                      isLoggedIn={isLoggedIn}
                      variant={"search"}
                    />
                  );
                })}
              </ul>
              {articlesToShow < newsArray.length && (
                <button
                  type={"button"}
                  className={"main__show-more"}
                  onClick={() => handleShowMore()}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}
      <About />
    </main>
  );
};

export default Main;
