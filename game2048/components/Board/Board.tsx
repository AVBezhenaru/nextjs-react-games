import styles from '../Board/Board.module.scss';
import Cell from '../Cell/Cell';

const Board = () => {
  return (
    <div className={styles.field}>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </div>
  );
};

export default Board;
