import { FC } from "react";

import classes from './Score.module.scss';

interface IScoreProps {
  white: boolean,
  score: number,
}

const Score: FC<IScoreProps> = ({ white, score }) => {

  return (
    <div>
      <div>Текущий счет сбитых {white ? 'белых шашек' : 'черных шашек'}</div>
      <div>{score}</div>
    </div>
  );
}

export default Score;