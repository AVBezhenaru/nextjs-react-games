import React, { useRef, useEffect } from 'react';

import { FIELD_SIZE } from '../../config';
import World from '../World/World';
import image from '../../assents/graphics/sprite.png';
import drawTank from '../drraw/drawTank';
import { drawLand } from '../drraw/drawLand';

import styles from './canvas.module.scss';

const Canvas = ({ ...props }) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const activeKeys = useRef(new Set());
  const size = { width: FIELD_SIZE, height: FIELD_SIZE };
  const gameWorld = useRef(new World()).current;

  const img = new Image();
  img.src = image.src;

  const renderFrame = () => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, FIELD_SIZE, FIELD_SIZE);
    drawTank(img, ctx, gameWorld.playerTank_1, activeKeys.current);
    // drawLand(img, ctx, gameWorld.land);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    canvasRef.current.focus();
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
