import styles from '../PlayButton/PlayButton.module.scss';
import Link from 'next/link';

const PlayButton = () => {
  return (
    <div>
      <Link href="/profile/games/game2048/game" passHref>
        <button className={styles.btn}>
          <span className={styles.shadow}></span>
          <span className={styles.depth}></span>
          <span className={styles.content}></span>
        </button>
      </Link>
    </div>
  );
};

export default PlayButton;
