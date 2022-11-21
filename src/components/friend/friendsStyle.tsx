import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 50px 30px 50px 230px;
  overflow-y: hidden;
  overflow-x: hidden;
`
export const DivSearch = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 20px;
  
`

export const SelectFilter =styled.div`
  width: 10%;
  height: 40px;
  padding: 0 20px;
  
  
`
export const FriendItem =styled.div`
  width: 550px;
  border-radius: 10px;
  height: 70px;
  background-color: white;
  
`
export const DivFriends =styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: transparent;
  
`
export const Search = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 20px;
  border-radius: 5px;
  background: #F5F5F5;
  border: 1px solid #E4E7EB;
  outline:none;
  z-index: 2;
`

