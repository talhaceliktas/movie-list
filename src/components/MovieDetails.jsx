import styled from "styled-components";
import useFetchMovie from "../services/useFetchMovie";
import Loader from "./Loader";
import MovieBox from "./MovieBox";

const StyledMovieDetails = styled.div`
  background-color: #2b3035;
  width: 25rem;
  border-radius: 2rem;
  overflow: auto;
`;

const MovieDetails = ({ selectedMovieImdbID, rateMovie, watchedMovies }) => {
  const { movieDetails, isLoading, error } = useFetchMovie(selectedMovieImdbID);

  return (
    <StyledMovieDetails>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieBox
          movieDetails={movieDetails}
          rateMovie={rateMovie}
          watchedMovies={watchedMovies}
        />
      )}
    </StyledMovieDetails>
  );
};

export default MovieDetails;
