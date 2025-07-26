import styled from "styled-components";
import Movie from "./Movie";

const StyledSearchList = styled.div`
  background-color: #2b3035;
  width: 25rem;
  border-radius: 2rem;
  overflow: auto;
`;
const WatchedList = styled.div`
  padding: 20px;
  background-color: #343a40;
  border-radius: 2rem;
  margin-bottom: 1rem;
`;
const StyledParagraf = styled.p`
  font-weight: 800;
`;

const MoviesList = ({ watchedMovies, deleteMovite }) => {
  const totalMoviesLength = watchedMovies.length;

  const avgImdbRating =
    watchedMovies.reduce((acc, movie) => acc + movie.imdbRating, 0) /
    totalMoviesLength;

  const avgUserRating =
    watchedMovies.reduce((acc, movie) => acc + movie.userRating, 0) /
    totalMoviesLength;

  const avgMovieMinute =
    watchedMovies.reduce((acc, movie) => {
      const runtime = Number(movie.runtime);
      return isNaN(runtime) ? acc : acc + runtime;
    }, 0) / watchedMovies.length;

  if (watchedMovies.length === 0) {
    return (
      <StyledSearchList style={{ color: "white", padding: "2rem" }}>
        No movies watched yet. Add some movies!
      </StyledSearchList>
    );
  }
  return (
    <StyledSearchList>
      <WatchedList>
        <h4 style={{ marginBottom: "2rem", textAlign: "center" }}>
          MOVIES YOU WATCHED
        </h4>
        <div style={{ display: "flex", gap: "1rem" }}>
          <StyledParagraf>#️⃣ {totalMoviesLength} movies</StyledParagraf>
          <StyledParagraf>⭐️ {avgImdbRating.toFixed(1)}</StyledParagraf>
          <StyledParagraf>🌟 {avgUserRating.toFixed(1)}</StyledParagraf>
          <StyledParagraf>⏳ {avgMovieMinute.toFixed(0)} min</StyledParagraf>
        </div>
      </WatchedList>
      <ul style={{ listStyleType: "none" }}>
        {watchedMovies.map((movie) => (
          <Movie movie={movie} deleteMovite={deleteMovite} key={movie.imdbID} />
        ))}
      </ul>
    </StyledSearchList>
  );
};

export default MoviesList;
