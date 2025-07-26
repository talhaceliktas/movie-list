import styled from "styled-components";

const StyledMovie = styled.li`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 1fr 1fr;
  padding: 0.7rem;
  column-gap: 2rem;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  grid-row: 1 / -1;
`;

const StyledBlock = styled.div`
  display: flex;
  column-gap: 1.5rem;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  align-self: center;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  border-style: none;
  background-color: #e03131;
  cursor: pointer;
  margin-left: auto;
`;

const Movie = ({ movie, deleteMovite }) => {
  const {
    imdbID,
    Poster: poster,
    Title: title,
    imdbRating,
    runtime,
    userRating,
  } = movie;

  return (
    <StyledMovie>
      <StyledImage src={poster} />
      <Title>{title}</Title>
      <StyledBlock>
        <p>⭐️ {imdbRating}</p>
        <p>🌟 {userRating}</p>
        <p>⏳ {!isNaN(Number(runtime)) ? `${runtime} min` : "NaN"}</p>
        <Button onClick={() => deleteMovite(imdbID)}>X</Button>
      </StyledBlock>
    </StyledMovie>
  );
};

export default Movie;
