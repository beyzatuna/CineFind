import React, { createContext, useContext, ReactNode } from 'react';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

const ApiContext = createContext<any>(null);


export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const fetchData = async (endpoint: string, params = '') => {
    try {
      const response = await fetch(
        `${TMDB_API_BASE_URL}${endpoint}?api_key=${API_KEY}${params}`
      );
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

 
  const getPopularMovies = async () => await fetchData('/movie/popular');
  const searchMovies = async (query: string) => await fetchData('/search/movie', `&query=${query}`);
  const getMovieDetails = async (id: string) => await fetchData(`/movie/${id}`);

  return (
    <ApiContext.Provider value={{ getPopularMovies, searchMovies, getMovieDetails }}>
      {children}
    </ApiContext.Provider>
  );
};


export const useApi = () => useContext(ApiContext);
