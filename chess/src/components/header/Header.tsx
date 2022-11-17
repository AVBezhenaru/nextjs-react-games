import { FC } from "react"
import { Container, HeaderLogo } from "../../styles/chess.style";
// import { Link } from "react-router-dom";
import Image from 'next/image'
import RulesModal from "../RulesModal";
import GameSettings from "../GameSettings";
import { Colors } from "../../models/Colors";

import styles from "./header.module.scss"

// const headerLogo = require("../../assets/img/header-logo.png")
// import headerLogo from '../../assets/img/header-logo.png'

interface HeaderProps {
  restart: () => void,
  setGameTime: (time: string | null) => void,
  setGainTime: (time: string | null) => void,
  settingsGame: {
    gameTime: string | null,
    gainTime: string | null,
    startColor: Colors,
    gameMode: string,
  }
}

const Header: FC<HeaderProps> = ({ restart, setGameTime, setGainTime, settingsGame }) => {

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles['header__inner']}>
          <a href='#' className={styles['header__title']}>
            {/* <HeaderLogo src={headerLogo} alt="Chess-logo" /> */}
            {/* <Image src={headerLogo} className={styles['header__logo']} alt='logo' /> */}
            <span className={styles['header__title-text']}>Chess-game</span>
          </a>
          <nav className={styles.menu}>
            <ul className={styles['menu__list']}>
              <li className={styles['menu__item']}>
                {/* <button onClick={restart} className="menu__list-btn"> */}
                <button onClick={restart} className={styles['menu__list-btn']}>
                  Начать заново
                </button>
              </li>

              {/* <li className="menu__item"> */}
              <li className={styles['menu__item']}>
                <GameSettings
                  setGainTime={setGainTime}
                  setGameTime={setGameTime}
                  settingsGame={settingsGame}
                />
              </li>

              <li className="menu__item">
                <RulesModal />
              </li>

            </ul>
          </nav>
          <a href="#" className="login-btn">Войти</a>
        </div>
      </Container>

    </header>
  )
}

export default Header