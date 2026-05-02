import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = searchItem.trim();

    if (!trimmedQuery) {
      setSearchError("Please enter a keyword");
      return;
    }

    setSearchError("");
    onSearch(trimmedQuery);
  };

  const handleChange = (e) => {
    setSearchItem(e.target.value);

    if (searchError) {
      setSearchError("");
    }
  };

  return (
    <section className="search-form">
      <h1 className="search-form__heading">What's going on in the world?</h1>
      <p className="search-form__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={searchItem}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </form>
      {searchError && <p className="search-form__keyword">{searchError}</p>}
    </section>
  );
};

export default SearchForm;
