import React, { createContext, useState, ReactNode } from 'react';
import { Movie } from '../Types/Movie';

interface MovieBannerContextType {
    searchResults:Movie[] | null;
    setSearchResults:React.Dispatch<React.SetStateAction<Movie[] | null>>
}


export const MovieBannerContext = createContext<MovieBannerContextType>({
    searchResults:null,
    setSearchResults:()=>{},
});

interface MovieBannerContextProviderProps {
  children: ReactNode;
}

export const MovieBannerContextProvider = ({ children }: MovieBannerContextProviderProps) => {
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);

  const contextValue: MovieBannerContextType = {
    searchResults,
    setSearchResults,
  };

  return (
    <MovieBannerContext.Provider value={contextValue}>
      {children}
    </MovieBannerContext.Provider>
  );
};
