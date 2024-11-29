import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/Card/MovieCard";
import Navbar from "../components/NavBar/NavBar";

interface MovieType {
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
}

const SearchResult: React.FC = () => {
  const router = useRouter();
  const { query } = router.query; 
  const [movies, setMovies] = useState<MovieType[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady && query) {
      setLoading(true);
      console.log("Arama sorgusu:", query);

      const fetchMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
          );
          const data = await response.json();
          console.log("API'den gelen veriler:", data);
          setMovies(data.results || []);
        } catch (error) {
          console.error("API çağrısında hata:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [router.isReady, query]);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-white text-2xl mb-4">
        Search Results for: <span className="text-red-500">{"\""}{query}{"\""}</span>
      </h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="movie-container">
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
      )}
    </div>
  );
};

export default SearchResult;
