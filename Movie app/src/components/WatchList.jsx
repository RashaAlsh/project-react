import MovieCard from "./MovieCard";

const WatchList = ({ watchlist, onRemoveFromWatchlist }) => {
  const handleRemoveFromWatchList = (movieId) => {
    onRemoveFromWatchlist(movieId);
  };

  return (
    <div>
      <div className="watchlist-movie-cards">
        {watchlist.length === 0 ? (
          <p className="watchlist-empty">
            Your watchlist is empty at the moment...
          </p>
        ) : (
          watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <MovieCard movie={movie} />

              <button
                className="remove-watchlist"
                onClick={() => handleRemoveFromWatchList(movie.id)}
              >
                Remove from Your Watchlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchList;