import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  gap: 15px;
  margin: 50px 30px 50px 230px;
  transition: all 0.25s linear;
  position: relative;
  overflow-y: hidden;
`;

export const Friend = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  background-color: white;
`;

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 760px;
  height: 700px;
  color: #646464;
  background-color: white;
`;

export const SelectFriend = styled.div`
  padding: 10px 20px;
  height: 10%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.11);
`;
export const FullChat = styled.div`
  padding: 20px;
  height: 85%;
`;
export const SentMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(128, 128, 128, 0.11);
`;
export const InputMessage = styled.textarea`
  position: relative;
  overflow: hidden;
  resize: none;
  outline: none;
  width: 500px;
  border: none;
  padding: 5px 10px;
  border-radius: 25px;
  background: #f5f5f5;
`;
