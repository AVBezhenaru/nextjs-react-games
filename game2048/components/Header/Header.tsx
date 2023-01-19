import styles from '../Header/Header.module.scss';
import Restart from '../Restart/Restart';
import Score from '../Score/Score';

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>2048</div>
        <div className={styles.menu}>
          <Restart />
          <Score />
        </div>
      </div>
      <div className={styles.description}>Join the numbers and get to the 2048 tile!</div>
    </div>
  );
};

export default Header;
