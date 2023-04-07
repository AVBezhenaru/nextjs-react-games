import { Direction } from '../Models/Tank';
import { FIELD_TILE_COUNT } from '../../config';
import { TLand } from '../Models/Land';

export const findWall = (row: number, col: number, direction: Direction, land: TLand) => {
  row = Math.round(row);
  col = Math.round(col);
  while (row >= 0 && col >= 0 && row <= FIELD_TILE_COUNT - 1 && col <= FIELD_TILE_COUNT - 1) {
    if (land[row][col] > 0 && land[row][col] < 10) {
      return [row, col];
    }
    if (direction === Direction.up) row -= 1;
    if (direction === Direction.down) row += 1;
    if (direction === Direction.right) col += 1;
    if (direction === Direction.left) col -= 1;
  }
  return [row, col];
};
