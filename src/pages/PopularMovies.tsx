
import { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useApi } from '../Context/ApiContext';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface PopularMoviesProps {
  popularMovies: Movie[];
}

const PopularMovies: NextPage<PopularMoviesProps> = ({ popularMovies }) => {
  const [movies, setMovies] = useState<Movie[]>(popularMovies);
  const { searchMovies } = useApi();

  const handleSearch = async (query: string) => {
    const data = await searchMovies(query);
    setMovies(data.results || []);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <SearchBar onSearch={handleSearch} />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <Link key={movie.id} href={`/${movie.id}`} passHref>
            <div style={{ width: '200px', margin: '10px', cursor: 'pointer' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
              />
              <h2>{movie.title}</h2>
            </div>
          </Link>
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
