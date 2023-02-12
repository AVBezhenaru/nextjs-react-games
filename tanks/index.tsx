import { FC, ReactElement } from 'react';

import styles from './index.module.scss';
import Canvas from './core/Canvas/Canvas';

const Game: FC = (): ReactElement => (
  <div className={styles.game}>
    <Canvas />
  </div>
);

export default Game;
