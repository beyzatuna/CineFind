import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface MovieDetailsProps {
  movie: {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
  cast: Array<{ name: string; character: string; profile_path: string }>;
  director: { name: string; profile_path: string };
  trailerKey: string | null; 
}

const MovieDetails: NextPage<MovieDetailsProps> = ({ movie, cast, director, trailerKey }) => {
  if (!movie) {
    return <h1>Movie not found</h1>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '300px' }}
      />
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Overview:</strong> {movie.overview}</p>

      {trailerKey && (
        <div>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div>
        <h3>Director</h3>
        {director && (
          <div>
            {director.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                alt={director.name}
                style={{ width: '100px', borderRadius: '50%' }}
              />
            ) : (
              <p>No photo available</p>
            )}
            <p>{director.name}</p>
          </div>
        )}
      </div>

      <div>
        <h3>Main Cast</h3>
        {cast && cast.slice(0, 5).map((actor, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                style={{ width: '50px', borderRadius: '50%' }}
              />
            ) : (
              <p>No photo available</p>
            )}
            <p>{actor.name} as {actor.character}</p>
          </div>
        ))}
      </div>
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

    const cast = credits.cast.slice(0, 5); 
    const director = credits.crew.find((member: any) => member.job === 'Director') || {};

    
    const resVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
    if (!resVideos.ok) {
      throw new Error('Failed to fetch movie videos');
    }
    const videos = await resVideos.json();
    const trailer = videos.results.find((video: any) => video.type === 'Trailer') || null;
    const trailerKey = trailer ? trailer.key : null; 
    return {
      props: {
        movie,
        cast,
        director,
        trailerKey, 
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      props: {
        movie: null,
        cast: [],
        director: {},
        trailerKey: null,
      },
    };
  }
};

export default MovieDetails;
