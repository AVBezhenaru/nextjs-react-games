import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAppState, getWord, resetGame } from '../../hangman/store/HangmanSlice';
import { StatusGame } from '../../hangman/types/HangmanSlice';
import { bodyParts } from '../../hangman/utils/bodyParts';
import {
  ButtonChangeTheme,
  GallowsPlace,
  GuessWord,
  Header,
  Layout,
  LettersPanel,
  Main,
  StatusGameMessage,
} from '../../hangman/components';

const Game: NextPage = () => {
  const [statusGame, setStatusGame] = useState<StatusGame>('idle');

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { guessWord, wrongLetters, currentWord, theme } = useAppSelector(getAppState);

  useEffect(() => {
    if (theme) dispatch(getWord(theme));

    if (!theme) {
      router.push('/hangman/theme');
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
      dispatch(getWord(theme));
    }
  }, [guessWord, currentWord, wrongLetters, statusGame]);

  return (
    <Layout>
      <StatusGameMessage status={statusGame} setStatusGame={setStatusGame} />

      <Header>
        <ButtonChangeTheme />
      </Header>

      <Main>
        <GallowsPlace />

        <GuessWord />

        <LettersPanel />
      </Main>
    </Layout>
  );
};

export default Game;
