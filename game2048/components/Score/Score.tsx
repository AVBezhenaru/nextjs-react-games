import styles from '../Score/Score.module.scss';

const Score = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>SCORE</div>
      <div className={styles.number}>12345</div>
    </div>
  );
};

export default Score;
