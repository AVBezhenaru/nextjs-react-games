import Board from '../../components/Board/Board';
import styles from '../Game/Game.module.scss';

const Game = () => {
  return (
    <div className={styles.wrapper}>
      <Board />
    </div>
  );
};

export default Game;
