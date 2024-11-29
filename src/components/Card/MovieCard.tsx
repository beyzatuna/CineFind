import React from 'react';
import styles from './movieCard.module.css'; 
import Image from 'next/image';

interface MovieCardProps {
  id: number;
  posterPath: string;
  overview: string;
  vote_average: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, posterPath, overview, vote_average }) => {
  return (
    <div className={styles['movie-card']}> 
      <a href={`/movie/${id}`} className={styles['image-container']}>
        <Image
          src={`https://image.tmdb.org/t/p/w780${posterPath}`}
          alt="Movie Poster"
          className={styles['movie-poster']}
          width={300}
          height={450}
          priority
        />
        <span className={styles['movie-rating']}>
          {vote_average !== undefined ? `${vote_average.toFixed(1)}` : 'Rating not available'}
        </span>
        <div className={styles['movie-overlay']}>
          <p className={styles['movie-overview']}>{overview.slice(0, 100)}...</p>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
