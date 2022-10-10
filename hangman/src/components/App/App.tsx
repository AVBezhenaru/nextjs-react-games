import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { bodyParts } from '../../data/data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Game } from '../../pages';
import { getAppState, resetGame, getWord } from '../../store/reducers/AppSlice';
import { Layout } from '../Layout/Layout';

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
};

export { App };
