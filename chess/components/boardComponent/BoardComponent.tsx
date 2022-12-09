import React, { FC, useEffect } from 'react';

import { Board as StyledBoard } from '../../styles/chess.style';
import CellComponent from '../CellComponent';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import TransformFigure from '../TransformFigure';
import { useAppSelector } from '../../../hooks';

import styles from './BoardComponent.module.scss';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  changePlayer: () => void;
  restart: () => void;
  selectedCell: Cell | null;
  setSelectedCell: (cell: Cell | null) => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  changePlayer,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  restart,
  selectedCell,
  setSelectedCell,
}) => {
  function updateBoard() {
    setBoard(board.getCopyBoard());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function click(cell: Cell, checkMate = false) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      updateBoard();
      changePlayer();
    } else if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
    }
  }
  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }
  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const transformFigureComponent = (
    // eslint-disable-next-line react/jsx-no-bind
    <TransformFigure transformData={board.transformData} board={board} updateBoard={updateBoard} />
  );

  const endGame =
    board.whiteKing?.chekAndMateFlag || board.blackKing?.chekAndMateFlag || board.stalemate
      ? () => {
          console.log('endGame');
        }
      : click;

  const selectFigureBox = board.transformData.shouldTransform ? transformFigureComponent : null;

  // const columnName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  // const rowName = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // const columnNameElement = columnName.map((item, i) => (
  //   <div className={styles['board__item-column']} key={i}>
  //     {item}
  //   </div>
  // ));
  // const rowNameElements = rowName.map((item, i) => (
  //   <div className={styles['board__item-row']} key={i}>
  //     {item}
  //   </div>
  // ));
  const current = useAppSelector((state) => state.rootSlice.currentPlayer);

  const changeBoard =
    current?.label?.colors === 'белые' ? `${styles.board}` : `${styles.transformBoard}`;

  // const changeItems =
  //   current?.label?.colors === 'белые'
  //     ? `${styles['board__items-row']}`
  //     : `${styles['board__items-row-transform']}`;

  return (
    <div className={changeBoard}>
      {selectFigureBox}
      {/* <div className={`${styles.board__items} ${changeItems}`}>{rowNameElements}</div> */}
      <StyledBoard>
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={endGame}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </React.Fragment>
        ))}
      </StyledBoard>
      {/* <div className={`${styles.board__items} ${styles['board__items-column']}`}> */}
      {/*  {columnNameElement} */}
      {/* </div> */}
    </div>
  );
};

export default BoardComponent;
