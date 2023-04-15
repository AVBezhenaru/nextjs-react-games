import { Direction } from '../Models/Tank';
import { TILE_SIZE } from '../../config';
import { TLand } from '../Models/Land';

import { findWall } from './findWall';

type TStopPoints = {
  x: number;
  y: number;
  direction: Direction;
  land: TLand;
};

export const getStopPoints = ({ x, y, direction, land }: TStopPoints) => {
  const [stopRow1, stopCol1] = findWall(y / TILE_SIZE, x / TILE_SIZE, direction, land);
  const [stopRow2, stopCol2] = findWall(
    (y + TILE_SIZE) / TILE_SIZE,
    (x + TILE_SIZE) / TILE_SIZE,
    direction,
    land,
  );
  return { stopRow1, stopCol1, stopRow2, stopCol2 };
};
