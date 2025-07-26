import { useState } from "react";
import styled from "styled-components";

const StyledStarRating = styled.div`
  display: flex;
`;

const StarRating = ({ selectedStar, setSelectedStar }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <StyledStarRating>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i + 1}
          style={{ width: "25px", height: "25px", display: "inline-block" }}
          onClick={() => setSelectedStar(i + 1)}
          onMouseEnter={() => setHoveredStar(i + 1)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={
              hoveredStar >= i + 1
                ? "yellow"
                : selectedStar >= i + 1
                ? "yellow"
                : "none"
            }
            stroke="orange"
            id={`star-${i + 1}`}
            style={{ cursor: "pointer" }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </span>
      ))}
    </StyledStarRating>
  );
};

export default StarRating;
