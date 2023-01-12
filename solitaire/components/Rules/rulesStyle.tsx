import styled from 'styled-components';

export const RulesWrap = styled.div`
  width: 80%;
  height: 75vh;
  position: absolute;
  left: 10%;
  padding: 10px 20px;
  z-index: 999;
  background-color: #111;
  letter-spacing: 3px;
  font-size: 0.75rem;
  top: 100px;
  overflow-y: auto;
  font-family: Inter, sans-serif;

  font-weight: 400;
  && p {
    color: #fff;
    font-family: Inter, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
  }

  && h2 {
    text-decoration: underline;
  }

  && button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }
`;
