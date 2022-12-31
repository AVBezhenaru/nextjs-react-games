import Link from "next/link";
import { FC } from "react";
import Button from "../Button/Button";
import Wrapper from "../Wrapper/Wrapper";
import classes from './MainPage.module.scss';
import SettingsButton from "./SettingsButton/SettingsButton";

const MainPage: FC = () => {

  return (
    <Wrapper>
      <div className={classes.MainPage}>
        <div className={classes.ButtonsContainer}>
          <Link href="./tetrisReborn/settings">
            <span><SettingsButton /></span>
          </Link>
          <div className={classes.CenterButton}>
            <Link href="./tetrisReborn/game">
              <span><Button text="Play" /></span>
            </Link>
          </div>
          <div className={classes.ButtonsBottom}>
            <Link href="./tetrisReborn/score-table">
              <span><Button text="Score" /></span>
            </Link>
            <Link href="./">
              <span><Button text="Back" /></span>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default MainPage;
