import styles from '../Board/Board.module.scss';
import Cell from '../Cell/Cell';

const Board = () => {
  return (
    <div className={styles.field}>
      <Cell number={2} />
      <Cell number={2048} />
      <Cell number={4} />
      <Cell number={8} />
      <Cell number={16} />
      <Cell number={32} />
      <Cell number={4096} />
      <Cell number={8} />
      <Cell number={64} />
      <Cell number={128} />
      <Cell number={256} />
      <Cell number={512} />
      <Cell number={8} />
      <Cell number={1024} />
      <Cell number={8192} />
      <Cell />
    </div>
  );
};

export default Board;
