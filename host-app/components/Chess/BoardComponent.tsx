import React, { FC, useState, useEffect } from "react";
import { Board as StyledBoard } from "../../styles/chess.style";
import CellComponent from "./CellComponent";
import { Board } from '../../models/Board'
import { Cell } from "../../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
    } else {  
      setSelectedCell(cell)
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    setBoard(board.getCopyBoard())
  }

  // console.log(board);
  // console.log(selectedCell);

  return (
    <StyledBoard>
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </StyledBoard>
  );
}

export default BoardComponent;