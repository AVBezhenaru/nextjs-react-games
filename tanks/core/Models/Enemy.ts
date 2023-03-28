/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { enemy } from '../tileMap';
import { shiftTile } from '../utils/shiftTile';
import {
  BORDER_LEFT_WIDTH,
  BORDER_TOP_BOTTOM_HEIGHT,
  ENEMY_DEFAULT_SPAWN_POSITIONS,
  TILE_SIZE,
  TILE_SIZE_BIG,
} from '../../config';
import { TRender } from '../World/World';
import { switchFrame } from '../utils/switchFrame';
import { getStopPoints } from '../utils/getStopPoints';
import { stopPosition } from '../utils/stopPosition';

import { Direction, Tank } from './Tank';
import { TLand } from './Land';

export enum EnemyRank {
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd',
}

export class Enemy extends Tank {
  id: number;
  isDead: boolean;
  enemyRank: EnemyRank;
  title: string;
  private readonly enemySpeed: number;

  constructor(land: TLand, _pos: number, id: number) {
    super(land);
    this.id = id;
    [this.view] = [...enemy.a.down];
    [this.tank_width, this.tank_height] = this.getSizeTank();
    this.x =
      ENEMY_DEFAULT_SPAWN_POSITIONS[_pos].x + shiftTile(this.tank_width, this.tank_height)[0];
    this.y =
      ENEMY_DEFAULT_SPAWN_POSITIONS[_pos].y + shiftTile(this.tank_width, this.tank_height)[1];
    this.frames = enemy.a.down;
    this.direction = Direction.down;
    this.land = land;
    this.enemyRank = EnemyRank.a;
    this.enemySpeed = 1;
    this.title = 'Enemy';
    this.isDead = false;
    this.countShot = 2;
    this.init();
  }

  enemyDestroyed() {
    this.isDead = true;
  }

  calculateDeadZone(dx: number, dy: number, _direction: string, tank: string): boolean {
    if (tank === this.title) return false;
    let result = false;
    switch (_direction) {
      case 'ArrowUp':
        if (
          dx > this.x &&
          dx < this.x + this.tank_width &&
          dy < this.y + this.tank_height &&
          dy > this.y
        ) {
          result = true;
        }
        break;
      case 'ArrowDown':
        if (
          dx > this.x &&
          dx < this.x + this.tank_width &&
          dy > this.y &&
          dy < this.y + this.tank_height
        ) {
          result = true;
        }
        break;
      case 'ArrowRight':
        if (
          dx > this.x &&
          dx < this.x + this.tank_width &&
          dy > this.y &&
          dy < this.y + this.tank_height
        ) {
          result = true;
        }
        break;
      case 'ArrowLeft':
        if (
          dx < this.x + this.tank_width &&
          dx > this.x &&
          dy > this.y &&
          dy < this.y + this.tank_height
        ) {
          result = true;
        }
        break;
      default:
        break;
    }
    return result;
  }

  private enemyMovement() {
    const opt = {
      x: this.x,
      y: this.y,
      land: this.land,
      direction: this.direction,
    };
    let stopPos = 0;
    let _x: number;
    let _y: number;
    const dx: number = shiftTile(this.tank_width, this.tank_height)[0];
    const dy: number = shiftTile(this.tank_width, this.tank_height)[1];
    const _direction = Math.round(1 - 0.5 + Math.random() * 3);
    switch (this.direction) {
      case Direction.down:
        _y = this.y;
        this.view = switchFrame(enemy[this.enemyRank].down, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.y += this.y + this.tank_height + this.enemySpeed < stopPos ? this.enemySpeed : 0;
        if (this.y === _y) {
          switch (_direction) {
            case 1:
              this.shiftWhenTurn(Direction.up);
              this.direction = Direction.up;
              break;
            case 2:
              this.shiftWhenTurn(Direction.right);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.right;
              break;
            case 3:
              this.shiftWhenTurn(Direction.left);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.left;
              break;
          }
        }
        break;
      case Direction.up:
        _y = this.y;
        this.view = switchFrame(enemy[this.enemyRank].up, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.y -= this.y - this.enemySpeed > stopPos ? this.enemySpeed : 0;
        if (this.y === _y) {
          switch (_direction) {
            case 1:
              this.shiftWhenTurn(Direction.down);
              this.direction = Direction.down;
              break;
            case 2:
              this.shiftWhenTurn(Direction.right);
              this.y = Math.round(this.y / TILE_SIZE) * TILE_SIZE + dy;
              this.direction = Direction.right;
              break;
            case 3:
              this.shiftWhenTurn(Direction.left);
              this.y = Math.round(this.y / TILE_SIZE) * TILE_SIZE + dy;
              this.direction = Direction.left;
              break;
          }
        }
        break;
      case Direction.left:
        _x = this.x;
        this.view = switchFrame(enemy[this.enemyRank].left, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.y = Math.round(this.y / TILE_SIZE) * TILE_SIZE + dy;
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.x -= this.x - this.enemySpeed > stopPos ? this.enemySpeed : 0;
        if (this.x === _x) {
          switch (_direction) {
            case 1:
              this.shiftWhenTurn(Direction.up);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.up;
              break;
            case 2:
              this.shiftWhenTurn(Direction.down);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.down;
              break;
            case 3:
              this.shiftWhenTurn(Direction.right);
              this.direction = Direction.right;
              break;
          }
        }
        break;
      case Direction.right:
        _x = this.x;
        this.view = switchFrame(enemy[this.enemyRank].right, this.view);
        [this.tank_width, this.tank_height] = this.getSizeTank();
        this.y = Math.round(this.y / TILE_SIZE) * TILE_SIZE + dy;
        stopPos = stopPosition({ ...getStopPoints({ ...opt }), direction: this.direction });
        this.x += this.x + this.tank_width + this.enemySpeed < stopPos ? this.enemySpeed : 0;
        if (this.x === _x) {
          switch (_direction) {
            case 1:
              this.shiftWhenTurn(Direction.up);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.up;
              break;
            case 2:
              this.shiftWhenTurn(Direction.down);
              this.x = Math.round(this.x / TILE_SIZE) * TILE_SIZE + dx;
              this.direction = Direction.down;
              break;
            case 3:
              this.shiftWhenTurn(Direction.left);
              this.direction = Direction.left;
              break;
          }
        }
        break;
    }
  }

  prepareRenderEnemy(img: HTMLImageElement): TRender {
    const [x, y] = this.getPosition();
    this.enemyMovement();
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
