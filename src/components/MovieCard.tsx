import React from 'react';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, overview }) => {
  return (
    <div style={{ width: '200px', margin: '10px' }}>
      <img
        src={`https://image.tmdb.org/t/p/w200${posterPath}`}
        alt={title}
        style={{ width: '100%' }}
      />
      <h3>{title}</h3>
      <p>{overview.slice(0, 100)}...</p>
      <a href={`/movie/${id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        View Details
      </a>
    </div>
  );
};

export default MovieCard;
