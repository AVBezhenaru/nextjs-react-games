import { FC, ReactElement } from 'react';

import styles from './index.module.scss';
import Canvas from './core/Canvas/Canvas';
import { Grid } from './grid/Grid';

const Game: FC = (): ReactElement => (
  <div className={styles.game}>
    <Canvas />
    {/* <Grid /> */}
  </div>
);

export default Game;
