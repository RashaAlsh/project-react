
import { useState } from "react";
import AllMovies from "./components/AllMovies";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import WatchList from "./components/WatchList";
import githubIcon from "./assets/icon-github.svg";
import MovieDetail from "./components/MovieDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";


const App = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const addToWatchList = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== movieId)
    );
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    navigate("/search-results");
  };

  return (
      <div>
      <Header handleSearchResults={handleSearchResults} />

      <Routes>
        <Route
          path="/"
          element={<AllMovies addToWatchList={addToWatchList} />}
          
        />
        <Route path="/movie/:id" element={<MovieDetail />} />

        <Route
          path="/popular"
          element={
            <MovieList category="popular" addToWatchList={addToWatchList} />
          }
        />

        <Route
          path="/upcoming"
          element={
            <MovieList category="upcoming" addToWatchList={addToWatchList} />
          }
        />
        <Route
          path="/top-rated"
          element={
            <MovieList category="top_rated" addToWatchList={addToWatchList} />
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              addToWatchList={addToWatchList}
              onRemoveFromWatchlist={removeFromWatchlist}
            />
          }
        />
        <Route
          path="/search-results"
          element={
            <MovieList category="search-results" movies={searchResults} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

const Header = ({ handleSearchResults }) => {
  return (
    <header className="header">
      <h1 className="logo">MovieNight</h1>
      <MovieSearch onSearch={handleSearchResults} />
      <nav>
        <ul className="nav">
          <li>
            <Link className="nav-link" to="/popular">
              Popular
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/">
              All Movies
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/watchlist">
              Watchlist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>
      This Website is built as part of the HackYourFuture React module. &copy; {new Date().getFullYear()}
      </p>
      <a href="https://github.com/RashaAlsh">
      {<img src={githubIcon} alt="github logo" className="github-icon"/>}
      </a>
    </footer>
  );
};

export default App;
