import React, { useRef, useState, useEffect, KeyboardEvent } from 'react';

import { useInterval } from '../../hooks/useInterval';
import {
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  BOMB_SPAWN_TIME,
  LEVEL_MULTIPLIER,
  APPLE_SPEED,
  DIRECTIONS,
} from '../../variables/variables';
import Modal from '../Modal/Modal';
import MyButton from '../MyButton/MyButton';
import Header from '../Header/Header';
import Gameboard from '../GameBoard/GameBoard';

import cl from './Game.module.css';

const App: React.FC = () => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const [snake, setSnake] = useState<number[][]>(SNAKE_START);
  const [apple, setApple] = useState<number[]>(FIRST_APPLE);
  const [bomb, setBomb] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);

  const scoreCounter = useRef<number>(0);
  const [dir, setDir] = useState<number[]>([1, 0]);
  const lastDir = useRef<number[]>([1, 0]);
  const [speed, setSpeed] = useState<number>(0);
  const [bombSpawnTime, setBombSpawnTime] = useState<number | null>(null);
  const [appleSpeed, setAppleSpeed] = useState<number | null>(null);

  const startGame = () => {
    setSpeed(SPEED);
    setAppleSpeed(APPLE_SPEED);
    setBombSpawnTime(BOMB_SPAWN_TIME);
    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setBomb([]);
    scoreCounter.current = 0;
    setGameOver(false);
    setShowStartButton(false);
  };

  const endGame = () => {
    setSpeed(0);
    setAppleSpeed(null);
    setBombSpawnTime(null);
    setGameOver(true);
  };

  const resetGame = () => {
    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setBomb([]);
    setGameOver(false);
    setShowStartButton(true);
  };

  const moveSnake = (event: Event) => {
    const { key } = event as unknown as KeyboardEvent;
    switch (key) {
      case 'ArrowUp':
        if (lastDir.current[1] !== 0) break;
        setDir(DIRECTIONS[key]);
        break;
      case 'ArrowDown':
        if (lastDir.current[1] !== 0) break;
        setDir(DIRECTIONS[key]);
        break;
      case 'ArrowLeft':
        if (lastDir.current[0] !== 0) break;
        setDir(DIRECTIONS[key]);
        break;
      case 'ArrowRight':
        if (lastDir.current[0] !== 0) break;
        setDir(DIRECTIONS[key]);
        break;
      default:
        break;
    }
  };

  const checkDeadlyEntitiesCollision = (piece: number[]) => {
    const deadlyEntities: number[][] = [...snake, ...bomb];
    for (const segment of deadlyEntities) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const generateOnEmptyField = () => {
    const entityGenerator = () => {
      const randomEntity: number[] = [
        Math.floor(Math.random() * CANVAS_SIZE[0]),
        Math.floor(Math.random() * CANVAS_SIZE[1]),
      ];
      return randomEntity;
    };

    let newEntity = entityGenerator();
    while (checkDeadlyEntitiesCollision(newEntity)) {
      newEntity = entityGenerator();
    }
    return newEntity;
  };

  const checkWallCollision = (piece: number[]) => {
    if (piece[0] >= CANVAS_SIZE[0] || piece[0] < 0 || piece[1] >= CANVAS_SIZE[1] || piece[1] < 0)
      return true;
    return false;
  };

  const checkAppleCollision = (newSnake: number[][]) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      const newApple = generateOnEmptyField();

      if (snake.length % LEVEL_MULTIPLIER === 0) {
        setSpeed(1.25 * speed);
      }

      scoreCounter.current += 10;
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = (time: number) => {
    if (speed === null) return;
    requestRef.current = requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (time - previousTimeRef.current) / 1000;
    if (secondsSinceLastRender < 1 / speed) return;

    lastDir.current = dir;
    const snakeCopy: number[][] = JSON.parse(JSON.stringify(snake)); // deep copy of snake
    const newSnakeHead: number[] = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkDeadlyEntitiesCollision(newSnakeHead) || checkWallCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();

    setSnake(snakeCopy);
    previousTimeRef.current = time;
  };

  useEffect(() => {
    window.addEventListener('keydown', moveSnake);
    return () => window.removeEventListener('keydown', moveSnake);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

  useInterval(() => {
    const newBomb = generateOnEmptyField();
    setBomb((arr) => [...arr, newBomb]);
  }, bombSpawnTime);

  useInterval(() => {
    const newApple = generateOnEmptyField();
    setApple(newApple);
  }, appleSpeed);

  return (
    <div className={cl.app}>
      <div className={cl.container}>
        {gameOver && <Modal points={scoreCounter.current} resetGame={resetGame} />}

        <Header showStartButton={showStartButton} points={scoreCounter.current} />

        <Gameboard snake={snake} apple={apple} bomb={bomb} />

        {showStartButton && (
          <MyButton mainPage onClick={startGame} modal={false}>
            Начать
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default App;
