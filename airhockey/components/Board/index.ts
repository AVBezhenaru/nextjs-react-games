import styled from 'styled-components';

export const GameWrapperDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
  height: 969px;
  background: linear-gradient(to bottom right, #000, #512934);
`;
export const GameWrapperTitleP = styled.p<{ titleStatus: boolean; gameStatus: boolean }>`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => (props.titleStatus || props.gameStatus ? '#efcd8e' : 'gray')};
  margin-bottom: 10px;
  transition: 1s;
`;
export const BoardContainerDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1440px;
  height: 750px;
  border-radius: 50px;
  border: 13px solid rgb(58 57 57);
  background-color: #efecf9;
  box-shadow: inset 0px 2px 6px 0px black;
`;
export const CanvasContainer = styled.canvas`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 35px;
`;
export const LeftGatesDiv = styled.div`
  position: absolute;
  top: 28%;
  left: 0px;
  width: 150px;
  height: 300px;
  border-top-right-radius: 100%;
  border-bottom-right-radius: 100%;
  border: 10px dashed #7c7c9d;
  border-left: 0px solid rgb(58 57 57);
`;
export const RightGatesDiv = styled.div`
  position: absolute;
  top: 28%;
  right: 0px;
  width: 150px;
  height: 300px;
  border-top-left-radius: 100%;
  border-bottom-left-radius: 100%;
  border: 10px dashed #7c7c9d;
  border-right: 0px solid rgb(58 57 57);
`;
export const WrapperCirclesLeftDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  max-width: 572px;
  width: 100%;
`;
export const WrapperCirclesRightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  max-width: 572px;
  width: 100%;
`;
export const WrapperCirclesLeftUpperSpan = styled.span`
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid rgb(248, 159, 159);
`;
export const WrapperCirclesRightUpperSpan = styled.span`
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid rgb(248, 159, 159);
`;
export const WrapperCirclesLeftLowerSpan = styled.span`
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid rgb(248, 159, 159);
`;
export const WrapperCirclesRightLowerSpan = styled.span`
  display: inline-block;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid rgb(248, 159, 159);
`;
export const LineLeftCenterSpan = styled.span`
  position: absolute;
  top: 0;
  left: 35%;
  width: 2px;
  height: 100%;
  background-color: rgb(196 196 233);
`;
export const LineRightCenterSpan = styled.span`
  position: absolute;
  top: 0;
  right: 35%;
  width: 2px;
  height: 100%;
  background-color: rgb(196 196 233);
`;
export const BoardCircleCenterDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid rgb(209, 128, 128);
  display: flex;
  justify-content: center;
  align-items: center;
  ::after {
    content: '';
    position: absolute;
    border: 1px dashed rgb(209, 128, 128);
    height: 40%;
    top: 0;
  }
  ::before {
    content: '';
    position: absolute;
    border: 1px dashed rgb(209, 128, 128);
    height: 40%;
    bottom: 0;
  }
`;
export const BoardCircleCenterInnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px solid rgb(209, 128, 128);
`;
export const BoardCircleCenterInnerDotDiv = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(209, 128, 128);
  border: 2px solid rgb(209, 128, 128);
`;
export const BoardScoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 442px;
  width: 100%;
  height: 100px;
  border: 2px solid black;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: rgb(43, 42, 42);
`;
export const BoardScoreLeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid black;
`;
export const ScoreLeftSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  letter-spacing: 1px;
  border: 4px solid #41423e;
  border-radius: 5px;
  color: white;
`;
export const BoardScoreRightDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-right: 1px solid black;
  border-bottom-right-radius: 45px;
`;
export const ScoreRightSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  letter-spacing: 1px;
  border: 4px solid #41423e;
  border-radius: 5px;
  color: white;
`;
export const GameOverP = styled.p<{ gameOverStatus: boolean }>`
  display: ${(props) => (props.gameOverStatus ? 'block' : 'none')};
  color: #efcd8e;
  font-size: 24px;
  font-weight: 800;
`;
