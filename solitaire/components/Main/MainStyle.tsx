import styled from 'styled-components';

export const MainSection = styled.div`
  position: fixed;
  top: 45px;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(${`/fone1.png`}) no-repeat center 70px, url(${`/desk1.png`}) no-repeat;
  background-size: 65vh, cover;
  overflow: hidden;
`;

export const StartGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  height: 100px;
  background-color: rgba(184, 184, 184, 0.8);
  margin: 0 auto;
  margin-top: 65vh;
  border-radius: 25px;
  cursor: pointer;
  && {
    font-size: 2.5rem;
    text-shadow: 3px 3px 3px #000;
  }
`;
