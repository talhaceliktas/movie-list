import { useState, useCallback, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import useMovies from "./services/useMovies";

import GlobalStyle from "./GlobalStyles";
import SearchBar from "./components/SearchBar";
import MoviesList from "./components/MoviesList";
import SearchList from "./components/SearchList";
import styled from "styled-components";
import MovieDetails from "./components/MovieDetails";

const StyledContainer = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  gap: 3rem;
  height: calc(100vh - 7.2rem - 3 * 2.5rem);
`;

// Sabit veri komponentin dışında tanımlandı
const INITIAL_WATCHED_DATA = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [watchedMovies, setWatchedMovies] = useState(INITIAL_WATCHED_DATA);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieImdbID, setSelectedMovieImdbID] = useState(null);

  const { movies, isLoading, error } = useMovies(searchText);

  // Memoized değerler
  const foundedMovieLength = useMemo(() => movies.length, [movies.length]);

  const watchedMovieIds = useMemo(
    () => new Set(watchedMovies.map((movie) => movie.imdbID)),
    [watchedMovies]
  );

  // useCallback ile optimize edilmiş fonksiyonlar
  const deleteMovie = useCallback((imdbId) => {
    toast.dismiss();
    toast.success("Movie deleted successfully!");
    setWatchedMovies((movies) =>
      movies.filter((movie) => movie.imdbID !== imdbId)
    );
  }, []);

  const rateMovie = useCallback(
    (rateScore, movieDetails) => {
      if (!rateScore || !movieDetails) {
        toast.error("Invalid rating or movie details");
        return;
      }

      // Duplicate kontrol
      if (watchedMovieIds.has(movieDetails.imdbID)) {
        toast.error("This movie is already in your watched list!");
        return;
      }

      const runtime = movieDetails.Runtime?.split(" ")[0];
      const imdbRating = movieDetails.imdbRating;

      // Veri validasyonu
      if (!runtime || !imdbRating || imdbRating === "N/A") {
        toast.error("Movie details are incomplete");
        return;
      }

      const newMovie = {
        imdbID: movieDetails.imdbID,
        Title: movieDetails.Title,
        Year: movieDetails.Year,
        Poster: movieDetails.Poster,
        runtime: +runtime,
        imdbRating: +imdbRating,
        userRating: rateScore,
      };

      toast.success("Movie added to your list successfully!");
      setWatchedMovies((movies) => [...movies, newMovie]);
      setSelectedMovieImdbID(null);
    },
    [watchedMovieIds]
  );

  const handleMovieSelect = useCallback((imdbID) => {
    setSelectedMovieImdbID(imdbID);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedMovieImdbID(null);
  }, []);

  return (
    <>
      <GlobalStyle />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        foundedMovieLength={foundedMovieLength}
      />
      <StyledContainer>
        <SearchList
          movies={movies}
          isLoading={isLoading}
          error={error}
          setSelectedMovieImdbID={handleMovieSelect}
        />
        {selectedMovieImdbID ? (
          <MovieDetails
            selectedMovieImdbID={selectedMovieImdbID}
            rateMovie={rateMovie}
            watchedMovies={watchedMovies}
            onBack={handleBackToList}
          />
        ) : (
          <MoviesList watchedMovies={watchedMovies} deleteMovie={deleteMovie} />
        )}
      </StyledContainer>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
