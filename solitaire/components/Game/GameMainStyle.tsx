import styled from 'styled-components';

import back from '../../images/gameFones/green.jpg';
// import shirt from '../../images/cards/shirts/shirt.png';

export const HeaderGame = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  padding: 5px 20px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 3px 3px 15px #000;
  && {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 3px;
    text-shadow: 3px 3px 3px #000;
  }
  && span {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 180px;
    margin-left: 20px;
  }
  && span:first-child {
    font-size: 1.4rem;
    letter-spacing: 15px;
  }
  && button {
    margin-right: 50px;
    letter-spacing: 3px;
    color: white;
    text-shadow: 2px 2px 2px #000;
  }
  && button:last-of-type {
    margin-right: auto;
    color: white;
  }
`;

export const SectionGame = styled.main`
  position: fixed;
  top: 45px;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(${back.src}) no-repeat;
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
  margin: 70px auto;
  justify-content: center;
  gap: 20px;
`;

export const Stack = styled.div`
  position: relative;
  height: 138px;
  width: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: -3px -3px 10px #000 inset;
`;
