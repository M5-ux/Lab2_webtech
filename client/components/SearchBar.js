// components/SearchBar.js

import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [recherche, setRecherche] = useState('');

  function handleSearchChange(event) {
    const value = event.target.value;
    setRecherche(value);
    onSearch(value);
  }

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="    Rechercher des articles...   "
        value={recherche}
        onChange={handleSearchChange}
        className="p-2 border rounded"
      />
    </div>
  );
}
