/* eslint-disable lines-between-class-members */
import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import {
  FIELD_SIZE,
  TILE_SIZE,
  FIELD_TILE_COUNT,
  PLAYER_DEFAULT_SPAWN_POSITIONS,
} from '../../config';
import { fieldHeight } from '../../../tetris/models/static-data';

// import { Land } from './Land';

export enum ControlKey {
  up = 'ArrowUp',
  down = 'ArrowDown',
  left = 'ArrowLeft',
  right = 'ArrowRight',
  space = 'Space',
}

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
  direction: ControlKey;
  speed: number;
  rank: Rank;
  type: Type;
}

export class Tank implements ITank {
  land: number[][];
  x: number;
  y: number;
  view: number[];
  direction: ControlKey;
  speed: number;
  rank: Rank;
  frames: number[][];
  type: Type;
  tank_width: number;
  tank_height: number;

  constructor(land: number[][]) {
    this.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x;
    this.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y;
    [this.view] = [...playerPrimary.rank_1.up];
    this.direction = ControlKey.up;
    this.speed = 3;
    this.rank = Rank.LEVEL1;
    this.type = Type.PLAYER1;
    this.frames = playerPrimary.rank_1.up;
    [this.tank_width, this.tank_height] = [this.view[2], this.view[3]];
    this.land = land;
  }

  isCanMove(direction: ControlKey) {
    const firstCol = Math.round(this.x / TILE_SIZE);
    const firstRow = Math.round(this.y / TILE_SIZE);
    const secondCol = Math.round((this.x + this.tank_width) / TILE_SIZE);
    const secondRow = Math.round((this.y + this.tank_height) / TILE_SIZE);

    const [stopFirstRow, stopFirstCol] = this.findBarrier(firstRow, firstCol);
    // const [stopSecondRow, stopSecondCol] = this.findBarrier(secondRow, secondCol);
    // console.log(this.y, stopSecondRow * TILE_SIZE + TILE_SIZE);
    switch (true) {
      case direction === ControlKey.up:
        return (
          this.y >= 0 &&
          this.y > stopFirstRow * TILE_SIZE + TILE_SIZE &&
          this.y + this.tank_width > stopFirstRow * TILE_SIZE + TILE_SIZE
        );
      case direction === ControlKey.right:
        return this.x <= FIELD_SIZE - this.tank_width;
      case direction === ControlKey.down:
        return this.y <= FIELD_SIZE - this.tank_height;
      case direction === ControlKey.left:
        return this.x >= 0;
    }
  }

  findBarrier(row: number, col: number) {
    while (row > 0 && col > 0) {
      console.log(row, col);
      if (this.land[row][col]) {
        return [row, col];
      }
      row -= 1;
      console.log(row, col);
    }
    return [row, col];
  }

  moveTank(key: Set<unknown>) {
    switch (true) {
      case key.has(ControlKey.up):
        if (this.y - this.speed > 0) {
          this.y -= this.isCanMove(ControlKey.up) ? this.speed : 0;
        } else {
          this.y = 0;
        }
        this.view = switchFrame(playerPrimary[this.rank].up, this.view);

        break;
      case key.has(ControlKey.right):
        if (this.isCanMove(ControlKey.right)) {
          if (this.x + this.speed + this.tank_width < FIELD_SIZE) {
            this.x += this.speed;
          } else {
            this.x = FIELD_SIZE - this.tank_width;
          }
          this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        }
        break;
      case key.has(ControlKey.down):
        if (this.isCanMove(ControlKey.down)) {
          if (this.y + this.speed + this.tank_height < FIELD_SIZE) {
            this.y += this.speed;
          } else {
            this.y = FIELD_SIZE - this.tank_height;
          }
          this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        }
        break;
      case key.has(ControlKey.left):
        if (this.isCanMove(ControlKey.left)) {
          if (this.x - this.speed > 0) {
            this.x -= this.speed;
          } else {
            this.x = 0;
          }
          this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        }
        break;
    }
  }
}
