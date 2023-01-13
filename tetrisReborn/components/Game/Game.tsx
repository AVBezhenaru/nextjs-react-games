import Link from "next/link";
import { BaseSyntheticEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import FieldModel from "../../models/FieldModel";
import { MoveDirection } from "../../models/figures/MoveDirection";
import { KeyCodes, NativeEvent } from "../../types/NativeEvent";
import Button from "../Button/Button";
import Wrapper from "../Wrapper/Wrapper";
import classes from "./Game.module.scss";
import GameField from "./GameField/GameField";
import GameOver from "./GameOver/GameOver";
import SideBar from "./SideBar/SideBar";

const Game: FC = () => {
  const [field, setField] = useState(new FieldModel());
  const timer = useRef(null);

  const { gameOver, level, score, gameId } = field;
  
  useEffect(() => {
    setField(field.initGame());
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      field.moveCurrentFigure(MoveDirection.BOTTOM);
      setField(field.update());
    }, level.tickTime);

    return () => clearInterval(timer.current);
  }, [level, gameId]);

  useEffect(() => {
    // TODO: send the score to backend (maybe only if it beats one of the highest)
    if (gameOver) clearInterval(timer.current);
  }, [gameOver]);

  const restartGame = () => {
    setField(field.restartGame());
  }

  const onKeyDown = useCallback((e: BaseSyntheticEvent) => {
    if (gameOver) return;

    const { keyCode } = e.nativeEvent as NativeEvent;
    let needToUpdateField = false;
    switch (keyCode) {
      case KeyCodes.A:
      case KeyCodes.LEFT_ARROW:
        needToUpdateField = field.moveCurrentFigure(MoveDirection.LEFT);
        break;
      case KeyCodes.DOWN_ARROW:
        e.preventDefault(); // prevent page scroll
      case KeyCodes.S:
        needToUpdateField = field.moveCurrentFigure(MoveDirection.BOTTOM);
        break;
      case KeyCodes.D:
      case KeyCodes.RIGHT_ARROW:
        needToUpdateField = field.moveCurrentFigure(MoveDirection.RIGHT);
        break;
      case KeyCodes.UP_ARROW:
        e.preventDefault(); // prevent page scroll
      case KeyCodes.W:
        needToUpdateField = field.rotateCurrentFigure();
        break;
      default:
        break;
    }

    if (needToUpdateField) setField(field.update());
  }, [level, gameId]);

  return (
    <Wrapper onKeyDown={onKeyDown}>
      <div className={classes.GameContainer}>
        <Link href="./">
          <span><Button text="Back" /></span>
        </Link>
        <div className={classes.FieldContainer}>
          <div className={classes.FieldAndSideBar}>
            <GameField field={field} setField={setField} />
            <SideBar nextFigure={field.nextFigure} level={level} points={score} />
          </div>
        </div>
        {gameOver && <GameOver score={score} restartGame={restartGame} />}
      </div>
    </Wrapper>
  );
}

export default Game;
