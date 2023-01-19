import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import styles from '../Game/Game.module.scss';

const Game = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Board />
    </div>
  );
};

export default Game;
