
import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const MovieList = ({ category, movies: searchMovies, addToWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (category === "search-results") {
      setMovies(searchMovies);
      return;
    }

    const fetchMoviesByCategory = async () => {
      try {
        const response = await axiosInstance.get(`movie/${category}`, {
          params: {
            page: currentPage,
          },
        });
        
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
      }
    };

    fetchMoviesByCategory();
  }, [category, searchMovies, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="movie-list">
      <div className="movie-cards">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            addToWatchList={addToWatchList}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MovieList;
