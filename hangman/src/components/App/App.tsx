import React, { FC, useEffect } from 'react';

import { bodyParts } from '../../data/data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAppState, resetGame, getWord } from '../../store/reducers/AppSlice';
import ButtonChangeTheme from '../ButtonChangeTheme';
import ButtonPlayPause from '../ButtonPlayPause';
import GallowsPlace from '../GallowsPlace';
import GuessWord from '../GuessWord';
import Header from '../Header';
import LettersPanel from '../LettersPanel';
import Main from '../Main';

import styles from './App.module.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { guessWord, wrongLetters, currentWord } = useAppSelector(getAppState);

  useEffect(() => {
    dispatch(getWord());
  }, []);

  useEffect(() => {
    if (wrongLetters.length === bodyParts.length) {
      dispatch(resetGame());
      console.log('loose the game');
      dispatch(getWord());
    }
    if (
      guessWord.length > 0 &&
      currentWord.length > 0 &&
      guessWord.join('') === currentWord.join('')
    ) {
      dispatch(resetGame());
      console.log('win the game');
      dispatch(getWord());
    }
  }, [guessWord, currentWord, wrongLetters]);

  return (
    <div className={styles.container}>
      <Header>
        <ButtonChangeTheme theme="страны" />
        <ButtonPlayPause play />
      </Header>

      <Main>
        <GallowsPlace />

        <GuessWord />

        <LettersPanel />
      </Main>
    </div>
  );
};

export default App;
