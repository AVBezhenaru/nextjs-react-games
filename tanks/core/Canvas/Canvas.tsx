/* eslint-disable array-callback-return */
import React, { useRef, useEffect } from 'react';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../config';
import image from '../../assents/graphics/sprite.png';
import World from '../World/World';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  const requestIdRef = useRef(null);
  const activeKeys = useRef(new Set());
  const size = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  let gameWorld = useRef(null).current;

  const loop = (ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    gameWorld.render();
    requestIdRef.current = requestAnimationFrame(() => loop(ctx, ctx2));
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    const ctx2: CanvasRenderingContext2D = canvasRef2.current.getContext('2d');
    canvasRef.current.focus();
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      gameWorld = new World(ctx, ctx2, img);
      gameWorld.renderStart();
      requestIdRef.current = requestAnimationFrame(() => loop(ctx, ctx2));
    };
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    activeKeys.current.add(event.code);
    gameWorld.controll(activeKeys.current /* KeyW */);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    activeKeys.current.delete(event.code);
    gameWorld.controll(activeKeys.current);
  };

  return (
    <>
      <canvas
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ref={canvasRef}
        tabIndex={0}
        {...size}
        className={styles.canvas}
        {...props}
      />
      <canvas {...size} className={(styles.canvas, styles.top)} ref={canvasRef2} />
    </>
  );
};

export default Canvas;
