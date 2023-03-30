import { ICell } from '../types/types';

const randomRange = (Min: number, Max: number): number =>
  Math.floor(Math.random() * (Max - Min) + Min);

export const initialEmptyBoard = (x: number, y: number): ICell[][] => {
  const board: ICell[][] = new Array(y).fill(new Array(x).fill({ mask: 0, backing: 0 }));
  return board;
};

export const placeBombsRandomly = (numberOfBombs: number, board: ICell[][]) => {
  const NewBoard = JSON.parse(JSON.stringify(board));
  const mine = -1;

  for (let i = 0; i < numberOfBombs && i !== board.length * board[0].length; ) {
    const randomX = randomRange(0, board[0].length);
    const randomY = randomRange(0, board.length);
    // eslint-disable-next-line no-continue
    if (NewBoard[randomY][randomX].backing === mine) continue;
    NewBoard[randomY][randomX].backing = mine;
    i += 1;
  }
  return NewBoard;
};

export const putNumNearBomb = (board: ICell[][]) => {
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.backing !== -1) {
        const arrXYaround = [
          [y - 1, x - 1],
          [y - 1, x],
          [y - 1, x + 1],
          [y, x + 1],
          [y + 1, x + 1],
          [y + 1, x],
          [y + 1, x - 1],
          [y, x - 1],
        ];
        cell.backing = arrXYaround.reduce((countBomb: number, item) => {
          if (board[item[0]] !== undefined) {
            if (board[item[0]][item[1]] !== undefined) {
              if (board[item[0]][item[1]].backing === -1) {
                countBomb += 1;
              }
            }
          }
          return countBomb;
        }, 0);
      }
    });
  });
  return board;
};

export const initialGameBoard = (x: number, y: number, mins: number): ICell[][] =>
  putNumNearBomb(placeBombsRandomly(mins, initialEmptyBoard(x, y)));

export const getClassByNumber = (cell: ICell): string => {
  if (cell.mask >= 0) {
    switch (cell.mask) {
      case 0:
        return '';
      case 1:
        return 'cell-flag';
      case 2:
        return 'cell-question';
      default:
        return '';
    }
  }

  switch (cell.backing) {
    case -2:
      return 'cell-bomb-detonation';
    case -1:
      return 'cell-bomb';
    case 0:
      return 'cell-empty';
    case 1:
      return 'cell-number-1';
    case 2:
      return 'cell-number-2';
    case 3:
      return 'cell-number-3';
    case 4:
      return 'cell-number-4';
    case 5:
      return 'cell-number-5';
    case 6:
      return 'cell-number-6';
    case 7:
      return 'cell-number-7';
    case 8:
      return 'cell-number-8';
    default:
      return 'cell-empty';
  }
};

export const openEmtyCells = (x: number, y: number, NewBoard: ICell[][]) => {
  const arrXYaround = [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y + 1, x + 1],
    [y + 1, x],
    [y + 1, x - 1],
    [y, x - 1],
  ];
  arrXYaround.forEach((y0x1) => {
    if (NewBoard[y0x1[0]] !== undefined) {
      if (NewBoard[y0x1[0]][y0x1[1]] !== undefined) {
        // если ячейка закрыта и она пустая
        if (NewBoard[y0x1[0]][y0x1[1]].mask !== -1 && NewBoard[y0x1[0]][y0x1[1]].backing === 0) {
          NewBoard[y0x1[0]][y0x1[1]].mask = -1; // открываем ячейку

          openEmtyCells(y0x1[1], y0x1[0], NewBoard);

          const arrXYaroundOpen = [
            [y0x1[0] - 1, y0x1[1] - 1],
            [y0x1[0] - 1, y0x1[1]],
            [y0x1[0] - 1, y0x1[1] + 1],
            [y0x1[0], y0x1[1] + 1],
            [y0x1[0] + 1, y0x1[1] + 1],
            [y0x1[0] + 1, y0x1[1]],
            [y0x1[0] + 1, y0x1[1] - 1],
            [y0x1[0], y0x1[1] - 1],
          ];
          arrXYaroundOpen.forEach((item) => {
            if (NewBoard[item[0]] !== undefined) {
              if (NewBoard[item[0]][item[1]] !== undefined) {
                NewBoard[item[0]][item[1]].mask = -1;
              }
            }
          });
        }
      }
    }
  });
  arrXYaround.forEach((item) => {
    if (NewBoard[item[0]] !== undefined) {
      if (NewBoard[item[0]][item[1]] !== undefined) {
        NewBoard[item[0]][item[1]].mask = -1;
      }
    }
  });
};
