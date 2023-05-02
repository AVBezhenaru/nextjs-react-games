import styled from 'styled-components';

export const Game = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  min-width: 150px;
  border: 2px solid #e4e7eb;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgb(223 221 221 / 56%) 5px 5px 5px;
  cursor: pointer;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 50%;
  background-color: rgba(255, 127, 57, 0.2);
`;

export const GameName = styled.p`
  margin-top: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
`;
