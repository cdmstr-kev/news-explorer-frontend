import "./SearchForm.css"

const SearchForm = ({ searchQuery, setSearchQuery, onSubmit }) => {

  return (
      <>
        <form className="search-form" onSubmit={onSubmit}>
          <input
          className="search-form__input"
          type= "text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search News..."
          />
          <button className={"search-form__btn"} type="submit" >Search</button>
        </form>
      </>
  )
}
export default SearchForm
