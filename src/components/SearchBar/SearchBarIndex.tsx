import React, { useEffect, useState, useRef } from "react";
import { useSearchBar } from "./useSearchBar";

interface SearchBarIndexProps {
  onSearch?: (query: string) => void;
}

const SearchBarIndex: React.FC<SearchBarIndexProps> = ({ onSearch }) => {
  const { query, setQuery, handleSubmit } = useSearchBar(onSearch);
  const [placeholderText, setPlaceholderText] = useState("");
  const typewriterTextsRef = useRef([
    "A time-traveling adventure...",
    "Dark horror in an abandoned mansion...",
    "A sci-fi adventure in space...",
    "Thrilling detective mystery...",
  ]);
  const typingSpeed = 60;
  const pauseBetweenTexts = 1500;

  useEffect(() => {
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentText = typewriterTextsRef.current[textIndex];
      if (!isDeleting) {
        setPlaceholderText(currentText.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          timeout = setTimeout(type, pauseBetweenTexts);
          return;
        }
      } else {
        setPlaceholderText(currentText.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % typewriterTextsRef.current.length;
        }
      }
      timeout = setTimeout(type, typingSpeed);
    };

    type();

    return () => clearTimeout(timeout);
  }, [pauseBetweenTexts, typingSpeed]); 

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderText}
          className="w-full py-4 px-6 rounded-full text-xl border border-gray-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchBarIndex;
