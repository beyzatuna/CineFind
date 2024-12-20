import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import MovieCard from '../components/Card/MovieCard'; 
import Navbar from "../components/NavBar/NavBar";
import styles from '../components/Card/movieCard.module.css'; 

interface Movie {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number; 
}

interface PopularMoviesProps {
  popularMovies: Movie[];
}

const PopularMovies: NextPage<PopularMoviesProps> = ({ popularMovies }) => {
  const [movies] = useState<Movie[]>(popularMovies);

  return (
    <div>
      <Navbar />
      {/* CSS modülünden gelen "movie-container" sınıfını kullanıyoruz */}
      <div className={styles["movie-container"]}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    if (!res.ok) throw new Error('Failed to fetch popular movies');
    const data = await res.json();

    return {
      props: {
        popularMovies: data.results || [],
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      props: {
        popularMovies: [],
      },
    };
  }
};

export default PopularMovies;
