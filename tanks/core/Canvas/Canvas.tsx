import React, { useRef, useEffect } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../config';
// import { playerPrimary } from '../tileMap';
import World from '../World/World';
import image from '../../assents/graphics/sprite.png';
// import controllTank from '../World/controllTank';
import drawTank from '../drraw/drawTank';

// import frameRenderer from './frameRenderer';
// import { Direction } from '../Models/Tank';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const activeKeys = useRef(new Set());
  const size = { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
  const gameWorld = useRef(new World()).current;

  const img = new Image();
  img.src = image.src;

  const renderFrame = () => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawTank(img, ctx, gameWorld.playerTank_1, activeKeys.current);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    activeKeys.current.add(event.code);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    activeKeys.current.delete(event.code);
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
