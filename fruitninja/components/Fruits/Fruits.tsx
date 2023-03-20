import React from 'react';

import GameOver from '../GameOver/GameOver';
import { BoardProps } from '../../types/types';

import styles from './Fruits.module.scss';

const Fruits = ({ type, x, y, isSliced, onMouseMove, score }: BoardProps) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  const changeFruits = () => {
    switch (type) {
      case 'apple':
        if (isSliced) {
          return (
            <>
              <div
                className={`${styles.slicedApple1} ${styles.slice1Anim}`}
                style={{ ...style, left: x - 30 }}
              />
              <div
                className={`${styles.slicedApple2} ${styles.slice2Anim}`}
                style={{ ...style, left: x + 30 }}
              />
            </>
          );
        }
        return <div className={styles.apple} style={style} onMouseMove={onMouseMove} />;
      case 'banana':
        if (isSliced) {
          return (
            <>
              <div
                className={`${styles.slicedBanana1} ${styles.slice1Anim}`}
                style={{ ...style, left: x - 20 }}
              />
              <div
                className={`${styles.slicedBanana2} ${styles.slice2Anim}`}
                style={{ ...style, left: x + 10 }}
              />
            </>
          );
        }
        return <div className={styles.banana} style={style} onMouseMove={onMouseMove} />;
      case 'peach':
        if (isSliced) {
          return (
            <>
              <div
                className={`${styles.slicedPeach1} ${styles.slice1Anim}`}
                style={{ ...style, left: x - 30 }}
              />
              <div
                className={`${styles.slicedPeach2} ${styles.slice2Anim}`}
                style={{ ...style, left: x + 30 }}
              />
            </>
          );
        }
        return <div className={styles.peach} style={style} onMouseMove={onMouseMove} />;
      case 'strawberry':
        if (isSliced) {
          return (
            <>
              <div
                className={`${styles.slicedStrawberry1} ${styles.slice1Anim}`}
                style={{ ...style, left: x - 15 }}
              />
              <div
                className={`${styles.slicedStrawberry2} ${styles.slice2Anim}`}
                style={{ ...style, left: x + 15 }}
              />
            </>
          );
        }
        return <div className={styles.strawberry} style={style} onMouseMove={onMouseMove} />;
      case 'watermelon':
        if (isSliced) {
          return (
            <>
              <div
                className={`${styles.slicedWatermelon1} ${styles.slice1Anim}`}
                style={{ ...style, left: x - 20 }}
              />
              <div
                className={`${styles.slicedWatermelon2} ${styles.slice2Anim}`}
                style={{ ...style, left: x + 30 }}
              />
            </>
          );
        }
        return <div className={styles.watermelon} style={style} onMouseMove={onMouseMove} />;
      case 'boom':
        if (isSliced) {
          return <GameOver score={score === 0 ? 0 : score - 1} />;
        }
        return <div className={styles.boom} style={style} onMouseMove={onMouseMove} />;
      default:
        return <> </>;
    }
  };

  return changeFruits();
};

export default Fruits;
