import { FC } from "react";
import SearchBarIndexProps from "../components/SearchBar/SearchBarIndex";

const Home: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
  
      <a
        href="/"
        className="flex items-center gap-1 text-6xl font-extrabold mb-12"
      >
        <span className="text-white bg-black px-4 py-2 rounded-lg">Cine</span>
        <span className="text-red-600">Find</span>
      </a>

      <SearchBarIndexProps />

  
      <div className="flex flex-col items-center mt-12">
      
        <a
          href="/PopularMovies"
          className="flex flex-col items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition text-center"
        >
          <span className="text-4xl">🔥</span>
          <span className="mt-2 text-lg font-medium text-red-600">Check Popular Movies</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
