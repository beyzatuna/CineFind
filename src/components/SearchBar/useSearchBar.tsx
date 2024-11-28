import { useState } from "react";
import { useRouter } from "next/router";

export const useSearchBar = (onSearch?: (query: string) => void) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery(""); 
      setIsOpen(false); 
      router.push(`/SearchResult?query=${query}`);

      if (onSearch) {
        onSearch(query);
      }
    }
  };

  return { query, setQuery, isOpen, setIsOpen, handleSubmit };
};
