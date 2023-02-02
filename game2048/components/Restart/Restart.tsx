import styles from '../Restart/Restart.module.scss';

interface RestartProps {
  numbers: number[][];
  restart: () => void;
}

const Restart = (props: RestartProps) => {
  return (
    <div>
      <button className={styles.btn} onClick={() => props.restart()}>
        <span className={styles.shadow}></span>
        <span className={styles.depth}></span>
        <span className={styles.content}></span>
      </button>
    </div>
  );
};

export default Restart;
