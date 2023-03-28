/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { base } from '../tileMap';
import {
  TILE_SIZE_BIG,
  BASE_DEFAULT_POSITION,
  BASE_DEFAULT_SIZE,
  BORDER_LEFT_WIDTH,
  BORDER_TOP_BOTTOM_HEIGHT,
} from '../../config';
import { TRender } from '../World/World';

import { TLand } from './Land';

export class Base {
  land: TLand;
  view: number[];
  x: number;
  y: number;
  base_width: number;
  base_height: number;
  health: number;
  isDead: boolean;

  constructor(land: TLand) {
    this.land = land;
    this.view = [...base.alive];
    this.x = BASE_DEFAULT_POSITION.x;
    this.y = BASE_DEFAULT_POSITION.y;
    this.base_width = BASE_DEFAULT_SIZE.width;
    this.base_height = BASE_DEFAULT_SIZE.height;
    this.health = 2;
    this.isDead = false;
  }

  private harmed(): void {
    if (this.health > 0) {
      this.health -= 1;
    } else {
      this.destroyed();
    }
  }

  private destroyed(): void {
    this.isDead = true;
  }

  public calculateDeadZone(dx: number, dy: number, direction: string): boolean {
    switch (direction) {
      case 'ArrowUp':
        if (
          dx > this.x &&
          dx < this.x + this.base_width &&
          dy < this.y &&
          dy > this.y + this.base_height
        ) {
          this.harmed();
          return true;
        }
        break;
      case 'ArrowDown':
        if (dx > this.x && dx < this.x + this.base_width && dy > this.y) {
          this.harmed();
          return true;
        }
        break;
      case 'ArrowLeft':
        if (
          dx - 20 < this.x &&
          dx > this.x - this.base_width &&
          dy > this.y &&
          dy < this.y + this.base_height
        ) {
          this.harmed();
          return true;
        }
        break;
      case 'ArrowRight':
        if (
          dx > this.x &&
          dx < this.x + this.base_width &&
          dy > this.y &&
          dy < this.y + this.base_height
        ) {
          this.harmed();
          return true;
        }
        break;
      default:
        return false;
    }
  }

  public render(img: HTMLImageElement): TRender {
    return {
      clear: [
        this.x + BORDER_LEFT_WIDTH,
        this.y + BORDER_TOP_BOTTOM_HEIGHT,
        TILE_SIZE_BIG,
        TILE_SIZE_BIG,
      ],
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
