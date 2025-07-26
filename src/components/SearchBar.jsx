import styled from "styled-components";

const StyledSearchBar = styled.div`
  background-color: #6741d9;
  margin: 20px;
  display: flex;
  padding: 25px;
  color: white;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.5rem;
`;

const StyledInput = styled.input`
  width: 20%;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  background-color: #7950f2;
  border: none;
  border-radius: 0.5rem;
  color: white;
  transition: all 0.3s;
  ::placeholder {
    color: #ffffff;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff;
    transform: translateY(-5px);
  }
`;

const SearchBar = ({ searchText, setSearchText, foundedMovieLength }) => {
  return (
    <StyledSearchBar>
      <p style={{ fontSize: "1.5rem", fontWeight: 500 }}>🍿 movieList</p>
      <StyledInput
        type="text"
        placeholder="Search Movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <p>
        Found{" "}
        <span>
          <strong>{foundedMovieLength}</strong>
        </span>{" "}
        results
      </p>
    </StyledSearchBar>
  );
};

export default SearchBar;
