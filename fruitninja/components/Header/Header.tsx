import HomeButton from '../HomeButton/HomeButton';
import Score from '../Score/Score';
import { GameProps } from '../../types/types';

import styles from './Header.module.scss';

const Header = ({ score }: GameProps) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.title} />
      <div className={styles.info}>
        <div className={styles.menu}>
          <HomeButton />
        </div>
        <div className={styles.score}>
          <Score score={score} />
          <div className={styles.scoreImg} />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
