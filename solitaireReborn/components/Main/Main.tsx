import Link from 'next/link';
import React from 'react';

import { useAppDispatch } from '../../../hooks';
import { startGame } from '../../store/solitaireSlice';

import { MainSection, StartGame } from './MainStyle';

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <MainSection>
      <Link href="./solitaire/game">
        <StartGame onClick={() => dispatch(startGame())}>
          <span>START</span>
        </StartGame>
      </Link>
    </MainSection>
  );
};
