import Popup from "reactjs-popup";
import styled from "styled-components";

export const App = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Board = styled.div`
  ${() => `width: calc(64px * 8);`}
  ${() => `height: calc(64px * 8);`}
  display: flex;
  flex-wrap: wrap;
`;

export const Cell = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

export const FigureLogo = styled.img`
  position: relative;
`;

export const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"

  &-overlay {
    overflow: hidden;
  }

  // use your custom style for ".popup-content"

  &-content {
    background-color: white;
    border: 2px solid black;
    width: 50vw;
    padding: 1%;
    overflow-y: auto;
    height: 85vh;
  }
`;

export const StyledPopupButton = styled.button`
  position: absolute;
  top: 2%;
  left: 1%;
  background-color: black;
  color: white;
  font-size: 15px;
  padding: 10px 40px;
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

export const CurrentPlayerText = styled.h3`
  color: black;
  font-size: 15px;
  position: absolute;
  top: 3%;
  margin: 0;
  right: 1%;
`;

export const StyledLostFigures = styled.div`
  margin: 50px auto 0px 10px;
`;