import styled from "styled-components";

const StyledSearchMovie = styled.li`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 0.7rem;
  column-gap: 2rem;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    background-color: #595e63;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  grid-row: 1 / -1;
`;

const SearchMovie = ({ movie, setSelectedMovieImdbID }) => {
  return (
    <StyledSearchMovie
      onClick={() =>
        setSelectedMovieImdbID((imdbID) =>
          movie?.imdbID === imdbID ? null : movie?.imdbID
        )
      }
    >
      <Image src={movie.Poster} />
      <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>{movie.Title}</p>
      <p>🗓 {movie.Year}</p>
    </StyledSearchMovie>
  );
};

export default SearchMovie;
