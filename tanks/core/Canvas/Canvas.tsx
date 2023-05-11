/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useRef, useEffect } from 'react';

import { store } from '../../../store';
import { tanksGamePause } from '../../reducers/tanksGameAction';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants';
import image from '../../assets/images/sprite.png';
import { World } from '../World/World';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  let gameWorld = useRef(null).current;
  const size = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    canvasRef.current.focus();
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      gameWorld = new World(ctx, img);
    };
    return () => {
      gameWorld = null;
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

export { Canvas };
