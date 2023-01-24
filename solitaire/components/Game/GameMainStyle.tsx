import styled from 'styled-components';

export const SectionGame = styled.main`
  position: fixed;
  top: 45px;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(${`/green.png`});
  background-size: cover;
  overflow: hidden;
  && section:nth-of-type(1) {
    grid-template-columns: 100px 215px repeat(4, 100px);
  }
  && section:nth-of-type(2) {
    grid-template-columns: repeat(7, 100px);
  }
`;

export const BodyGame = styled.section`
  display: grid;
  margin: 50px auto;
  justify-content: center;
  gap: 20px;
`;

export const Stack = styled.div`
  position: relative;
  height: 130px;
  width: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: -3px -3px 10px #000 inset;
`;

export const EmptyCard = styled.div`
  position: fixed;
  width: 100px;
  height: 130px;

  background-color: rgba(0, 0, 0, 0);
`;
