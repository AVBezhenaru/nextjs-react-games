import { FC } from "react";
import Figure from "../../../models/figures/Figure";
import { ILevel } from "../../../models/Level";
import NextFigure from "./NextFigure/NextFigure";
import classes from "./SideBar.module.scss";

interface ISideBarProps {
  nextFigure: Figure | null;
  level: ILevel;
  points: number;
}

const SideBar: FC<ISideBarProps> = ({ nextFigure, level, points }) => {

  return (
    <div className={classes.SideBar}>
      <NextFigure figure={nextFigure} />
      <div className={classes.Info}>
        <label>Level</label>
        <label className={classes.InfoValue}>{level.title}</label>
      </div>
      <div className={classes.Info}>
        <label>Points</label>
        <label className={classes.InfoValue}>{points}</label>
      </div>
    </div>
  );
}

export default SideBar;
