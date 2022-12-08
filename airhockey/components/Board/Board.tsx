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
  CanvasContainer,
} from './index';

export const Board = () => {
  const [titleStatus, setTitleStatus] = useState(false);
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
  // const [sticks, setSticks] = useState<IStickParams>({
  //   clickDown: false,
  //   clickUp: false,
  //   speed: 0,
  // });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleTitle = () => {
    setTitleStatus(!titleStatus);
  };

  const initialCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx === null || ctx === undefined) {
      return;
    }
    const washerInitialPosition = (x: number, y: number) => {
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
  };
  const mousemoveHandler = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    stickLefttInitPos.x = event.clientX - rect!.left;
    stickLefttInitPos.y = event.clientY - rect!.top;
    // console.log(stickLefttInitPos.x, stickLefttInitPos.y);
  };
  const mouseleaveHandler = () => {
    mouse.over = false;
  };
  const mouseenterHandler = () => {
    mouse.over = true;
  };
  const mousedownHandler = (event: MouseEvent) => {
    if (event.type === 'mousedown') {
      mouse.isDown = true;
      mouse.isPressed = true;
      mouse.isUp = false;
    }
  };
  const mouseupHandler = (event: MouseEvent) => {
    if (event.type === 'mouseup') {
      mouse.isDown = false;
      mouse.isPressed = false;
      mouse.isUp = true;
    }
  };
  const update = () => {
    mouse.isDown = false;
    mouse.isUp = false;
  };
  const animate = () => {
    requestAnimationFrame(animate);
    // console.log(mouse.isUp + '- ' + mouse.isPressed );
    update();
  };

  const listener = () => {
    canvasRef.current?.addEventListener('mousemove', mousemoveHandler);
    canvasRef.current?.addEventListener('mouseleave', mouseleaveHandler);
    canvasRef.current?.addEventListener('mouseenter', mouseenterHandler);
    canvasRef.current?.addEventListener('mousedown', mousedownHandler);
    canvasRef.current?.addEventListener('mouseup', mouseupHandler);
  };
  const clickedStick = () => {
    if (
      mouse.x < stickLefttInitPos.x + 80 &&
      mouse.x > stickLefttInitPos.x - 80 &&
      mouse.y > stickLefttInitPos.y - 80 &&
      mouse.y < stickLefttInitPos.y + 80
    ) {
      console.log('stick');
    } else if (
      mouse.x < stickRightInitPos.x + 80 &&
      mouse.x > stickRightInitPos.x - 80 &&
      mouse.y > stickRightInitPos.y - 80 &&
      mouse.y < stickRightInitPos.y + 80
    ) {
      // console.log('stick2');
    }
  };

  useEffect(() => {
    const timer = setInterval(handleTitle, 1000);
    return () => clearInterval(timer);
  }, [titleStatus]);

  useEffect(() => {
    listener();
    initialCanvas();
    requestAnimationFrame(animate);
  }, []);

  return (
    <GameWrapperDiv>
      <GameWrapperTitleP titleStatus={titleStatus}>
        Use the left mouse button to control the right player.
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
        <CanvasContainer
          ref={canvasRef}
          width={`${widthBoard}px`}
          height={`${heightBoard}px`}
          onClick={clickedStick}
        />
      </BoardContainerDiv>
      <BoardScoreDiv>
        <BoardScoreLeftDiv />
        <BoardScoreRightDiv />
      </BoardScoreDiv>
    </GameWrapperDiv>
  );
};
