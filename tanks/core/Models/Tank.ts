/* eslint-disable lines-between-class-members */
import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import {
  FIELD_SIZE,
  TILE_SIZE,
  FIELD_TILE_COUNT,
  PLAYER_DEFAULT_SPAWN_POSITIONS,
} from '../../config';
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
    [this.view] = [...playerPrimary.rank_1.up];
    [this.tank_width, this.tank_height] = [this.view[2], this.view[3]];
    this.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x + shiftTile(this.tank_width, this.tank_height)[0];
    this.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y + shiftTile(this.tank_width, this.tank_height)[1];
    this.direction = Direction.up;
    this.speed = 3;
    this.rank = Rank.LEVEL1;
    this.type = Type.PLAYER1;
    this.frames = playerPrimary.rank_1.up;
    this.land = land;
  }

  private isCanMove(direction: Direction) {
    const firstCol = Math.round(this.x / TILE_SIZE);
    const firstRow = Math.round(this.y / TILE_SIZE);
    const secondCol = Math.round((this.x + this.tank_width) / TILE_SIZE);
    const secondRow = Math.round((this.y + this.tank_height) / TILE_SIZE);

    const [stopFirstRow, stopFirstCol] = this.findBarrier(firstRow, firstCol);
    console.log(stopFirstRow, stopFirstCol);
    // const [stopSecondRow, stopSecondCol] = this.findBarrier(secondRow, secondCol);
    // console.log(this.y, stopSecondRow * TILE_SIZE + TILE_SIZE);
    switch (true) {
      case direction === Direction.up:
        return (
          this.y >= 0 &&
          this.y > stopFirstRow * TILE_SIZE + TILE_SIZE &&
          this.y + this.tank_width > stopFirstRow * TILE_SIZE + TILE_SIZE
        );
      case direction === Direction.right:
        return this.x <= FIELD_SIZE - this.tank_width;
      case direction === Direction.down:
        return this.y <= FIELD_SIZE - this.tank_height;
      case direction === Direction.left:
        return this.x >= 0;
    }
  }

  private findBarrier(row: number, col: number) {
    while (row > 0 && col > 0) {
      if (this.land[row][col]) {
        return [row, col];
      }
      row -= 1;
    }
    return [row, col];
  }

  moveTank(key: Set<unknown>) {
    switch (true) {
      case key.has(Direction.up):
        this.view = switchFrame(playerPrimary[this.rank].up, this.view);
        this.shiftWhenTurn(Direction.up);
        if (this.y > 0) {
          this.y -= this.speed;
        } else {
          this.y = 0;
        }
        break;
      case key.has(Direction.right):
        this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        this.shiftWhenTurn(Direction.right);
        if (this.x + this.speed + this.tank_width < FIELD_SIZE) {
          this.x += this.speed;
        } else {
          this.x = FIELD_SIZE - this.tank_width;
        }
        break;
      case key.has(Direction.down):
        this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        this.shiftWhenTurn(Direction.down);
        if (this.y + this.speed + this.tank_height < FIELD_SIZE) {
          this.y += this.speed;
        } else {
          this.y = FIELD_SIZE - this.tank_height;
        }
        break;
      case key.has(Direction.left):
        this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        this.shiftWhenTurn(Direction.left);
        if (this.x > 0) {
          this.x -= this.speed;
        } else {
          this.x = 0;
        }
        break;
    }
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
}
