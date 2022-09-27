import styled from "styled-components";

export const App = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Board = styled.div`
  ${() => `width: calc(64px * 8);`}
  ${() => `height: calc(64px * 8);`}
  display: flex;
  flex-wrap: wrap;

`;

export const Cell = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WhiteCell = styled.div`
  background-color: #573a2e;
`;