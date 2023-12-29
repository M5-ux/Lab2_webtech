import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function SearchBar({ onSearch }) {
  const [recherche, setRecherche] = useState('');

  function handleSearchChange(event) {
    const value = event.target.value;
    setRecherche(value);
    onSearch(value);
  }

  function handleClearSearch() {
    setRecherche('');
    onSearch('');
  }

  return (
    <div className="my-4 flex items-center max-w-md mx-auto">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher des articles..."
          value={recherche}
          onChange={handleSearchChange}
          className="pl-10 pr-3 py-2 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent"
        />
        {recherche && (
          <XMarkIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
            onClick={handleClearSearch}
          />
        )}
      </div>
    </div>
  );
}
