import styles from '../Header/Header.module.scss';
import HomeButton from '../HomeButton/HomeButton';
import Restart from '../Restart/Restart';
import Score from '../Score/Score';

interface HeaderProps {
  score: number;
  numbers: number[][];
  restart: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>2048</div>
        <div className={styles.info}>
          <div className={styles.menu}>
            <Restart restart={() => props.restart()} numbers={props.numbers} />
            <HomeButton />
          </div>
          <div className={styles.score}>
            <Score score={props.score} />
          </div>
        </div>
      </div>
      <div className={styles.description}>Join the numbers and get to the 2048 tile!</div>
    </div>
  );
};

export default Header;
