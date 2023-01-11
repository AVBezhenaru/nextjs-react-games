import Link from 'next/link';
import React from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { startNewGame } from '../../helpers/setGameCards';

import { MainSection, StartGame } from './MainStyle';

export const Main: React.FC = () => {
  const { cards } = useAppSelector((state) => state.solitaire);
  const dispatch = useAppDispatch();

  return (
    <MainSection>
      <Link href="./solitaire/game">
        <StartGame onClick={() => startNewGame(dispatch, cards)}>
          <span>START</span>
        </StartGame>
      </Link>
    </MainSection>
  );
};
