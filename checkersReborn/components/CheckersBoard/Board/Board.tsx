import { FC, useEffect, useState } from "react";
import Cell from "./Cell/Cell";

import classes from './Board.module.scss';
import CellModel from "../../../models/CellModel";
import BoardModel from "../../../models/BoardModel";

interface IBoardProps {
  board: BoardModel;
  setBoard: (board: BoardModel) => void;
}

const Board: FC<IBoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);
  
  const click = (cell: CellModel) => {
    if (selectedCell && selectedCell !== cell && selectedCell.checker.canMove(cell)) {
      selectedCell.moveChecker(cell);
      setSelectedCell(null);
    } else {
      if (cell.checker) setSelectedCell(cell);
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

  const mappedCells = board.cells.map((cell, index) => (
    <Cell key={index} cell={cell} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} click={click} />
  ));

  return (
    <div className={classes.Board}>
      {mappedCells}
    </div>
  );
}

export default Board;
