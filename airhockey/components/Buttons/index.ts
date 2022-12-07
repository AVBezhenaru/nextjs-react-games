import styled from 'styled-components';

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 540px;
  padding-right: 62px;
  position: relative;
`;

export const ButtonPlay = styled.button`
  background-color: transparent;
  width: 200px;
  height: 100px;
  font-size: 20px;
  font-weight: bold;
  font-family: myFirstFont;
  letter-spacing: 6px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgb(233 11 77);
  border-radius: 5px;
  color: #e90b4d;
  z-index: 3;
  :hover {
  background-color: #df1d57;
  color: white;
  font-weight: bold;
`;

export const ButtonSpecification = styled.button`
  background-color: transparent;
  height: 100px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgb(233 11 77);
  border-radius: 5px;
  color: #e90b4d;
  font-family: myFirstFont;
  z-index: 3;
  :hover {
  background-color: #df1d57;
  color: white;
  font-weight: bold;
`;