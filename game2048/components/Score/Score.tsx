import styles from '../Score/Score.module.scss';

interface ScoreProps {
  score: number;
}

const Score = (props: ScoreProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>SCORE</div>
      <div className={styles.number}>{props.score}</div>
    </div>
  );
};

export default Score;
