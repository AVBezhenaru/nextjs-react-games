/* eslint-disable array-callback-return */
import React, { useRef, useEffect } from 'react';

import { FIELD_SIZE } from '../../config';
import World from '../World/World';
import image from '../../assents/graphics/sprite.png';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const activeKeys = useRef(new Set());
  const size = { width: FIELD_SIZE, height: FIELD_SIZE };
  let gameWorld = useRef(null).current;

  const loop = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    gameWorld.render();
    requestIdRef.current = requestAnimationFrame(() => loop(ctx));
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    canvasRef.current.focus();
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      gameWorld = new World(ctx, img);
      gameWorld.renderOnce();
      requestIdRef.current = requestAnimationFrame(() => loop(ctx));
    };
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    activeKeys.current.add(event.code);
    gameWorld.controll(activeKeys.current);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    activeKeys.current.delete(event.code);
    gameWorld.controll(activeKeys.current);
  };

  return (
    <canvas
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      ref={canvasRef}
      tabIndex={0}
      {...size}
      className={styles.canvas}
      {...props}
    />
  );
};

export default Canvas;
