
import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [images, setImages] = useState([]);
  const [displayedActors, setDisplayedActors] = useState(12);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const [movieResponse, creditsResponse, imagesResponse] =
          await Promise.all([
            axiosInstance.get(`movie/${id}`),
            axiosInstance.get(`movie/${id}/credits?language=en-US`),
            axiosInstance.get(`movie/${id}/images?&include_image_language=en`),
          ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
        setImages(imagesResponse.data.backdrops);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie || !credits) {
    return <div>Loading...</div>;
  }

  const loadMoreActors = () => {
    setDisplayedActors(displayedActors + 12);
  };

  return (
    <div className="movie-detail">
      <img
        className="detail-img"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2 className="detail-title">{movie.title}</h2>
      <p className="overview">{movie.overview}</p>
      <p className="detail-genre">
        <strong>Genres:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="detail-release">
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="duration">
        <strong>Duration:</strong> {movie.runtime} minutes
      </p>
      <p className="budget">
        <strong>Budget:</strong> ${movie.budget.toLocaleString()}
      </p>
      <h3>Actors:</h3>
      <ul className="actor-gallery">
        {credits.cast
          .filter((actor) => actor.profile_path)
          .slice(0, displayedActors)
          .map((actor) => (
            <li key={actor.id}>
              <div>
                <img
                  className="actor-img"
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <div>
                  <p>{actor.name}</p>
                  {actor.known_for && (
                    <p>
                      <strong>Known For:</strong>{" "}
                      {actor.known_for.map((movie) => movie.title).join(", ")}
                    </p>
                  )}
                  <p>
                    <strong>Gender:</strong>{" "}
                    {actor.gender === 1 ? "Female" : "Male"}
                  </p>
                  <p>
                    <strong>Character:</strong> {actor.character}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {credits.cast.length > displayedActors && (
        <button className="load-more-actors" onClick={loadMoreActors}>
          Load More Actors
        </button>
      )}
      <div>
        <h4>GALLERY</h4>
        <div className="gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
