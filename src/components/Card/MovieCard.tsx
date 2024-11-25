import React from 'react';
import './movieCard.css';

interface MovieCardProps {
  id: number;
  posterPath: string;
  overview: string;
  vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, posterPath, overview, vote_average }) => {
  return (
    <div className="movie-card">
      <a href={`/movie/${id}`} className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/w780${posterPath}`}
          alt="Movie Poster"
          className="movie-poster"
        />
        <div className="movie-overlay">
          <p className="movie-overview">{overview.slice(0, 100)}...</p>
          <span className="movie-rating">
            {vote_average !== undefined ? `${vote_average.toFixed(1)}` : 'Rating not available'}
          </span>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
