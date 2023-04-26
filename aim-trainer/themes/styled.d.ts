import {} from 'styled-components';

import { AimTrainerThemeType } from './default-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AimTrainerThemeType {}
}
