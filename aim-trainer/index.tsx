import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';

import { Lobby } from './components/lobby/lobby';
import { AimTrainerTheme } from './themes/default-theme';
import { StyledAimTrainer } from './index.styles';

export const AimTrainerGame = () => {
  useEffect(() => {
    document.title = 'Aim Trainer Game';
  }, []);

  return (
    <ThemeProvider theme={AimTrainerTheme}>
      <StyledAimTrainer>
        <Lobby />
      </StyledAimTrainer>
    </ThemeProvider>
  );
};
