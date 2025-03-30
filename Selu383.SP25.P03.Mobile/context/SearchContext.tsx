import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
