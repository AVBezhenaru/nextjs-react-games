import React, { useEffect, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ButtonChangeTheme,
  GallowsPlace,
  GuessWord,
  Header,
  LettersPanel,
  Main,
  StatusGameMessage,
} from '../../components';
import { bodyParts } from '../../data/data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAppState, getThemeWord, resetGame } from '../../store/reducers/AppSlice';

export const Game: FC = () => {
  const [statusGame, setStatusGame] = useState<'win' | 'lose' | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { guessWord, wrongLetters, currentWord, theme } = useAppSelector(getAppState);

  useEffect(() => {
    if (theme) dispatch(getThemeWord(theme));

    if (!theme) {
      navigate('/theme');
    }
  }, []);

  useEffect(() => {
    if (wrongLetters.length === bodyParts.length) {
      dispatch(resetGame());
      console.log('loose the game');
      setStatusGame('lose');

      if (theme && statusGame === null) dispatch(getThemeWord(theme));
    }

    if (
      guessWord.length > 0 &&
      currentWord.length > 0 &&
      guessWord.join('') === currentWord.join('')
    ) {
      dispatch(resetGame());
      console.log('win the game');
      setStatusGame('win');

      if (theme && statusGame === null) dispatch(getThemeWord(theme));
    }
  }, [guessWord, currentWord, wrongLetters]);

  return (
    <>
      <StatusGameMessage status={statusGame} onClose={setStatusGame} />

      <Header>
        <ButtonChangeTheme />
      </Header>

      <Main>
        <GallowsPlace />

        <GuessWord />

        <LettersPanel />
      </Main>
    </>
  );
};
