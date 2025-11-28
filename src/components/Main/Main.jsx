import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import hero from "../../assets/hero.png";
import NewsCard from "../NewsCard/NewsCard.jsx";

export const Main = ({ searchQuery, setSearchQuery, onSubmit }) => {
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
      </section>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={onSubmit}
      />
      <section className={"main__content"}>
        <h1 className={"main__content-title"}>Search results</h1>

        <NewsCard />
      </section>
      <About />
    </main>
  );
};

export default Main;
