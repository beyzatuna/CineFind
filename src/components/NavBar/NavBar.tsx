import React from "react";
import SearchBar from "../SearchBar/SearchBar";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center mb-8 ">
        <div className="text-2xl font-bold flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a href="/" className="flex items-center gap-1 hover:text-gray-400 transition">
            <span>Cine</span>
            <span className="text-red-600">Find</span>
          </a>
          <a
            href="/PopularMovies"
            className="text-sm md:text-base hover:text-gray-400 transition mt-2 md:mt-0"
          >
            Popular Movies
          </a>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <SearchBar />
        </div>
      </nav>
      <div className="h-8"></div>
    </>
  );
};

export default Navbar;
