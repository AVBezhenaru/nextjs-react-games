import { FC, useEffect, useState } from "react";
import Cell from "./Cell/Cell";

import classes from './Board.module.scss';
import CellModel from "../../../models/CellModel";
import BoardModel from "../../../models/BoardModel";
import { Player } from "../../../models/Player";
import { CheckerColor } from "../../../models/Checkers/CheckerColor";

interface IBoardProps {
  board: BoardModel;
  setBoard: (board: BoardModel) => void;
}

const Board: FC<IBoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);
  
  const click = (cell: CellModel) => {
    if (board.turnBy === Player.BLACK && cell.checker?.checkerColor === CheckerColor.WHITE) return;
    if (board.turnBy === Player.WHITE && cell.checker?.checkerColor === CheckerColor.BLACK) return;

    if (selectedCell && selectedCell !== cell && selectedCell.checker.canMove(cell)) {
      const next = selectedCell.moveChecker(cell);
      setSelectedCell(next);
    } else {
      if (cell.checker && !board.wasCapturing) setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  const updateBoard = () => {
    const newBoard = board.getCopy();
    setBoard(newBoard);
  }

  const isCellSelected = (cell: CellModel) => {
    return cell.x === selectedCell?.x && cell.y === selectedCell?.y;
  }

  const mappedCells = board.cells.map((cell, index) => (
    <Cell key={index} cell={cell} selected={isCellSelected(cell)} click={click} />
  ));

  return (
    <div className={classes.Board}>
      {mappedCells}
    </div>
  );
}

export default Board;
