/* eslint-disable lines-between-class-members */
/* eslint-disable no-case-declarations */
/* eslint-disable no-const-assign */

import { spawn } from '../tileMap';
import { TILE_SIZE_BIG, BORDER_LEFT_WIDTH, BORDER_TOP_BOTTOM_HEIGHT } from '../../config';
import { TRender } from '../World/World';

import { TLand } from './Land';

interface IRespawnSprite {
  land: TLand;
  view: number[];
  x: number;
  y: number;
  width: number;
  height: number;
  vision: boolean;
}

export class RespawnSprite implements IRespawnSprite {
  land: TLand;
  view: number[];
  x: number;
  y: number;
  width: number;
  height: number;
  counterAnim: number;
  vision: boolean;

  constructor(land: TLand, x: number, y: number) {
    this.land = land;
    [this.view] = spawn;
    this.x = x - 2;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.counterAnim = 0;
    this.vision = false;
  }

  private animateSprite() {
    const [spawnZero, spawnOne, spawnTwo, spawnThree] = spawn;
    switch (this.counterAnim) {
      case 0:
        setTimeout(() => {
          this.view = spawnZero;
          this.counterAnim += 1;
        }, 50);
        break;
      case 1:
        setTimeout(() => {
          this.view = spawnOne;
          this.counterAnim += 1;
        }, 150);
        break;
      case 2:
        setTimeout(() => {
          this.view = spawnTwo;
          this.counterAnim += 1;
        }, 260);
        break;
      case 3:
        setTimeout(() => {
          this.view = spawnThree;
          this.counterAnim += 1;
        }, 370);
        break;
      default:
        setTimeout(() => {
          this.view = spawnZero;
          this.counterAnim = 0;
        }, 480);
        break;
    }
  }

  public render(img: HTMLImageElement): TRender {
    if (this.vision) {
      this.animateSprite();
    }
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
