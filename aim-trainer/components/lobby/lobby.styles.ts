import styled from 'styled-components';

export type GameStyles = object;

export const StyledGame = styled.div<GameStyles>`
  min-width: 800px;
  min-height: 800px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;

  background: #2c2c2c;
`;
