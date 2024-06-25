
import { useState } from "react";
import axiosInstance from "../api/axios";
import searchIcon from "../assets/icon-search.svg";

const MovieSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get("search/movie", {
        params: {
          query: query.trim(),
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });

      onSearch(response.data.results);
    } catch (error) {
      setError("Error fetching search results.");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for movies..."
      />
      { <img
        className="search-icon"
        src={searchIcon}
        alt="search icon"
        onClick={handleSearch}
      /> }
      {error && <div>{error}</div>}
    </div>
  );
};

export default MovieSearch;
