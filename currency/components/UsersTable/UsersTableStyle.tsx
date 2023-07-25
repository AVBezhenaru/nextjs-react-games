import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  font-size: 14px;
  background-color: white;
  border-radius: 25px;
  align-self: flex-start;
  shadow:-webkit-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  -moz-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
`;

export const Title = styled.div`
  color: black;
  margin-bottom: 15px;
  font-size: 18px;
`;

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  width: 100%;
  height: 40px;
  color: black;
  background-color: #87d7fa;
`;

export const HeaderLi = styled.li`
  display: flex;
  width: 400px;
`;

export const Footer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const Sort = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleSort = styled.div`
  color: black;
  margin-right: 15px;
  font-size: 14px;
`;
