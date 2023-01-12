import styled from 'styled-components';

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
