import { useRouter } from 'next/router';
import React, { useEffect, FC, useState } from 'react';

import {
  ButtonChangeTheme,
  GallowsPlace,
  GuessWord,
  Header,
  LettersPanel,
  Main,
  StatusGameMessage,
} from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAppState, getThemeWord, resetGame } from '../store/reducers/AppSlice';
import { StatusGame } from '../types/AppSlice';
import { bodyParts } from '../utils/bodyParts';

const game: FC = () => {
  const [statusGame, setStatusGame] = useState<StatusGame>('idle');

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { guessWord, wrongLetters, currentWord, theme } = useAppSelector(getAppState);

  useEffect(() => {
    if (theme) dispatch(getThemeWord(theme));

    if (!theme) {
      router.push('/theme');
    }
  }, []);

  useEffect(() => {
    const isGuessWordEqualCurrentWord = guessWord.join('') === currentWord.join('');

    const isWin = guessWord.length > 0 && currentWord.length > 0 && isGuessWordEqualCurrentWord;
    const isLose = wrongLetters.length === bodyParts.length;

    if (isLose) setStatusGame('lose');

    if (isWin) setStatusGame('win');

    if ((isWin || isLose) && theme && statusGame === 'loading') {
      setStatusGame('idle');
      dispatch(resetGame());
      dispatch(getThemeWord(theme));
    }
  }, [guessWord, currentWord, wrongLetters, statusGame]);

  return (
    <>
      <StatusGameMessage status={statusGame} setStatusGame={setStatusGame} />

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

export default game;
