/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import {
  TILE_SIZE,
  PLAYER_DEFAULT_SPAWN_POSITIONS,
  BORDER_LEFT_WIDTH,
  BORDER_TOP_BOTTOM_HEIGHT,
  TILE_SIZE_BIG,
} from '../../config';
import { shiftTile } from '../utils/shiftTile';
import { getStopPoints } from '../utils/getStopPoints';
import { stopPosition } from '../utils/stopPosition';
import { TRender } from '../World/World';

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

export enum Type {
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
  title: string;
  tank_width: number;
  tank_height: number;
  countShot: number;

  constructor(land: TLand) {
    [this.view] = [...playerPrimary.rank_3.up];
    [this.tank_width, this.tank_height] = this.getSizeTank();
    this.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x + shiftTile(this.tank_width, this.tank_height)[0];
    this.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y + shiftTile(this.tank_width, this.tank_height)[1];
    this.direction = Direction.up;
    this.speed = 3;
    this.rank = Rank.LEVEL3;
    this.type = Type.PLAYER1;
    this.title = 'Tank';
    this.frames = playerPrimary.rank_2.up;
    this.land = land;
    this.countShot = 2;
    this.init();
  }

  init() {
    this.countShot = this.rank > Rank.LEVEL2 ? 2 : 1;
  }

  get isShot() {
    return this.countShot > 0;
  }

  fire() {
    this.countShot -= 1;
  }

  reloadWeapon() {
    this.countShot = 2;
  }

  public getSizeTank(): [width: number, height: number] {
    return [this.view[2], this.view[3]];
  }

  public shiftWhenTurn(direction: Direction) {
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
        this.y -= this.y - this.speed > stopPos ? this.speed : 0;
        break;
      case key.has(Direction.right):
        this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.right);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.x += this.x + this.tank_width + this.speed < stopPos ? this.speed : 0;
        break;
      case key.has(Direction.down):
        this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.down);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.y += this.y + this.tank_height + this.speed < stopPos ? this.speed : 0;
        break;
      case key.has(Direction.left):
        this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.shiftWhenTurn(Direction.left);
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.x -= this.x - this.speed > stopPos ? this.speed : 0;
        break;
    }
  }

  prepareRenderTank(key: Set<unknown>, img: HTMLImageElement): TRender {
    const [x, y] = this.getPosition();
    this.controlTank(key);
    return {
      clear: [x + BORDER_LEFT_WIDTH, y + BORDER_TOP_BOTTOM_HEIGHT, TILE_SIZE_BIG, TILE_SIZE_BIG],
      draw: [
        img,
        this.view[0],
        this.view[1],
        this.view[2],
        this.view[3],
        this.x + BORDER_LEFT_WIDTH,
        this.y + BORDER_TOP_BOTTOM_HEIGHT,
        this.view[2],
        this.view[3],
      ],
    };
  }
}
