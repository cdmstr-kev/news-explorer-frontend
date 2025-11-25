import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";

export const Main = ({ searchQuery, setSearchQuery, onSubmit }) => {
  return (
    <main className="main__container">
      <div className="main__main">
        <h1 className="main__title">
          What's going on in
          <br /> the world?
        </h1>
        <h2 className="main__subtitle">
          Find the lastest news on any topic and save the in your personal
          account.
        </h2>
      </div>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={onSubmit}
      />
      <About />
    </main>
  );
};

export default Main;
