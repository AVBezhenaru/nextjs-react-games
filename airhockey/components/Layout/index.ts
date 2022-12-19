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
const aitf = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;
export const CanvasLayout = styled.canvas`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
`;
export const WrapperLayoutMain = styled.div`
  position: relative;
  background: linear-gradient(to bottom right, #000, #3d232a);
  width: 100%;
  overflow: hidden;
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
  @media (max-width: 1360px) {
    padding-right: 50px;
  }
  @media (max-width: 1260px) {
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
  margin-top: 124px;
  margin-bottom: 140px;
  color: rgb(167, 27, 136);
  z-index: 2;
  width: 100%;
  font-family: myFirstFont;
  letter-spacing: 1.1px;
  padding: 100px 53px 63px;
  display: block;
  text-shadow: 0 0 80px rgb(229 23 96);
  background: rgb(167, 27, 136);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${aitf} 10s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  @media (max-width: 925px) {
    font-size: 150px;
  }
  @media (max-width: 1000px) {
    font-size: 120px;
  }
  @media (max-width: 800px) {
    font-size: 90px;
  }
  @media (max-width: 580px) {
    font-size: 50px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
