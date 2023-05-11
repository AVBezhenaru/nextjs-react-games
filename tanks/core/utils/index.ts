/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
import { Direction } from '../../constants';

export function getDirectionForKeys(keys: Set<string>) {
  if (keys.has('ArrowUp')) {
    return Direction.UP;
  }

  if (keys.has('ArrowRight')) {
    return Direction.RIGHT;
  }

  if (keys.has('ArrowDown')) {
    return Direction.DOWN;
  }

  if (keys.has('ArrowLeft')) {
    return Direction.LEFT;
  }
}

export function getAxisForDirection(direction: number) {
  return direction % 2 === 0 ? 'y' : 'x';
}

export function getValueForDirection(direction: number) {
  switch (direction) {
    case Direction.UP:
      return -1;
    case Direction.RIGHT:
      return 1;
    case Direction.DOWN:
      return 1;
    case Direction.LEFT:
      return -1;
  }
}

export function getSideForDirection(direction: number) {
  switch (direction) {
    case Direction.UP:
      return 'top';
    case Direction.RIGHT:
      return 'right';
    case Direction.DOWN:
      return 'bottom';
    case Direction.LEFT:
      return 'left';
  }
}
