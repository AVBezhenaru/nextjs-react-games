import { Direction } from '../Models/Tank';
import { TILE_SIZE } from '../../config';

type TIsMove = {
  stopRow1: number;
  stopCol1: number;
  stopRow2: number;
  stopCol2: number;
  direction: Direction;
};

export const stopPosition = ({ stopRow1, stopRow2, stopCol1, stopCol2, direction }: TIsMove) => {
  let stopPos1 = 0;
  let stopPos2 = 0;
  switch (true) {
    case direction === Direction.up:
      stopPos1 = stopRow1 * TILE_SIZE + TILE_SIZE;
      stopPos2 = stopRow2 * TILE_SIZE + TILE_SIZE;
      return Math.max(stopPos1, stopPos2);
    case direction === Direction.right:
      stopPos1 = stopCol1 * TILE_SIZE;
      stopPos2 = stopCol2 * TILE_SIZE;
      return Math.min(stopPos1, stopPos2);
    case direction === Direction.down:
      stopPos1 = stopRow1 * TILE_SIZE;
      stopPos2 = stopRow2 * TILE_SIZE;
      return Math.min(stopPos1, stopPos2);
    case direction === Direction.left:
      stopPos1 = stopCol1 * TILE_SIZE + TILE_SIZE;
      stopPos2 = stopCol2 * TILE_SIZE + TILE_SIZE;
      return Math.max(stopPos1, stopPos2);
  }
};
