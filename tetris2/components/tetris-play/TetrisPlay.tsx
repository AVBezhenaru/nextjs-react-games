import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import throttle from 'lodash.throttle';

import PlayField from '../playfield/playfield';
import NextDetails from '../next-details/next-details';
import GameScore from '../game-score/gamescore';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Notification from '../notification/notification';
import {
  move,
  moveDown,
  updateNextPiece,
  setNextDetail,
  updateActivePiece,
  updateDetailPostion,
  checkCollided,
  startGame,
  checkRows,
  countScore,
  changeDropTime,
  countLevel,
} from '../../store/tetrisSlice';
import Button from '../button/button';

import styles from './tetris-play.module.scss';

function TetrisPlay() {
  const dispatch = useAppDispatch();
  const isGameOver = useAppSelector((state) => state.tetris.isGameOver);
  const detailCollided = useAppSelector((state) => state.tetris.detail.collided);
  const nextDetail = useAppSelector((state) => state.tetris.nextDetail);
  const linesCleared = useAppSelector((state) => state.tetris.linesCleared);
  const dropTime = useAppSelector((state) => state.tetris.dropTime);
  const levelCount = useAppSelector((state) => state.tetris.levelCount);
  const score = useAppSelector((state) => state.tetris.score);
  
  const handleMoveDown = useCallback(() => {
    dispatch(moveDown());
    dispatch(updateDetailPostion());
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      console.log('dropInUse', dropTime);
      const id = setInterval(() => handleMoveDown(), dropTime);
      return () => clearInterval(id);
    }
  }, [isGameOver, dropTime, score]);

  // отслеживаем навигацию пользователя - через handleKeyPress на window
  const handleKeyPress = useCallback(
    throttle((event: any) => {
      dispatch(checkCollided(event.code));
      dispatch(move(event.code));
      dispatch(updateDetailPostion());
    }, 150),
    [],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (detailCollided) {
      dispatch(updateActivePiece()); // замена текущей детали на следующую
      dispatch(updateNextPiece()); // обновление след детали - обязательно в отд. функцию, т.к. иначе поле next будет показывать текущую деталь
    }
  }, [detailCollided]);

  // отрисовка сл детали
  useEffect(() => {
    dispatch(setNextDetail());
  }, [nextDetail]);

  useEffect(() => {
    if (detailCollided) {
      dispatch(checkRows());
      dispatch(countScore());
      dispatch(countLevel());
      dispatch(changeDropTime());
    }
     }, [detailCollided]);

  return (
    <div className={styles.container}>
      {isGameOver && (
        <>
          <Notification text="Game over" />
          <Link href="/tetris/game">
            <a onClick={() => dispatch(startGame())}>
              <Button theme="restart">Restart</Button>
            </a>
          </Link>
          <Link href="/tetris">
            <a>
              <Button theme="exit">Exit</Button>
            </a>
          </Link>
        </>
      )}
      <PlayField />
      <div className={styles['playfield_inner-wrapper']}>
        <NextDetails />
        <GameScore />
      </div>
    </div>
  );
}

export default TetrisPlay;
