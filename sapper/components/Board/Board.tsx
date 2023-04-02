import React, { useMemo, useState, useEffect } from 'react';

import { setGameIndicator, getSapperState, setGameModal } from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Cell from '../Cell/Cell';
import {
  getClassByNumber,
  initialGameBoard,
  openEmtyCells,
  getClassByGameIndicator,
} from '../../assets/utils/util';
import { ICell } from '../../assets/types/types';

import classes from './Board.module.scss';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingsValue, settingsModal, gameIndicator } = useAppSelector(getSapperState);
  const board = useMemo(
    () => initialGameBoard(settingsValue.width, settingsValue.height, settingsValue.mins),
    [settingsValue],
  );
  const [boardData, setBoardData] = useState(board);

  const cellSize = boardData.length > 15 ? 750 / boardData.length : 50;
  const boardStyle = {
    width: `${settingsValue.width * cellSize}px`,
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

  useEffect(() => {
    let winIndicator = true;
    boardData.forEach((row: ICell[]) => {
      row.forEach((cell: ICell) => {
        // проверяем что остались только закрытые бомбы на поле - Победа!
        if (cell.mask !== -1 && cell.backing !== -1 && winIndicator) {
          winIndicator = false;
        }
        // проверяем что бомба взорвана - Проигрыш!
        if (cell.backing === -2) {
          dispatch(setGameIndicator('Game over'));
          dispatch(setGameModal());
        }
      });
    });
    if (winIndicator) {
      dispatch(setGameIndicator('Win'));
      dispatch(setGameModal());
    }
  }, [boardData]);

  return (
    <div className={classes[getClassByGameIndicator(gameIndicator)]} style={boardStyle}>
      {boardData.map((row: { mask: number; backing: number }[], y: number) =>
        row.map((cell: { mask: number; backing: number }, x: number) => (
          <Cell
            key={`${x}${y}`}
            classAdd={`${getClassByNumber(cell)}`}
            cellSize={cellSize}
            onClickLButton={() => onClickLButton(x, y, cell)}
            onClickRButton={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.preventDefault();
              onClickRButton(x, y, cell);
            }}
            disabled={cell.mask > 0 || settingsModal || gameIndicator !== 'New game'}
          />
        )),
      )}
    </div>
  );
};

export default Board;
