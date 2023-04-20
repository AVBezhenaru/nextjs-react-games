import styled from 'styled-components';

export type LobbyStyles = object;

export const StyledGame = styled.div<LobbyStyles>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 700px;
  margin: 0 auto;
  gap: 20px;
`;
