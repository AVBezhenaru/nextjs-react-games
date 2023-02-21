import { TILE_SIZE } from '../../config';

export const shiftTile = (width: number, height: number) => [
  Math.round((TILE_SIZE * 2 - width) / 2),
  Math.round((TILE_SIZE * 2 - height) / 2),
];
