/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import { TILE_SIZE, FIELD_TILE_COUNT, PLAYER_DEFAULT_SPAWN_POSITIONS } from '../../config';
import { shiftTile } from '../utils/shiftTile';

// import { Land } from './Land';

export enum Direction {
  up = 'ArrowUp',
  down = 'ArrowDown',
  left = 'ArrowLeft',
  right = 'ArrowRight',
}

const ReverseDirection = {
  ArrowUp: Direction.down,
  ArrowDown: Direction.up,
  ArrowRight: Direction.left,
  ArrowLeft: Direction.right,
};

export const ControlKey = {
  ...Direction,
  space: 'Space',
};

export enum Rank {
  LEVEL1 = 'rank_1',
  LEVEL2 = 'rank_2',
  LEVEL3 = 'rank_3',
  LEVEL4 = 'rank_4',
}

enum Type {
  PLAYER1 = 'playerPrimary',
  PLAYER2 = 'playerSecondary',
  ENEMY = 'enemy',
}

interface ITank {
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  rank: Rank;
  type: Type;
}

export class Tank implements ITank {
  land: number[][];
  x: number;
  y: number;
  view: number[];
  direction: Direction;
  speed: number;
  rank: Rank;
  frames: number[][];
  type: Type;
  tank_width: number;
  tank_height: number;

  constructor(land: number[][]) {
    [this.view] = [...playerPrimary.rank_2.up];
    [this.tank_width, this.tank_height] = this.getSizeTank();
    this.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x + shiftTile(this.tank_width, this.tank_height)[0];
    this.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y + shiftTile(this.tank_width, this.tank_height)[1];
    this.direction = Direction.up;
    this.speed = 3;
    this.rank = Rank.LEVEL2;
    this.type = Type.PLAYER1;
    this.frames = playerPrimary.rank_2.up;
    this.land = land;
  }

  private getSizeTank(): [width: number, height: number] {
    return [this.view[2], this.view[3]];
  }

  private isCanMove(direction: Direction) {
    let stopPos1 = 0;
    let stopPos2 = 0;
    const [stopRow1, stopCol1] = this.findBarrier(
      this.y / TILE_SIZE,
      this.x / TILE_SIZE,
      direction,
    );
    const [stopRow2, stopCol2] = this.findBarrier(
      (this.y + TILE_SIZE) / TILE_SIZE,
      (this.x + TILE_SIZE) / TILE_SIZE,
      direction,
    );

    switch (true) {
      case direction === Direction.up:
        stopPos1 = stopRow1 === 0 ? stopRow1 * TILE_SIZE : stopRow1 * TILE_SIZE + TILE_SIZE;
        stopPos2 = stopRow2 === 0 ? stopRow2 * TILE_SIZE : stopRow2 * TILE_SIZE + TILE_SIZE;
        return this.y > stopPos1 && this.y > stopPos2;

      case direction === Direction.right:
        stopPos1 = stopCol1 * TILE_SIZE;
        stopPos2 = stopCol2 * TILE_SIZE;
        return this.x + this.tank_width < stopPos1 && this.x + this.tank_width < stopPos2;

      case direction === Direction.down:
        stopPos1 = stopRow1 * TILE_SIZE;
        stopPos2 = stopRow2 * TILE_SIZE;
        return this.y + this.tank_height < stopPos1 && this.y + this.tank_height < stopPos2;

      case direction === Direction.left:
        stopPos1 = stopCol1 === 0 ? stopCol1 * TILE_SIZE : stopCol1 * TILE_SIZE + TILE_SIZE;
        stopPos2 = stopCol2 === 0 ? stopCol2 * TILE_SIZE : stopCol2 * TILE_SIZE + TILE_SIZE;
        return this.x > stopPos1 && this.x > stopPos2;
    }
  }

  private findBarrier(row: number, col: number, direction: Direction) {
    row = Math.round(row);
    col = Math.round(col);
    while (row >= 0 && col >= 0 && row <= FIELD_TILE_COUNT - 1 && col <= FIELD_TILE_COUNT - 1) {
      if (this.land[row][col] > 0 && this.land[row][col] < 10) {
        return [row, col];
      }
      if (direction === Direction.up) row -= 1;
      if (direction === Direction.down) row += 1;
      if (direction === Direction.right) col += 1;
      if (direction === Direction.left) col -= 1;
    }
    return [row, col];
  }

  private shiftWhenTurn(direction: Direction) {
    if (direction !== this.direction && direction !== ReverseDirection[this.direction]) {
      const x = Math.round(this.x / TILE_SIZE) * TILE_SIZE;
      const y = Math.round(this.y / TILE_SIZE) * TILE_SIZE;
      const [dx, dy] = shiftTile(this.tank_width, this.tank_height);
      this.x = x + dx;
      this.y = y + dy;
    }
    this.direction = direction;
  }

  getPosition() {
    const x = this.x - shiftTile(this.tank_width, this.tank_height)[0];
    const y = this.y - shiftTile(this.tank_width, this.tank_height)[1];
    return [x, y];
  }

  moveTank(key: Set<unknown>) {
    switch (true) {
      case key.has(Direction.up):
        this.view = switchFrame(playerPrimary[this.rank].up, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.up);
        if (this.isCanMove(Direction.up)) {
          this.y -= this.speed;
        } else {
          this.y -= 0;
        }
        break;
      case key.has(Direction.right):
        this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.right);
        if (this.isCanMove(Direction.right)) {
          this.x += this.speed;
        } else {
          this.x += 0;
        }
        break;
      case key.has(Direction.down):
        this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.down);
        if (this.isCanMove(Direction.down)) {
          this.y += this.speed;
        } else {
          this.y += 0;
        }
        break;
      case key.has(Direction.left):
        this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.left);
        if (this.isCanMove(Direction.left)) {
          this.x -= this.speed;
        } else {
          this.x -= 0;
        }
        break;
    }
  }
}
