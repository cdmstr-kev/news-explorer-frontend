import "./SearchForm.css";

const SearchForm = ({ searchQuery, setSearchQuery, onSubmit }) => {
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
        <button
          disabled={!searchQuery}
          className={`search-form__btn ${!searchQuery && "search-form__btn_disabled"}`}
          type="submit"
        >
          Search
        </button>
      </form>
    </>
  );
};
export default SearchForm;
