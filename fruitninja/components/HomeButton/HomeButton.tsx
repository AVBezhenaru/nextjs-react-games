import Link from 'next/link';

import styles from './HomeButton.module.scss';

const HomeButton = () => (
  <div>
    <Link href="/profile/games/fruitninja" passHref>
      <button type="button" className={styles.btn}>
        <span className={styles.content} />
      </button>
    </Link>
  </div>
);

export default HomeButton;
