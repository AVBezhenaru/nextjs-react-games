import Popup from "reactjs-popup";
import styled from "styled-components";
import './globals.scss'

export const App = styled.div`
  // height: 100vh;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // margin: 0;
  // top: 0;

`;

export const Container = styled.div`
  max-width: 1680px;
  padding: 0 15px;
  margin: 0 auto;
`;

export const HeaderLogo = styled.img`
  vertical-align: bottom;
  width: 50px;
  height: 50px;
`;

export const Board = styled.div`
  ${() => `width: calc(74px * 8);`}
  ${() => `height: calc(74px * 8);`}
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
`;

export const Cell = styled.div`
  width: 74px;
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

export const FigureLogo = styled.img`
  position: relative;
`;

export const Settings = styled(Popup)`
  &-overlay {
    // overflow: hidden;
    background-color: rgba(0, 0, 0, .5);
  }

  &-content {
    background-color: white;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.15);
    width: 50vw;
    padding: 1%;
    overflow-y: auto;
    height: 60vh;
    padding: 30px 20px 80px 15px;
  }
`

export const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"

  &-overlay {
    // overflow: hidden;
    background-color: rgba(0, 0, 0, .5);
  }

  // use your custom style for ".popup-content"

  &-content {
    background-color: white;
    // border: 2px solid black;
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.15);
    width: 50vw;
    padding: 1%;
    overflow-y: auto;
    height: 85vh;
  }
`;

export const StyledPopupButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  font-family: 'Audiowide', cursive;
  font-weight: 600;
  color: #646464;
  transition: .3s;
  &:hover{
    color: #000;
  }
`;

export const StyledRestartGame = styled.button`
  // position: absolute;
  top: 6%;
  left: 1%;
  background-color: black;
  color: white;
  font-size: 15px;
  padding: 10px 10px;
  max-width: 180px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledPopupFigureCardsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledPopupFigureCard = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

export const StyledPopupSpan = styled.span`
  display: flex;
  align-items: center;
  width: 170px;
`;

export const StyledAvailableCell = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50%;
`;

export const ImgFigureMove = styled.img`
  display: block;
  margin: 30px auto 30px auto;
`;

export const CurrentPlayerText = styled.div`
  color: black;
  font-size: 25px;
  padding: 20px;
`;

export const StyledLostFigures = styled.div`
  margin: 50px auto 0px 10px;
`;

export const TransformFigure = styled.div`

  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TransformFigureOverlay = styled.div`
  max-width: 500px;
  width: 100%;
  height: 200px;
  background-color: #f1dad0;;
  font-size: 50px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TransformFigureImg = styled.img`
  width: 100px;
  height: 100px;
  transition: .3s;
  cursor: pointer;
  & + & {
    margin-left: 10px;
  }
  &:hover{
    transform: scale(1.2)
  }

`;
