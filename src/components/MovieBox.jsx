import styled from "styled-components";
import StarRating from "./StarRating";
import { useState } from "react";

const StyledMovieBox = styled.div`
  display: flex;
  background-color: #343a40;
  font-size: 14px;
  margin-bottom: 3rem;
`;

const StyledStarBox = styled.div`
  background-color: #343a40;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0 2rem 0;
  margin: 0 2rem;
  border-radius: 1rem;
  row-gap: 0.5rem;
`;

const Button = styled.div`
  background-color: #7950f2;
  margin-top: 1rem;
  width: 80%;
  text-align: center;
  padding: 0.8rem 1.7rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #6138da;
  }
`;

const MovieBox = ({ movieDetails, rateMovie, watchedMovies }) => {
  const [selectedStar, setSelectedStar] = useState(0);

  const foundMovie = watchedMovies.find(
    (movie) => movie.imdbID === movieDetails.imdbID
  );

  const rateScore = foundMovie ? foundMovie.userRating : undefined;

  return (
    <>
      <StyledMovieBox>
        <img src={movieDetails.Poster} style={{ width: "8rem" }} />
        <div
          style={{
            width: "100%",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {movieDetails.Title}
          </p>
          <p>
            {movieDetails.Released} • {movieDetails.Runtime}
          </p>
          <p>{movieDetails.Genre}</p>
          <p>
            ⭐️{movieDetails.Ratings && movieDetails.Ratings[0].Value} IMDb
            rating
          </p>
        </div>
      </StyledMovieBox>
      <StyledStarBox>
        <p>
          <strong>Rate Movie</strong>
        </p>
        {rateScore === undefined ? (
          <>
            <StarRating
              selectedStar={selectedStar}
              setSelectedStar={setSelectedStar}
            />
            <Button onClick={() => rateMovie(selectedStar, movieDetails)}>
              Add to list
            </Button>
          </>
        ) : (
          <p>
            You already rate this movie <strong>{rateScore}</strong>
          </p>
        )}
      </StyledStarBox>
      <div
        style={{
          margin: "1rem 2rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <p>{movieDetails.Plot}</p>
        <p>Starring {movieDetails.Actors}</p>
        <p>Directed by {movieDetails.Director}</p>
      </div>
    </>
  );
};

export default MovieBox;
