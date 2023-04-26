import { ThemeProvider } from 'styled-components';

import { Lobby } from './components/lobby/lobby';
import { AimTrainerTheme } from './themes/default-theme';
import { StyledAimTrainer } from './index.styles';

export const AimTrainerGame = () => (
  <ThemeProvider theme={AimTrainerTheme}>
    <StyledAimTrainer>
      <Lobby />
    </StyledAimTrainer>
  </ThemeProvider>
);
