import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q');

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">Search Results for "{searchTerm}"</h1>
      {/* Render search results here */}
      <p>No results found. (You can replace this with actual results)</p>
    </div>
  );
};

export default SearchResults;


