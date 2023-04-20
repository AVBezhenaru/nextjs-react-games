import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { gameModesData } from './game-modes-data';
import { StyledGame } from './game.styles';

export const Game = () => {
  const { query } = useRouter();
  const selectedGame = useMemo(() => {
    const data = gameModesData.find((el) => el.path === query.game);

    return data?.component;
  }, [query]);

  return <StyledGame>{selectedGame}</StyledGame>;
};
