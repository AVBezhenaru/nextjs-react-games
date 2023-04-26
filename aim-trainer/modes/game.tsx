import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { AimTrainerTheme } from '../themes/default-theme';

import { gameModesData } from './game-modes-data';
import { StyledGame } from './game.styles';

export const Game = () => {
  const { query } = useRouter();
  const selectedGame = useMemo(() => {
    const data = gameModesData.find((el) => el.path === query.game);

    return data?.component;
  }, [query]);

  return (
    <ThemeProvider theme={AimTrainerTheme}>
      <StyledGame>{selectedGame}</StyledGame>
    </ThemeProvider>
  );
};
