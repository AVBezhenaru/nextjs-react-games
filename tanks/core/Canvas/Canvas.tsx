import React, { useRef, useEffect } from 'react';

import { FIELD_SIZE } from '../../config';
import World from '../World/World';
import image from '../../assents/graphics/sprite.png';
// import drawTank from '../draw/drawTank';
// import { drawLand } from '../draw/drawLand';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const activeKeys = useRef(new Set());
  const size = { width: FIELD_SIZE, height: FIELD_SIZE };
  let gameWorld = useRef(null).current;

  // const img = new Image();
  // img.src = image.src;

  const loop = (ctx: CanvasRenderingContext2D) => {
    // if (!canvasRef.current) return;
    // ctx.clearRect(0, 0, FIELD_SIZE, FIELD_SIZE);

    // drawTank(img, ctx, gameWorld.playerTank_1, activeKeys.current);
    gameWorld.renderPlayer_1(activeKeys.current);
    requestIdRef.current = requestAnimationFrame(() => loop(ctx));
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    canvasRef.current.focus();
    const img = new Image();
    img.src = image.src;
    img.onload = async () => {
      gameWorld = new World(ctx, img);
      await gameWorld.renderOnce();
      requestIdRef.current = requestAnimationFrame(() => loop(ctx));
    };
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [image]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    activeKeys.current.add(event.code);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    activeKeys.current.delete(event.code);
  };

  console.log('render');

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
