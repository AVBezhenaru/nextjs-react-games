/* eslint-disable lines-between-class-members */
import { TILE_SIZE } from '../../config';
import { bullet } from '../tileMap';
import { getStopPoints } from '../utils/getStopPoints';
import { stopPosition } from '../utils/stopPosition';

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
  isExplose: boolean;
  stopBlocks: { stopRow1: number; stopCol1: number; stopRow2: number; stopCol2: number };

  constructor(tank: Tank, land: TLand) {
    this.tank = tank;
    this.direction = tank.direction;
    [this.x, this.y] = this.getPosition(this.tank.direction);
    this.view = bullet.up;
    this.land = land;
    this.isExplose = false;
    this.speed = 10;
    this.stopBlocks = { stopCol1: 0, stopCol2: 0, stopRow1: 0, stopRow2: 0 };
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

  fire() {
    const opt = {
      x: this.x - TILE_SIZE,
      y: this.y - TILE_SIZE,
      land: this.land,
      direction: this.direction,
    };
    let stopPos = 0;
    this.stopBlocks = getStopPoints({ ...opt });
    switch (this.direction) {
      case Direction.up:
        this.view = bullet.up;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction });
        if (this.y > stopPos) {
          this.y -= this.speed;
        } else {
          this.y -= 0;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.right:
        this.view = bullet.right;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction }) - this.width;
        if (this.x < stopPos) {
          this.x += this.speed;
        } else {
          this.x += 0;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.down:
        this.view = bullet.down;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction }) - this.height;
        if (this.y < stopPos) {
          this.y += this.speed;
        } else {
          this.y += 0;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.left:
        this.view = bullet.left;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction });
        if (this.x > stopPos) {
          this.x -= this.speed;
        } else {
          this.x -= 0;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
    }
  }
}
