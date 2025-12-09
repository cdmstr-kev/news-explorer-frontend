import "./SearchForm.css";

const SearchForm = ({ searchQuery, setSearchQuery, onSubmit, searchError }) => {
  return (
    <>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-form__input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search News..."
        />
        <button className={"search-form__btn"} type="submit">
          Search
        </button>
      </form>
      {searchError && <p className="search-form__error">{searchError}</p>}
    </>
  );
};
export default SearchForm;
