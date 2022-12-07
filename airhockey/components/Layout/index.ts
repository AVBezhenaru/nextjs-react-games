import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(180deg) scale(0.9);
  }
  50% {
    transform: rotate(250deg) scale(0.5);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;
export const WrapperLayoutMain = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, #000, #3d232a);
  width: 100%;
`;
export const WrapperContent = styled.div`
  position: relative;
  width: 100%;
  min-height: 969px;
  display: flex;
  align-items: flex-end;
  padding-right: 260px;
  justify-content: flex-start;
  flex-direction: column;
  background-repeat: repeat;
  background-size: contain;
  transition: all 100ms;
  transform: perspective(500px);
  @media (max-width: 1180px) {
    padding-right: 0;
  }
`;
export const WrapperImage = styled.div`
  position: absolute;
  top: 10%;
  left: 0%;
`;
export const WrapperSphere = styled.div`
  position: absolute;
  right: 374px;
  top: 31%;
  width: 400px;
  height: 400px;
  filter: blur(150px);
  background: linear-gradient(to bottom right, #f85232, #a2007f);
  animation: ${rotate} 8s cubic-bezier(0.8, 0.2, 0.2, 0.8) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
`;
export const H1 = styled.h1`
  font-size: 170px;
  margin-top: 209px;
  margin-bottom: 187px;
  color: rgb(167, 27, 136);
  z-index: 2;
  width: 100%;
  @media (max-width: 925px) {
    font-size: 150px;
  }
  @media (max-width: 830px) {
    font-size: 120px;
  }
  @media (max-width: 700px) {
    font-size: 90px;
  }
  @media (max-width: 560px) {
    font-size: 50px;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
