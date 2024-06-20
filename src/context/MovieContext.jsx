import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "../utils/useQuery";

export const MovieContext = createContext();

export const MovieProvider = ({ value, children }) => {
  const query = useQuery();
  const [type, setType] = useState("movie");
  const [genres, setGenres] = useState([]);

  const [movie, setMovie] = useState({
    data: {},
    currentMovie: 0,
    currentPage: 1,
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <MovieContext.Provider
      value={{
        type,
        setType,
        genres,
        setGenres,
        query,
        movie,
        setMovie,
        movies,
        setMovies,
        loading,
        setLoading,
        getMovies: () => {},
        getSimilar: () => {},
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovie must be used within a MovieContext");
  }
  return context;
};
