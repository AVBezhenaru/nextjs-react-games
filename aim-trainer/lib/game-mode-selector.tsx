import { ReactNode } from 'react';
import { Challenge } from '../modes/challenge/challenge';

type GameModeSelector = (game: string) => ReactNode;

export const gameModeSelector: GameModeSelector = (game) => {
  switch (game) {
    case 'challenge':
      return <Challenge />;
    default:
      return <>game is not fined</>;
  }
};
