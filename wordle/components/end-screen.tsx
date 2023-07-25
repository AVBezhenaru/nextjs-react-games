import { Button } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import classes from '../styles/end-screen.module.scss';

const EndScreen: React.FC<{ win: boolean; startNew: () => void }> = ({ win, startNew }) => {
  const { challengeWordArr, settings, inputWord } = useSelector(
    (state: RootState) => state.wordleSlice,
  );

  const getForm = () => {
    const num = inputWord.findIndex((el) => el.join('') === '');
    if (num === 1) {
      return `${num} попытку`;
    }
    if (num <= 4) {
      return `${num} попытки`;
    }
    if (num > 4) {
      return `${num} попыток`;
    }
  };

  if (win) {
    return (
      <div className={classes.endScreen}>
        <motion.div
          animate={{
            opacity: [0, 1],
            x: ['-100%', '0%'],
          }}
          className={classes.endCard}
        >
          <div className={classes.header}>УРА, ПОБЕДА!</div>
          <div className={classes.overview}>
            Вы отгадали слово{' '}
            <a href={`https://${settings.lang}.wiktionary.org/wiki/${challengeWordArr.join('')}`}>
              {challengeWordArr.join('')}
            </a>{' '}
            за {getForm()}.
          </div>
          {/* <div className='share'>Отправить это слово другу {share_link}</div> */}
          <Button onClick={startNew}>НАЧАТЬ ЗАНОВО</Button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className={classes.endScreen}>
      <div className={classes.endCard}>
        <div className={classes.header}>ПОРАЖЕНИЕ</div>
        <div className={classes.overview}>
          Искомое слово{' '}
          <a href={`https://${settings.lang}.wiktionary.org/wiki/${challengeWordArr.join('')}`}>
            {challengeWordArr.join('')}
          </a>
        </div>
        {/* <div className='share'>Отправить это слово другу {share_link}</div> */}
        <Button onClick={startNew}>НАЧАТЬ ЗАНОВО</Button>
      </div>
    </div>
  );
};

export default EndScreen;
