import styled from "styled-components";
import Loader from "./Loader";
import SearchMovie from "./SearchMovie";
const StyledMoviesList = styled.div`
  background-color: #2b3035;
  width: 25rem;
  border-radius: 2rem;
  overflow: auto;
  padding: 1.2rem;
`;

const SearchList = ({ movies, isLoading, error, setSelectedMovieImdbID }) => {
  return (
    <StyledMoviesList>
      {error ? (
        <div style={{ width: "100%", height: "100%" }}>{error}</div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <ul>
          {movies.map((movie) => (
            <SearchMovie
              movie={movie}
              key={movie.imdbID}
              setSelectedMovieImdbID={setSelectedMovieImdbID}
            />
          ))}
        </ul>
      )}
    </StyledMoviesList>
  );
};

export default SearchList;
