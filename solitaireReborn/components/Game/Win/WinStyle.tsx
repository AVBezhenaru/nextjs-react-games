import styled from 'styled-components';

export const WinWrap = styled.div`
  width: 860px;
  height: 70vh;
  position: absolute;
  left: calc(50% - 430px);
  padding: 0 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  letter-spacing: 20px;

  top: 70px;
  overflow-y: auto;
  font-family: Inter, sans-serif;

  && h2 {
    position: absolute;
    top: 30%;
    left: 10%;
    font-size: 110px;
    text-transform: uppercase;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 1);
  }

  && button {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    margin-top: 10px;
  }
`;
