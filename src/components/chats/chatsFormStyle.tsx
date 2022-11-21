import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  gap: 15px;
  margin: 50px 30px 50px 230px;
  transition: all 0.25s linear;
  position: relative;
  overflow-y: hidden;
`

export const Friend = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  background-color: white;
`


export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 760px;
  height: 700px;
  background-color: white;
`

export const SelectFriend = styled.div`
  padding: 10px 20px;
  height: 50px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.11);
`
export const FullChat = styled.div`
  padding: 20px;
`