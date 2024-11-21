import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <header style={{ padding: '20px', background: '#333', color: '#fff' }}>
      <h1>Popular Movies</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
        Search
      </button>
    </header>
  );
};

export default Header;
