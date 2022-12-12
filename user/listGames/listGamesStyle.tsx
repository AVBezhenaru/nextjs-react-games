import styled from 'styled-components';
// import Link from 'next/link';

export const Page = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 50px 30px 50px 230px;
  transition: all 0.25s linear;
  position: relative;
  overflow-y: hidden;
`;

export const Games = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  border-radius: 10px;
  width: 90%;
  max-width: 1440px;
  background-color: white;
`;

export const HeaderGames = styled.div`
  padding: 20px;
  width: 100%;
  text-align: center;
  color: #646464;
  border-bottom: 1px solid rgba(128, 128, 128, 0.11);
`;

export const ListGames = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;
