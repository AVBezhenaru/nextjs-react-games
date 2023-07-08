import React, { useEffect, useRef, FC } from 'react';

import { CANVAS_SIZE, GAME_COLORS } from '../../variables/variables';

import cl from './GameBoard.module.css';

interface GameboardProps {
  snake: number[][];
  apple: number[];
  bomb: number[][];
}

const Gameboard: FC<GameboardProps> = ({ snake, apple, bomb }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = GAME_COLORS.snakeBody;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = GAME_COLORS.snakeHead;
    context.fillRect(snake[0][0], snake[0][1], 1, 1);
    context.fillStyle = GAME_COLORS.apple;
    context.fillRect(apple[0], apple[1], 1, 1);
    context.fillStyle = GAME_COLORS.bombs;
    bomb.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  }, [snake, apple, bomb]);

  return (
    <div>
      <canvas
        className={cl.canvas}
        ref={canvasRef}
        width={CANVAS_SIZE[0]}
        height={CANVAS_SIZE[1]}
      />
    </div>
  );
};

export default Gameboard;
