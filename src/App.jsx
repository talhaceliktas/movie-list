import { useState } from "react";
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

const tempWatchedData = [
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
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);
  const [searchText, setSearchText] = useState("");
  const { movies, isLoading, error } = useMovies(searchText);
  const foundedMovieLength = movies.length;

  const [selectedMovieImdbID, setSelectedMovieImdbID] = useState(null);

  function deleteMovite(imdbId) {
    toast.dismiss();
    toast.success("Movie deleted successfully!");
    setWatchedMovies((movies) =>
      movies.filter((movie) => movie.imdbID !== imdbId)
    );
  }

  function rateMovie(rateScore, movieDetails) {
    if (!rateScore || !movieDetails) return;

    const newMovie = {
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      Year: movieDetails.Year,
      Poster: movieDetails.Poster,
      runtime: +movieDetails.Runtime.split(" ")[0],
      imdbRating: +movieDetails.imdbRating,
      userRating: rateScore,
    };

    toast.success("You add your movie successfully");
    setWatchedMovies((movies) => [...movies, newMovie]);
    setSelectedMovieImdbID(null);
  }

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
          setSelectedMovieImdbID={setSelectedMovieImdbID}
        />
        {selectedMovieImdbID ? (
          <MovieDetails
            selectedMovieImdbID={selectedMovieImdbID}
            rateMovie={rateMovie}
            watchedMovies={watchedMovies}
          />
        ) : (
          <MoviesList
            watchedMovies={watchedMovies}
            deleteMovite={deleteMovite}
          />
        )}
      </StyledContainer>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
