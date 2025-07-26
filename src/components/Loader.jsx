import { MoonLoader } from "react-spinners";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = ({ isLoading }) => {
  return (
    <Div>
      <MoonLoader loading={isLoading} color="white" />
    </Div>
  );
};

export default Loader;
