import { useAppSelector } from '../../../hooks';

import styles from './gamescore.module.scss';

function GameScore() {
  const score = useAppSelector((state) => state.tetris.score);
  const level = useAppSelector((state) => state.tetris.level);

  return (
    <ul>
      <li className={styles.playfield_score}>
        Level
        <span>{level < 10 ? `0${level}` : level}</span>
      </li>
      <li className={styles.playfield_score}>
        Points
        <span>{score}</span>
      </li>
    </ul>
  );
}

export default GameScore;
