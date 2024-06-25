import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

const AllMovies = ({ addToWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axiosInstance.get("discover/movie", {
          params: {
            include_adult: false,
            include_video: false,
            language: "en-US",
            page: currentPage,
            sort_by: "popularity.desc",
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchAllMovies();
  }, [currentPage]);

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
        className="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllMovies;