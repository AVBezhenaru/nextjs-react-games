import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';

import Fruits from '../Fruits/Fruits';
import GameOver from '../GameOver/GameOver';
import { Fruit, GameProps } from '../../types/types';

import styles from './Board.module.scss';

const Board = ({ onFruitSliced, score }: GameProps) => {
  const [fruitsScreen, setFruitsScreen] = useState<Fruit[]>([]);
  const allFruits = ['apple', 'banana', 'boom', 'peach', 'strawberry', 'watermelon'];
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardDimensions, setBoardDimensions] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
  }>({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const [isBoom, setIsBoom] = useState<boolean>(false);
  const [time, setTime] = useState<number>(120);

  const updateBoardDimensions = useCallback(() => {
    const board = boardRef.current?.getBoundingClientRect();
    if (board) {
      setBoardDimensions({
        width: board.width,
        height: board.height,
        left: board.left,
        top: board.top,
      });
    }
  }, [boardRef]);

  const memoizedUpdateBoardDimensions = useMemo(
    () => updateBoardDimensions,
    [updateBoardDimensions],
  );

  useEffect(() => {
    updateBoardDimensions();
    window.addEventListener('resize', updateBoardDimensions);
    return () => {
      window.removeEventListener('resize', updateBoardDimensions);
    };
  }, [memoizedUpdateBoardDimensions]);

  const handleMove = useCallback(
    (id: string) => {
      setFruitsScreen((prev) =>
        prev.map((fruit) => {
          if (fruit.id === id) {
            if (fruit.type === 'boom') {
              setIsBoom(true);
            }
            if (fruit.id === id) {
              onFruitSliced();
              return { ...fruit, isSliced: true };
            }
          }
          return fruit;
        }),
      );
    },
    [setFruitsScreen, setIsBoom, onFruitSliced],
  );

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, []);

  const generateFruits = useCallback(() => {
    const interval = allFruits[Math.floor(Math.random() * allFruits.length)];
    const x = Math.random() * boardDimensions.width;
    const y = boardDimensions.top + boardDimensions.height;
    setFruitsScreen((prev) => [...prev, { id: nanoid(), type: interval, x, y, isSliced: false }]);
  }, [allFruits, boardDimensions]);

  const memoizedGenerateFruits = useMemo(() => generateFruits, [generateFruits]);

  useEffect(() => {
    if (!isBoom) {
      const intervalId = setInterval(memoizedGenerateFruits, Math.random() * 500);
      return () => clearInterval(intervalId);
    }
  }, [memoizedGenerateFruits, isBoom]);

  useEffect(() => {
    const GRAVITY = 0.2;
    let animationId: number;

    const moveFruits = () => {
      if (!isBoom) {
        setFruitsScreen((prev) =>
          prev
            .map((fruit) => {
              const curve = 250;
              const y = fruit.y - 10;
              const x = fruit.x + Math.sin(fruit.y / curve) * 4;
              if (boardRef.current) {
                if (y - 80 > boardRef.current.clientHeight) {
                  const stopPoint = boardRef.current.clientHeight - 130;
                  return { ...fruit, y: stopPoint, speed: Math.random() * -5 };
                }
                if (x + 50 > boardRef.current.clientWidth) {
                  const stopPoint = boardRef.current.clientHeight;
                  return { ...fruit, y: stopPoint, speed: 0 };
                }
              }
              const speed = (fruit.speed || 0) + GRAVITY;
              return { ...fruit, x, y: y + speed, speed };
            })
            .filter((fruit) => fruit.y < (boardRef.current?.clientHeight || 0)),
        );
        animationId = requestAnimationFrame(moveFruits);
      }
    };
    animationId = requestAnimationFrame(moveFruits);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isBoom]);

  useEffect(() => {
    if (time > 0 && !isBoom) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  if (time === 0) {
    return <GameOver score={score} />;
  }

  return (
    <div ref={boardRef} className={`${styles.field}`}>
      <div className={styles.time}>{formatTime(time)}</div>
      {fruitsScreen.map((fruit) => (
        <Fruits
          key={fruit.id}
          type={fruit.type}
          x={fruit.x}
          y={fruit.y}
          isSliced={fruit.isSliced}
          onMouseMove={() => handleMove(fruit.id)}
          score={score}
        />
      ))}
    </div>
  );
};

export default Board;
