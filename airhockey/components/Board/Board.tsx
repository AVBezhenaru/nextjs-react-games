/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useRef } from 'react';

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
  GameOverP,
} from './index';

export const Board = () => {
  const [widthBoard] = useState(1414);
  const [heightBoard] = useState(723);
  const [centerX] = useState(widthBoard / 2);

  const [titleStatus, setTitleStatus] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameOverStatus] = useState(false);

  const [washer] = useState({
    x: widthBoard / 2,
    y: heightBoard / 2,
    dx: 5,
    dy: 5,
  });
  const [mouseLeft] = useState<IStick>({
    x: widthBoard / 4,
    y: heightBoard / 2,
    prevX: 1,
    prevY: 1,
    dx: 0,
    dy: 0,
    score: 0,
  });
  const [mouseRight] = useState<IStick>({
    x: widthBoard / 1.35,
    y: heightBoard / 2,
    prevX: 10,
    prevY: 10,
    dx: 0,
    dy: 0,
    score: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleTitleGame = () => {
    setGameStatus(true);
  };
  const handleTitle = () => {
    setTitleStatus(!titleStatus);
  };

  const animate = () => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx === null || ctx === undefined) {
      return;
    }
    const washerInitialPosition = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx?.beginPath();
      ctx?.arc(x, y, widthBoard * 0.04, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'black';
      ctx!.shadowBlur = 5;
      ctx!.shadowColor = 'black';
      ctx!.closePath();
      ctx!.fill();
    };
    washerInitialPosition(washer.x, washer.y);

    const stickLeftInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, 80, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'blue';
      ctx!.shadowColor = 'black';
      ctx?.closePath();
      ctx?.fill();
    };
    stickLeftInitialPosition(mouseLeft.x, mouseLeft.y);

    const stickRightInitialPosition = (x: number, y: number) => {
      ctx?.beginPath();
      ctx?.arc(x, y, 80, 0, (Math.PI / 180) * 360);
      ctx!.fillStyle = 'red';
      ctx!.shadowColor = 'black';
      ctx!.shadowBlur = 1;
      ctx?.closePath();
      ctx?.fill();
    };
    stickRightInitialPosition(mouseRight.x, mouseRight.y);

    requestAnimationFrame(animate);
  };

  const mousemoveHandler = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (
      event.clientX - rect!.left < centerX - 80 &&
      event.clientY - rect!.top > 80 &&
      event.clientX - rect!.left > 80 &&
      event.clientY - rect!.top < heightBoard - 80
    ) {
      mouseLeft.x = event.clientX - rect!.left;
      mouseLeft.y = event.clientY - rect!.top;

      mouseLeft.dx = mouseLeft.x - mouseLeft.prevX;
      mouseLeft.dy = mouseLeft.y - mouseLeft.prevY;

      mouseLeft.prevX = mouseLeft.x;
      mouseLeft.prevY = mouseLeft.y;
    } else if (
      event.clientX - rect!.left > centerX + 80 &&
      event.clientY - rect!.top < heightBoard - 80 &&
      event.clientY - rect!.top > 80 &&
      event.clientX - rect!.left < widthBoard - 80
    ) {
      mouseRight.x = event.clientX - rect!.left;
      mouseRight.y = event.clientY - rect!.top;

      mouseRight.dx = mouseRight.x - mouseRight.prevX;
      mouseRight.dy = mouseRight.y - mouseRight.prevY;

      mouseRight.prevX = mouseRight.x;
      mouseRight.prevY = mouseRight.y;
    }
  };

  const update = () => {
    washer.x += washer.dx;
    washer.y += washer.dy;

    const a = Math.abs(washer.x - mouseLeft.x);
    const b = Math.abs(washer.y - mouseLeft.y);
    const c = Math.sqrt(a ** 2 + b ** 2);

    const a2 = Math.abs(washer.x - mouseRight.x);
    const b2 = Math.abs(washer.y - mouseRight.y);
    const c2 = Math.sqrt(a2 ** 2 + b2 ** 2);

    if (washer.x + widthBoard * 0.04 > widthBoard || washer.x - widthBoard * 0.04 < 0) {
      washer.dx *= -1;
      if (washer.x > 0 && washer.x < 150 && washer.y > 200 && washer.y < 470) {
        mouseLeft.score += 1;
        washer.x *= -2;
        washer.x = centerX;
      }
      if (
        washer.x > widthBoard - 150 &&
        washer.x < widthBoard &&
        washer.y > 180 &&
        washer.y < 470
      ) {
        mouseRight.score += 1;
        washer.x *= 2;
        washer.x = centerX;
        washer.dx += -0.1;
      }
    }
    if (washer.y + widthBoard * 0.04 > heightBoard || washer.y - widthBoard * 0.04 < 0) {
      washer.dy *= -1;
    }
    if (c < widthBoard * 0.04 + widthBoard * 0.05) {
      mouseLeft.dx === 0 ? (washer.dx *= -1) : (washer.dx += mouseLeft.dx * 0.5);
      mouseLeft.dy === 0 ? (washer.dy *= -1) : (washer.dy += mouseLeft.dy * 0.5);
    }
    if (c2 < widthBoard * 0.04 + widthBoard * 0.05) {
      mouseRight.dx === 0 ? (washer.dx *= -1) : (washer.dx -= mouseRight.dx * 0.1);
      mouseRight.dy === 0 ? (washer.dy *= -1) : (washer.dy -= mouseRight.dy * 0.1);
    }
    requestAnimationFrame(update);
  };

  const listener = () => {
    canvasRef.current?.addEventListener('mousemove', mousemoveHandler);
  };

  useEffect(() => {
    listener();
    requestAnimationFrame(animate);
  }, [mouseLeft.x, mouseLeft.y, mouseRight.x, mouseRight.y]);

  useEffect(() => {
    const timer = setInterval(handleTitle, 1000);
    if (mouseLeft.prevX || mouseRight.prevX) {
      handleTitleGame();
      return () => clearInterval(timer);
    }
  }, [titleStatus]);

  useEffect(() => {
    requestAnimationFrame(update);
  }, []);

  return (
    <GameWrapperDiv>
      <GameWrapperTitleP titleStatus={titleStatus} gameStatus={gameStatus}>
        {gameStatus ? 'GAME TIME!' : 'Hover over the club to control the trajectory of movement'}
      </GameWrapperTitleP>
      <GameOverP gameOverStatus={gameOverStatus}>GAME OVER</GameOverP>
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
          <ScoreLeftSpan>{mouseLeft.score}</ScoreLeftSpan>
        </BoardScoreLeftDiv>
        <BoardScoreRightDiv>
          <ScoreRightSpan>{mouseRight.score}</ScoreRightSpan>
        </BoardScoreRightDiv>
      </BoardScoreDiv>
    </GameWrapperDiv>
  );
};
