import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 50px 30px 50px 230px;
  overflow-y: hidden;
  overflow-x: hidden;
`;
export const DivSearch = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 1440px;
  padding: 20px;
`;

export const SelectFilter = styled.div`
  width: 150px;
  padding: 0 10px;
`;
export const FriendItem = styled.div`
  width: calc((100% / 3 - 14px));
  border-radius: 10px;
  height: 70px;
  background-color: white;
`;
export const DivFriends = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 1440px;
  background-color: transparent;
`;
export const Search = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 20px;
  border-radius: 5px;
  background: #f5f5f5;
  border: 1px solid #e4e7eb;
  outline: none;
  z-index: 2;
`;
