import styles from '../Restart/Restart.module.scss';

interface RestartProps {
  numbers: number[][];
  restart: () => void;
}

const Restart = (props: RestartProps) => {
  return (
    <div>
      <button className={styles.restart} onClick={() => props.restart()}></button>
    </div>
  );
};

export default Restart;
