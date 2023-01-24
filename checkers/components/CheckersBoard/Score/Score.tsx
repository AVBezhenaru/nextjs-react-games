import { FC } from "react";

import classes from './Score.module.scss';

interface IScoreProps {
  white: boolean,
  score: number,
}

const Score: FC<IScoreProps> = ({ white, score }) => {

  return (
    <div className={classes.Score}>
      <div className={classes.Description}>Текущий счет сбитых {white ? 'белых шашек' : 'черных шашек'}</div>
      <div>{score}</div>
    </div>
  );
}

export default Score;