import { Direction } from '../Models/Tank';
import { TILE_SIZE } from '../../config';

type TIsMove = {
  x: number;
  y: number;
  stopRow1: number;
  stopCol1: number;
  stopRow2: number;
  stopCol2: number;
  width: number;
  height: number;
  direction: Direction;
};

export const isCanMove = ({
  x,
  y,
  stopRow1,
  stopRow2,
  stopCol1,
  stopCol2,
  width,
  height,
  direction,
}: TIsMove) => {
  let stopPos1 = 0;
  let stopPos2 = 0;
  switch (true) {
    case direction === Direction.up:
      stopPos1 = stopRow1 * TILE_SIZE + TILE_SIZE;
      stopPos2 = stopRow2 * TILE_SIZE + TILE_SIZE;
      return y > stopPos1 && y > stopPos2;
    case direction === Direction.right:
      stopPos1 = stopCol1 * TILE_SIZE;
      stopPos2 = stopCol2 * TILE_SIZE;
      return x + width < stopPos1 && x + width < stopPos2;
    case direction === Direction.down:
      stopPos1 = stopRow1 * TILE_SIZE;
      stopPos2 = stopRow2 * TILE_SIZE;
      return y + height < stopPos1 && y + height < stopPos2;
    case direction === Direction.left:
      stopPos1 = stopCol1 * TILE_SIZE + TILE_SIZE;
      stopPos2 = stopCol2 * TILE_SIZE + TILE_SIZE;
      return x > stopPos1 && x > stopPos2;
  }
  return true;
};
