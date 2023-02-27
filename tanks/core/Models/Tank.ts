/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import { TILE_SIZE, PLAYER_DEFAULT_SPAWN_POSITIONS } from '../../config';
import { shiftTile } from '../utils/shiftTile';
import { getStopPoints } from '../utils/getStopPoints';
import { stopPosition } from '../utils/stopPosition';

import { TLand } from './Land';

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
export class Tank {
  land: TLand;
  x: number;
  y: number;
  view: number[];
  direction: Direction;
  private speed: number;
  rank: Rank;
  frames: number[][];
  type: Type;
  tank_width: number;
  tank_height: number;
  isShot: boolean;

  constructor(land: TLand) {
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
    this.isShot = false;
  }

  private getSizeTank(): [width: number, height: number] {
    return [this.view[2], this.view[3]];
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

  controlTank(key: Set<unknown>) {
    const opt = {
      x: this.x,
      y: this.y,
      land: this.land,
      direction: this.direction,
    };
    let stopPos = 0;
    switch (true) {
      case key.has(Direction.up):
        this.view = switchFrame(playerPrimary[this.rank].up, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.up);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        if (this.y > stopPos) {
          this.y -= this.speed;
        } else {
          this.y -= 0;
        }
        break;
      case key.has(Direction.right):
        this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.right);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        if (this.x + this.tank_width < stopPos) {
          this.x += this.speed;
        } else {
          this.x += 0;
        }
        break;
      case key.has(Direction.down):
        this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.down);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        if (this.y + this.tank_height < stopPos) {
          this.y += this.speed;
        } else {
          this.y += 0;
          this.isShot = false;
        }
        break;
      case key.has(Direction.left):
        this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.left);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        if (this.x > stopPos) {
          this.x -= this.speed;
        } else {
          this.x -= 0;
        }
        break;
    }
  }
}
