import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 25px;
  background-color: #e8e8e8;
  min-height: 100vh;
  width: 100%;
  gap: 25px;
`;

export const VerticalPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  gap: 25px;
  padding: 25px;
  margin: 0;
  background-color: white;
  border-radius: 25px;
  // width: 650px;
  shadow:-webkit-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  -moz-box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
  box-shadow: 0px 0px 14px 4px rgba(34, 60, 80, 0.16);
`;

export const HorizontalPanel = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  border-radius: 25px;
`;

export const UserTable = styled.div`
  height: 470px;
`;
