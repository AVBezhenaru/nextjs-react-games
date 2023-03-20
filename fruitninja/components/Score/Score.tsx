import styles from './Score.module.scss';

interface HeaderProps {
  score: number;
}

const Score = ({ score }: HeaderProps) => (
  <div className={styles.container}>
    <div className={styles.number}>{score}</div>
  </div>
);

export default Score;
