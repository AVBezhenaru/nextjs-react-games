import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import classes from '../styles/word-row.module.scss';

import LetterBox from './letter-box';

const WordRow: React.FC<{ tryIndex: number; childClass: boolean }> = ({ tryIndex, childClass }) => {
  const { challengeWordArr, inputWord } = useSelector((state: RootState) => state.wordleSlice);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      scope.current,
      {
        y: '200vh',
        opacity: 0,
        rotate: Math.floor(Math.random() * (50 - 10 + 1) + 10),
      },
      { duration: 1 },
    ).then(() => {
      animate(
        scope.current,
        {
          y: '-100vh',
          rotate: 0,
        },
        { duration: 0 },
      ).then(() => {
        animate(
          scope.current,
          {
            opacity: 1,
            y: '0%',
          },
          { duration: 0.2 },
        );
      });
    });
  }, [challengeWordArr]);

  return (
    <div ref={scope}>
      <div className={classes.wordRow}>
        {challengeWordArr.map((_, index) => (
          <LetterBox key={index} index={index} tryIndex={tryIndex} childClass={childClass}>
            {inputWord[tryIndex][index]}
          </LetterBox>
        ))}
      </div>
    </div>
  );
};

export default WordRow;
