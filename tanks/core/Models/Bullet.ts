/* eslint-disable lines-between-class-members */
import { TILE_SIZE } from '../../config';
import { bullet } from '../tileMap';
import { getStopPoints } from '../utils/getStopPoints';
import { isCanMove } from '../utils/isCanMove';

import { TLand } from './Land';
import { Direction, Tank } from './Tank';

export class Bullet {
  tank: Tank;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  // direction: Direction;
  view: number[];
  land: TLand;
  direction: Direction;
  shot: boolean;

  constructor(tank: Tank, land: TLand) {
    this.tank = tank;
    this.direction = tank.direction;
    [this.x, this.y] = this.getPosition(this.tank.direction);
    this.view = bullet.up;
    this.land = land;
    this.shot = true;
    this.speed = 5;
  }

  get bulletParams() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      direction: this.direction,
    };
  }
  private getPosition(direction: Direction) {
    switch (true) {
      case direction === Direction.up:
        this.direction = Direction.up;
        [, , this.width, this.height] = [...bullet.up];
        return [
          Math.round(this.tank.x + this.tank.tank_width / 2 - this.width / 2),
          Math.round(this.tank.y - bullet.up[3]),
        ];

      case direction === Direction.right:
        this.direction = Direction.right;
        [, , this.width, this.height] = [...bullet.right];
        return [
          Math.round(this.tank.x + this.tank.tank_width),
          Math.round(this.tank.y + this.tank.tank_height / 2 - this.height / 2),
        ];

      case direction === Direction.down:
        this.direction = Direction.down;
        [, , this.width, this.height] = [...bullet.down];
        return [
          Math.round(this.tank.x + this.tank.tank_width / 2 - this.width / 2),
          Math.round(this.tank.y + this.tank.tank_height),
        ];

      case direction === Direction.left:
        this.direction = Direction.left;
        [, , this.width, this.height] = [...bullet.left];
        return [
          Math.round(this.tank.x - bullet.left[2]),
          Math.round(this.tank.y + this.tank.tank_height / 2 - this.height / 2),
        ];
    }
  }

  run() {
    const opt = {
      x: this.x - TILE_SIZE,
      y: this.y - TILE_SIZE,
      land: this.land,
      direction: this.direction,
    };
    const isMoveOpt = { ...getStopPoints({ ...opt }) };

    switch (this.direction) {
      case Direction.up:
        this.view = bullet.up;
        if (isCanMove({ ...isMoveOpt, ...this.bulletParams })) {
          this.y -= this.speed;
        } else {
          this.y -= 0;
          this.shot = false;
        }
        break;
      case Direction.right:
        this.view = bullet.right;
        if (isCanMove({ ...isMoveOpt, ...this.bulletParams })) {
          this.x += this.speed;
        } else {
          this.x += 0;
          this.shot = false;
        }
        break;
      case Direction.down:
        this.view = bullet.down;
        if (isCanMove({ ...isMoveOpt, ...this.bulletParams })) {
          this.y += this.speed;
        } else {
          this.y += 0;
          this.shot = false;
        }
        break;
      case Direction.left:
        this.view = bullet.left;
        if (isCanMove({ ...isMoveOpt, ...this.bulletParams })) {
          this.x -= this.speed;
        } else {
          this.x -= 0;
          this.shot = false;
        }
        break;
    }
  }
}
