/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect } from 'react';

import { useAppSelector } from '../../../hooks';
import { store } from '../../../store';
import { tanksGamePause } from '../../reducers/tanksGameAction';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants';
import image from '../../assets/images/sprite.png';
import { World } from '../World/World';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  let gameWorld = useRef(null).current;
  const requestIdRef = useRef(null);
  const size = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  const game = useAppSelector((state) => state.tanks);

  const loop = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    requestIdRef.current = requestAnimationFrame(() => loop(ctx));
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    canvasRef.current.focus();
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      gameWorld = new World(ctx, img);
      requestIdRef.current = requestAnimationFrame(() => loop(ctx));
    };
    return () => {
      gameWorld = null;
      console.log(gameWorld);
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter') {
      store.dispatch(tanksGamePause());
    }
  };

  return (
    <canvas
      onKeyDown={onKeyDown}
      ref={canvasRef}
      tabIndex={0}
      {...size}
      className={styles.canvas}
      {...props}
    />
  );
};

export default Canvas;
