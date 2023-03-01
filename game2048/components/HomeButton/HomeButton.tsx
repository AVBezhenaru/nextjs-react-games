import styles from '../HomeButton/HomeButton.module.scss';
import Link from 'next/link';

const HomeButton = () => {
  return (
    <div>
      <Link href="/profile/games/game2048" passHref>
        <button className={styles.btn}>
          <span className={styles.shadow}></span>
          <span className={styles.depth}></span>
          <span className={styles.content}></span>
        </button>
      </Link>
    </div>
  );
};

export default HomeButton;
