import Image from 'next/image';
import { FC } from 'react';

import { Container } from '../../styles/chess.style';
import RulesModal from '../RulesModal';
import { Colors } from '../../models/Colors';
import CustomLink from '../customLink/CustomLink';

import styles from './header.module.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const headerLogo = require('../../assets/img/header-logo.png');

interface HeaderProps {
  restart: () => void;
  // setGameTime: (time: string | null) => void;
  setGainTime: (time: string | null) => void;
  settingsGame: {
    gameTime: string | null;
    gainTime: string | null;
    startColor: Colors;
    gameMode: string;
  };
}

const Header: FC<HeaderProps> = ({ restart, setGainTime, settingsGame }) => {
  console.log(setGainTime, settingsGame);
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>
          <a href="chess/components/header/Header#" className={styles.header__title}>
            <Image
              src={headerLogo}
              width="50"
              height="50"
              className={styles.header__logo}
              alt="logo"
            />
            <span className={styles['header__title-text']}>Chess-game</span>
          </a>
          <nav className={styles.menu}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={restart} className={styles['menu__list-btn']}>
                  <span className={styles.span}>Начать заново</span>
                </button>
              </li>

              <li className={styles.menu__item}>
                <CustomLink text="Назад в лобби" />
              </li>

              <li className={styles.menu__item}>
                <RulesModal />
              </li>
            </ul>
          </nav>
          <li className={styles.menu__item}>
            <CustomLink text="Выйти" />
          </li>
        </div>
      </Container>
    </header>
  );
};

export default Header;
