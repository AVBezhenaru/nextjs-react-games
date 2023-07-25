import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
  font-size: 16px;
  shadow:-webkit-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  -moz-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
`;

export const Title = styled.div`
  font-size: 18px;
  color: black;
  margin-bottom: 15px;
`;

export const Header = styled.div`
  display: flex;
  color: black;
  background-color: #87d7fa;
`;

export const Line = styled.div`
  display: flex;
  color: red;
`;

export const HeaderCell = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: black;
  width: 110px;
  height: 40px;
`;

export const Cell = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-top: solid 0.5px gray;
  color: #52595c;
  width: 110px;
  height: 40px;
`;
