import React, { useMemo, useState, useEffect } from 'react';

import { getSapperState } from '../../store/sapperSlice';
import { useAppSelector } from '../../../hooks';
import Cell from '../Cell/Cell';
import { getClassByNumber, initialGameBoard, openEmtyCells } from '../../assets/utils/util';
import { ICell } from '../../assets/types/types';

import classes from './Board.module.scss';

const Board: React.FC = () => {
  const { settingsValue } = useAppSelector(getSapperState);
  const board = useMemo(
    () => initialGameBoard(settingsValue.width, settingsValue.height, settingsValue.mins),
    [settingsValue],
  );
  const [boardData, setBoardData] = useState(board);

  const boardStyle = {
    width: `${settingsValue.width * 50}px`,
  };

  const onClickLButton = (x: number, y: number, cell: ICell) => {
    // если ячейка не открыта
    if (cell.mask !== -1) {
      setBoardData((actualBoardData) => {
        const NewBoard = JSON.parse(JSON.stringify(actualBoardData));
        NewBoard[y][x].mask = -1; // открываем ячейку
        // если ячейка открыта и она пустая
        if (NewBoard[y][x].mask === -1 && NewBoard[y][x].backing === 0) {
          openEmtyCells(x, y, NewBoard); // открываем пустое поле ячеек
        }
        // если ячейка открыта и там бомба
        if (NewBoard[y][x].mask === -1 && NewBoard[y][x].backing === -1) {
          NewBoard[y][x].backing = -2; // взрываем бомбу
          NewBoard.forEach((row: ICell[]) => {
            row.forEach((cell: ICell) => {
              if (cell.backing === -1) {
                cell.mask = -1; // показываем все оставшиеся бомбы на поле
              }
            });
          });
        }
        return NewBoard;
      });
    }
  };

  const onClickRButton = (x: number, y: number, cell: ICell) => {
    // если ячейка не открыта
    if (cell.mask !== -1) {
      setBoardData((actualBoardData) => {
        const NewBoard = JSON.parse(JSON.stringify(actualBoardData));

        switch (cell.mask) {
          case 0:
            NewBoard[y][x].mask = 1; // ставим флаг
            break;
          case 1:
            NewBoard[y][x].mask = 2; // ставим ?
            break;
          case 2:
            NewBoard[y][x].mask = 0; // убираем ?
            break;
          default:
            NewBoard[y][x].mask = 0;
        }

        return NewBoard;
      });
    }
  };

  useEffect(() => {
    setBoardData(board);
  }, [settingsValue, setBoardData]);

  return (
    <div className={classes.board} style={boardStyle}>
      {boardData.map((row: { mask: number; backing: number }[], y: number) =>
        row.map((cell: { mask: number; backing: number }, x: number) => (
          <Cell
            key={`${x}${y}`}
            classAdd={`${getClassByNumber(cell)}`}
            onClickLButton={() => onClickLButton(x, y, cell)}
            onClickRButton={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.preventDefault();
              onClickRButton(x, y, cell);
            }}
          />
        )),
      )}
    </div>
  );
};

export default Board;
