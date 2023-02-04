import styles from '../SettingsButton/SettingsButton.module.scss';
import Link from 'next/link';

const SettingsButton = () => {
  return (
    <div>
      <Link href="/profile/games/game2048/settings" passHref>
        <button className={styles.btn}>
          <span className={styles.shadow}></span>
          <span className={styles.depth}></span>
          <span className={styles.content}></span>
        </button>
      </Link>
    </div>
  );
};

export default SettingsButton;
