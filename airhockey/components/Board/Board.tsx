/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useRef } from 'react';

import { IMouse } from '../../types/MouseTypes';
import { IStick } from '../../types/Sticks';

import {
  GameWrapperDiv,
  GameWrapperTitleP,
  BoardContainerDiv,
  LeftGatesDiv,
  RightGatesDiv,
  WrapperCirclesLeftDiv,
  WrapperCirclesLeftUpperSpan,
  WrapperCirclesLeftLowerSpan,
  LineLeftCenterSpan,
  BoardCircleCenterDiv,
  BoardCircleCenterInnerDiv,
  BoardCircleCenterInnerDotDiv,
  LineRightCenterSpan,
  WrapperCirclesRightDiv,
  WrapperCirclesRightUpperSpan,
  WrapperCirclesRightLowerSpan,
  BoardScoreDiv,
  BoardScoreLeftDiv,
  BoardScoreRightDiv,
  ScoreLeftSpan,
  ScoreRightSpan,
  CanvasContainer,
} from './index';

export const Board = () => {
  const [titleStatus, setTitleStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [mouse] = useState<IMouse>({
    x: 0,
    y: 0,
    isPressed: false,
    isDown: false,
    isUp: false,
    over: false,
  });
  const [widthBoard] = useState<number>(1774);
  const [heightBoard] = useState<number>(723);

  const [centerBoardX] = useState<number>(widthBoard / 2);
  const [centerBoardY] = useState<number>(heightBoard / 2);

  const [stickLefttInitPos] = useState<IStick>({
    x: widthBoard / 4,
    y: centerBoardY,
  });
  const [stickRightInitPos] = useState<IStick>({
    x: widthBoard / 1.35,
    y: centerBoardY,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleTitleGame = () => {
    setGameStatus(true);
  };
  const handleTitle = () => {
    setTitleStatus(!titleStatus);
  };

  const initialCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx === null || ctx === undefined) {
      return;
    }
    const washerInitialPosition = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx?.beginPath();
      ctx?.arc(x, y, 43, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'black';
      ctx!.shadowBlur = 5;
      ctx!.shadowColor = 'black';
      ctx!.closePath();
      ctx!.fill();
    };
    washerInitialPosition(centerBoardX, centerBoardY);

    const stickLeftInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, 80, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'blue';
      ctx!.shadowColor = 'black';
      ctx?.closePath();
      ctx?.fill();
    };
    stickLeftInitialPosition(stickLefttInitPos.x, stickLefttInitPos.y);

    const stickRightInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, 80, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'red';
      ctx!.shadowColor = 'black';
      ctx!.shadowBlur = 1;
      ctx?.closePath();
      ctx?.fill();
    };
    stickRightInitialPosition(stickRightInitPos.x, stickRightInitPos.y);

    requestAnimationFrame(initialCanvas);
  };
  const mousemoveHandler = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    mouse.x = event.clientX - rect!.left;
    mouse.y = event.clientY - rect!.top;
    if (mouse.x < centerBoardX - 80 && mouse.x > 85 && mouse.y < heightBoard - 80 && mouse.y > 75) {
      stickLefttInitPos.x = mouse.x;
      stickLefttInitPos.y = mouse.y;
    }
    if (
      mouse.x > centerBoardX + 80 &&
      mouse.x < widthBoard - 80 &&
      mouse.y < heightBoard - 80 &&
      mouse.y > 80
    ) {
      stickRightInitPos.x = mouse.x;
      stickRightInitPos.y = mouse.y;
    }
  };
  const mouseleaveHandler = () => {
    mouse.over = false;
  };
  const mouseenterHandler = () => {
    mouse.over = true;
  };
  // const update = () => {
  //   mouse.isDown = false;
  //   mouse.isUp = false;
  // };
  // const animate = () => {
  //   requestAnimationFrame(animate);
  //   // console.log(mouse.isUp + '- ' + mouse.isPressed );
  //   update();
  // };

  const listener = () => {
    canvasRef.current?.addEventListener('mousemove', mousemoveHandler);
    canvasRef.current?.addEventListener('mouseleave', mouseleaveHandler);
    canvasRef.current?.addEventListener('mouseenter', mouseenterHandler);
  };
  // const clickedStick = (e) => {
  //   console.log(e);
  //   if (mouse.x < stickLefttInitPos.x + 80 && mouse.x > stickLefttInitPos.x - 80 && mouse.y > stickLefttInitPos.y - 80 && mouse.y < stickLefttInitPos.y + 80) {
  //     console.log('stick');
  //   } else if (
  //     mouse.x < stickRightInitPos.x + 80 &&
  //     mouse.x > stickRightInitPos.x - 80 &&
  //     mouse.y > stickRightInitPos.y - 80 &&
  //     mouse.y < stickRightInitPos.y + 80
  //   ) {
  //     // console.log('stick2');
  //   }
  // };

  useEffect(() => {
    const timer = setInterval(handleTitle, 1000);
    if (mouse.x !== 0) {
      handleTitleGame();
      return () => clearInterval(timer);
    }
  }, [titleStatus]);

  useEffect(() => {
    listener();
    requestAnimationFrame(initialCanvas);
  }, [stickLefttInitPos.x, stickLefttInitPos.y, stickRightInitPos.x, stickRightInitPos.y]);

  return (
    <GameWrapperDiv>
      <GameWrapperTitleP titleStatus={titleStatus} gameStatus={gameStatus}>
        {gameStatus ? 'GAME TIME!' : 'Hover over the club to control the trajectory of movement'}
      </GameWrapperTitleP>
      <BoardContainerDiv>
        <LeftGatesDiv />
        <WrapperCirclesLeftDiv>
          <WrapperCirclesLeftUpperSpan />
          <WrapperCirclesLeftLowerSpan />
        </WrapperCirclesLeftDiv>
        <LineLeftCenterSpan />
        <BoardCircleCenterDiv>
          <BoardCircleCenterInnerDiv>
            <BoardCircleCenterInnerDotDiv />
          </BoardCircleCenterInnerDiv>
        </BoardCircleCenterDiv>
        <LineRightCenterSpan />
        <WrapperCirclesRightDiv>
          <WrapperCirclesRightUpperSpan />
          <WrapperCirclesRightLowerSpan />
        </WrapperCirclesRightDiv>
        <RightGatesDiv />
        <CanvasContainer ref={canvasRef} width={`${widthBoard}px`} height={`${heightBoard}px`} />
      </BoardContainerDiv>
      <BoardScoreDiv>
        <BoardScoreLeftDiv>
          <ScoreLeftSpan>0</ScoreLeftSpan>
        </BoardScoreLeftDiv>
        <BoardScoreRightDiv>
          <ScoreRightSpan>0</ScoreRightSpan>
        </BoardScoreRightDiv>
      </BoardScoreDiv>
    </GameWrapperDiv>
  );
};
