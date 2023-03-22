import React from 'react';

import GameOver from '../GameOver/GameOver';

import styles from './Fruits.module.scss';

interface BoardProps {
  type: string;
  x: number;
  y: number;
  isSliced: boolean;
  onMouseMove: () => void;
  score: number;
}

const Fruits = ({ type, x, y, isSliced, onMouseMove, score }: BoardProps) => {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  const fruitClass = isSliced
    ? styles[`sliced${type.charAt(0).toUpperCase() + type.slice(1)}1`]
    : styles[type];
  const fruitSlice1Anim = isSliced ? styles.slice1Anim : '';
  const fruitSlice2Anim = isSliced ? styles.slice2Anim : '';

  const changeFruits = () => {
    switch (type) {
      case 'apple':
      case 'banana':
      case 'peach':
      case 'strawberry':
      case 'watermelon':
        return (
          <>
            {isSliced && (
              <>
                <div
                  className={`${fruitClass} ${fruitSlice1Anim}`}
                  style={{ ...style, left: x - 30 }}
                />
                <div
                  className={`${fruitClass.replace(/1$/, '2')} ${fruitSlice2Anim}`}
                  style={{ ...style, left: x + 30 }}
                />
              </>
            )}
            <div className={isSliced ? '' : styles[type]} style={style} onMouseMove={onMouseMove} />
          </>
        );
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
