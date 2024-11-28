import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchBar } from "./useSearchBar";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { query, setQuery, isOpen, setIsOpen, handleSubmit } = useSearchBar(onSearch);

  return (
    <div className="relative flex items-center">
      <button
        className={`text-white text-2xl focus:outline-none transition-transform ${
          isOpen ? "transform translate-x-[-10px]" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiSearch />
      </button>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center bg-gray-800 gap-2 px-4 py-2 rounded-md border border-gray-600 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "w-64 opacity-100 ml-2" : "w-0 opacity-0"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={`p-2 w-full bg-gray-800 text-white focus:outline-none transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          type="button"
          className="text-white"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
