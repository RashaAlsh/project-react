import { useState, useEffect } from "react";
import apiConfig from "../api/apiConfig";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import likeIcon from "../assets/icon-like.svg";
import starIcon from "../assets/icon-favorite.svg";


const MovieCard = ({ movie, addToWatchList }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get("genre/movie/list");
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    addToWatchList(movie);
    toast.success("Added to watchlist", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      className: "custom-toast",
    });
  };

  const genreNames = movie.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : "Unknown";
  });

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
    <div className="movie-card">
      <img
        className="movie-poster"
        src={apiConfig.image(movie.poster_path)}
        alt={movie.title}
      />
      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
        <p className="genre">{genreNames.join(", ")}</p>
        <p>Released: {movie.release_date}</p>
        { <img
          className="add-to-watchlist"
          src={likeIcon}
          alt="add icon"
          onClick={onClick}
        /> }
        <div className="popularity-container">
          { <img className="star-icon" src={starIcon} alt="star icon" />}
          <div className="movie-popularity">{movie.vote_average}</div>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default MovieCard;