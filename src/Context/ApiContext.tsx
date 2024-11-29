import React, { createContext, useContext, ReactNode } from 'react';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface ApiContextType {
  getPopularMovies: () => Promise<Movie[] | null>;
  searchMovies: (query: string) => Promise<Movie[] | null>;
  getMovieDetails: (id: string) => Promise<Movie | null>;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fetchData = async (endpoint: string, params = '') => {
    try {
      const response = await fetch(
        `${TMDB_API_BASE_URL}${endpoint}?api_key=${API_KEY}${params}`
      );
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPopularMovies = async (): Promise<Movie[] | null> => {
    const data = await fetchData('/movie/popular');
    return data?.results || null;
  };

  const searchMovies = async (query: string): Promise<Movie[] | null> => {
    const data = await fetchData('/search/movie', `&query=${query}`);
    return data?.results || null;
  };

  const getMovieDetails = async (id: string): Promise<Movie | null> => {
    return await fetchData(`/movie/${id}`);
  };

  return (
    <ApiContext.Provider value={{ getPopularMovies, searchMovies, getMovieDetails }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
