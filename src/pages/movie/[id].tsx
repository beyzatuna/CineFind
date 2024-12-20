import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styles from './[id].module.css';
import Navbar from '../../components/NavBar/NavBar';
import Image from 'next/image';

interface MovieDetailsProps {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
  cast: Array<{ name: string; character: string; profile_path: string }>;
  trailerKey: string | null;
}

const MovieDetails: NextPage<MovieDetailsProps> = ({ movie, cast, trailerKey }) => {
  if (!movie) {
    return <h1>Movie not found</h1>;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.header}>
        <div className={styles.posterContainer}>
          <Image
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
            width={780}
            height={1170}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
          <p className={styles.overview}>
            <strong>Overview:</strong> {movie.overview}
          </p>
        </div>
      </div>

      <div className={styles.cast}>
        <h3>Cast</h3>
        <div className={styles.carousel}>
          {Array.isArray(cast) &&
            cast.map((actor, index) => (
              <div key={index} className={styles.actor}>
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.actorPhoto}
                    width={200}
                    height={300}
                  />
                ) : (
                  <p>No photo available</p>
                )}
                <p className={styles.actorName}>{actor.name}</p>
                <p className={styles.actorCharacter}>as {actor.character}</p>
              </div>
            ))}
        </div>
      </div>

      {trailerKey && (
        <div className={styles.trailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.trailerVideo}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const resMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    if (!resMovie.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const movie = await resMovie.json();

    const resCredits = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
    if (!resCredits.ok) {
      throw new Error('Failed to fetch movie credits');
    }
    const credits = await resCredits.json();

    const cast = credits.cast.slice(0, 10);

    const resVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
    if (!resVideos.ok) {
      throw new Error('Failed to fetch movie videos');
    }
    const videos = await resVideos.json();
    const trailer = videos.results.find((video: { type: string }) => video.type === 'Trailer') || null;
    const trailerKey = trailer ? trailer.key : null;

    return {
      props: {
        movie,
        cast,
        trailerKey,
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      props: {
        movie: null,
        cast: [],
        trailerKey: null,
      },
    };
  }
};

export default MovieDetails;
