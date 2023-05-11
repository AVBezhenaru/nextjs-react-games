import { ICell } from '../types/types';
import { TsettingsValue } from '../../store/typeSapperSlice';

const mapClassByNumber = new Map();
mapClassByNumber.set(-2, 'cell-bomb-detonation');
mapClassByNumber.set(-1, 'cell-bomb');
mapClassByNumber.set(0, 'cell-empty');
for (let i = 1; i <= 8; i++) {
  mapClassByNumber.set(i, `cell-number-${i}`);
}

const getArrXYaround = (x: number, y: number) => [
  [y - 1, x - 1],
  [y - 1, x],
  [y - 1, x + 1],
  [y, x + 1],
  [y + 1, x + 1],
  [y + 1, x],
  [y + 1, x - 1],
  [y, x - 1],
];

const randomRange = (Min: number, Max: number): number =>
  Math.floor(Math.random() * (Max - Min) + Min);

const Beginner = 'Beginner: field 9x9 cells, 10 mins';
const Intermediate = 'Intermediate: field 16x16 cells, 40 mins';
const Expert = 'Expert: field 16x30 cells, 99 mins';
const Special = 'Special:';

export const checkedRadioBoxs = (settingsValue: TsettingsValue) => {
  const initialRadioBoxs = [
    {
      id: 1,
      label: Beginner,
      checked: settingsValue.level === Beginner,
    },
    {
      id: 2,
      label: Intermediate,
      checked: settingsValue.level === Intermediate,
    },
    {
      id: 3,
      label: Expert,
      checked: settingsValue.level === Expert,
    },
    {
      id: 4,
      label: Special,
      checked: settingsValue.level === Special,
    },
  ];

  return initialRadioBoxs;
};

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
        cell.backing = getArrXYaround(x, y).reduce((countBomb: number, item) => {
          if (board?.[item[0]]?.[item[1]]?.backing === -1) {
            countBomb += 1;
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

export const getClassByGameIndicator = (gameIndicator: string): string => {
  switch (gameIndicator) {
    case 'New game':
      return 'board';
    case 'Game over':
      return 'board-bomb-detonation';
    case 'Win':
      return 'board-win';
    default:
      return 'board';
  }
};

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
  return mapClassByNumber.get(cell.backing) || 'cell-empty';
};

export const openEmtyCells = (x: number, y: number, NewBoard: ICell[][]) => {
  getArrXYaround(x, y).forEach((y0x1) => {
    // если ячейка закрыта и она пустая
    if (
      NewBoard?.[y0x1[0]]?.[y0x1[1]]?.mask !== -1 &&
      NewBoard?.[y0x1[0]]?.[y0x1[1]]?.backing === 0
    ) {
      NewBoard[y0x1[0]][y0x1[1]].mask = -1; // открываем ячейку

      openEmtyCells(y0x1[1], y0x1[0], NewBoard);

      getArrXYaround(y0x1[1], y0x1[0]).forEach((item) => {
        if (NewBoard?.[item[0]]?.[item[1]] !== undefined) {
          NewBoard[item[0]][item[1]].mask = -1;
        }
      });
    }
  });
  getArrXYaround(x, y).forEach((item) => {
    if (NewBoard?.[item[0]]?.[item[1]] !== undefined) {
      NewBoard[item[0]][item[1]].mask = -1;
    }
  });
};
