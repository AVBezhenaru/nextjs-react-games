/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */

import { ControlKey, Tank } from '../Models/Tank';
import { Land } from '../Models/Land';
import { Bullet } from '../Models/Bullet';
import { TILE_SIZE, TILE_SIZE_BIG } from '../../config';

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
        if (bullet.shot) {
          const { clear: clBullet } = { ...this.renderBullet(bullet) };
          this.ctx.clearRect(...clBullet);
          bullet.run();
          const { draw: drBullet } = { ...this.renderBullet(bullet) };
          this.ctx.drawImage(...drBullet);
        }
      }
    }
  }

  renderOnce() {
    this.renderLand();
  }

  controll(key: Set<unknown>) {
    this.activeKeys = key;
    if (key.has(ControlKey.space)) {
      this.shot();
    }
  }

  shot() {
    const bullet = new Bullet(this.playerTank_1, this.land.curLevel);
    this.bullets.push(bullet);
    this.playerTank_1.shot = true;
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
}

export default World;
