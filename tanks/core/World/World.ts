/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */

import { ControlKey, Tank } from '../Models/Tank';
import { Land } from '../Models/Land';
import { Bullet } from '../Models/Bullet';
import { TILE_SIZE, TILE_SIZE_BIG } from '../../config';
import { explosion } from '../tileMap';

interface IWorld {
  ctx: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Tank[];
  bullets: Bullet[];
  img: HTMLImageElement;
}

export type TRenderClear = [number, number, number, number];
export type TRenderDraw = [
  HTMLImageElement,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type TRender = {
  clear: TRenderClear;
  draw: TRenderDraw;
};

class World implements IWorld {
  ctx: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Tank[];
  bullets: Bullet[];
  img: HTMLImageElement;
  activeKeys: Set<unknown>;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;
    this.init();
  }

  init() {
    this.currentLevel = 1;
    this.land = new Land(this.currentLevel);
    this.playerTank_1 = new Tank(this.land.curLevel);
    this.playerTank_2 = null;
    this.enemyTanks = [];
    this.bullets = [];
    this.activeKeys = new Set();
  }

  render() {
    
    const { clear: clPlayerTank1, draw: drPlayerTank1 } = this.renderTank(
      this.playerTank_1,
      this.activeKeys,
    );
    this.ctx.clearRect(...clPlayerTank1);
    this.ctx.drawImage(...drPlayerTank1);

    if (this.bullets.length > 0) {
      for (const bullet of this.bullets) {
        if (!bullet.isExplose) {
          const { clear: clBullet } = { ...this.renderBullet(bullet) };
          this.ctx.clearRect(...clBullet);
          bullet.fire();
          const { draw: drBullet } = { ...this.renderBullet(bullet) };
          this.ctx.drawImage(...drBullet);
        } else {
          const { clear: clBullet } = { ...this.renderBullet(bullet) };
          this.ctx.clearRect(...clBullet);
          this.bullets = this.bullets.filter((item) => item !== bullet);

          this.animation({ x: bullet.x, y: bullet.y, frames: explosion.small }, 60);
        }
      }
    }
  }

  //   y = Math.ceil(y / TILE_SIZE) * TILE_SIZE - TILE_SIZE;
  animation({ x, y, frames }: { x: number; y: number; frames: number[][] }, delay: number) {    
    let n = 0;
    const self = this;
    setTimeout(function tick() {
      if (n < frames.length) {
        const coordX = Math.ceil(x / TILE_SIZE) * TILE_SIZE - frames[n][2] / 2;
        const coordY = Math.ceil(y / TILE_SIZE) * TILE_SIZE - frames[n][3] / 2;
        // self.ctx.clearRect(coordX, coordY, frames[n][2], frames[n][3]);
        self.ctx.globalCompositeOperation = 'destination-over';
        self.ctx.drawImage(
          self.img,
          frames[n][0],
          frames[n][1],
          frames[n][2],
          frames[n][3],
          coordX,
          coordY,
          frames[n][2],
          frames[n][3],
        );
        n++;
        setTimeout(tick, delay);
      }
    }, 0);
  }

  renderOnce() {
    this.renderLand();
  }

  controll(key: Set<unknown>) {
    this.activeKeys = key;
    if (key.has(ControlKey.space)) {
      this.shot(this.playerTank_1);
    }
  }

  private shot(tank: Tank) {
    if (!tank.isShot) {
      this.bullets.push(new Bullet(tank, this.land.curLevel));
      tank.isShot = true;
    }
  }

  private renderBullet(bullet: Bullet): TRender {
    return {
      clear: [bullet.x, bullet.y, bullet.width, bullet.height],
      draw: [
        this.img,
        bullet.view[0],
        bullet.view[1],
        bullet.view[2],
        bullet.view[3],
        bullet.x,
        bullet.y,
        bullet.view[2],
        bullet.view[3],
      ],
    };
  }

  private renderLand() {
    const curLand: number[][] = this.land.getRenderMap();
    for (let i = 0; i < curLand.length; i++) {
      for (let j = 0; j < curLand[i].length; j++) {
        const elem = curLand[i][j];
        if (Array.isArray(elem)) {
          this.ctx.drawImage(
            this.img,
            elem[0],
            elem[1],
            elem[2],
            elem[3],
            j * TILE_SIZE,
            i * TILE_SIZE,
            elem[2],
            elem[3],
          );
        }
      }
    }
  }

  private renderTank(tank: Tank, key: Set<unknown>): TRender {
    const [x, y] = tank.getPosition();
    tank.controlTank(key);
    return {
      clear: [x, y, TILE_SIZE_BIG, TILE_SIZE_BIG],
      draw: [
        this.img,
        tank.view[0],
        tank.view[1],
        tank.view[2],
        tank.view[3],
        tank.x,
        tank.y,
        tank.view[2],
        tank.view[3],
      ],
    };
  }

  // private renderExplose(x: number, y: number, type: any) {
  //   x = Math.ceil(x / explosion.small[2]) * TILE_SIZE - TILE_SIZE;
  //   y = Math.ceil(y / TILE_SIZE) * TILE_SIZE - TILE_SIZE;
  //   return { x, y, frames: explosion[type] };
  // }
}

export default World;
