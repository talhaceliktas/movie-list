import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body{
      margin: 0;
  padding: 0;
  background-color: #212529;
  height: 95dvh;
  font-family: "Ubuntu Sans", sans-serif;
  }

  ::-webkit-scrollbar {
  width: 8px; 
  height: 8px; 
}

/* Scroll bar arkası (track) */
::-webkit-scrollbar-track {
  background: #2b3035;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid #2b3035;
}


::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

export default GlobalStyle;
