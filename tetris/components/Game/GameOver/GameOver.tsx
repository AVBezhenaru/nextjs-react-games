import Link from "next/link";
import { FC } from "react";
import Button from "../../Button/Button";
import classes from "./GameOver.module.scss";

interface IGameOverProps {
  score: number;
  restartGame: () => void;
}

const GameOver: FC<IGameOverProps> = ({ score, restartGame }) => {
  
  return (
    <div className={classes.GameOver}>
      <h3 className={classes.Title}>Game over!</h3>
      <div className={classes.Score}>Total score: {score}.</div>
      <div className={classes.Buttons}>
        <Button text="Restart"  onClick={restartGame}/>
        <Link href="../">
          <span><Button text="Exit" /></span>
        </Link>
      </div>
    </div>
  );
}

export default GameOver;

