import React, { FC } from "react"
import { Container, HeaderLogo } from "../styles/chess.style";
import { Link } from "react-router-dom";
import RulesModal from "./RulesModal";
import GameSettings from "./GameSettings";
import { Colors } from "../models/Colors";
import '../styles/header.scss'

const headerLogo = require("../assets/img/header-logo.png")

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
    <header className="header">
      <Container>
        <div className="header__inner">
          <Link to="" className="header__title">
            <HeaderLogo src={headerLogo} alt="Chess-logo" />
            <span className="header__title-text">Chess-game</span>
          </Link>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item">
                <button onClick={restart} className="menu__list-btn">
                  Начать заново
                </button>
              </li>

              <li className="menu__item">
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
          <Link to="" className="login-btn">Войти</Link>
        </div>
      </Container>

    </header>
  )
}

export default Header