import { useAppSelector } from '../../../hooks';

import styles from './gamescore.module.scss';

function GameScore() {
  const score = useAppSelector((state) => state.tetris.score);

  return (
    <ul>
      <li className={styles.playfield_score}>
        Level
        <span>01</span>
      </li>
      <li className={styles.playfield_score}>
        Points
        <span>{score}</span>
      </li>
    </ul>
  );
}

export default GameScore;
