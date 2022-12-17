import { FC, useContext } from "react";
import CheckersServiceContext from "../../../context/CheckersServiceContext";
import Cell from "./Cell/Cell";

import classes from './Board.module.scss';

const Board: FC = () => {

  const gameContext = useContext(CheckersServiceContext);
  const cells = gameContext.board.cells.map((cell) => {
    return (
      <Cell cell={cell} />
    );
  });

  return (
    <div className={classes.Board}>
      {cells}
    </div>
  );
}

export default Board;
