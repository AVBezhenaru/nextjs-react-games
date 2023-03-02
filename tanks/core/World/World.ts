/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */

import { ControlKey, Tank } from '../Models/Tank';
import { Land } from '../Models/Land';
import { Bullet } from '../Models/Bullet';
import { BORDER_RECTS, COLOR_GRAY, TILE_SIZE } from '../../config';
import { explosion } from '../tileMap';
import { Interface } from '../Models/Interface';

interface IWorld {
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
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
  clear?: TRenderClear;
  draw: TRenderDraw;
};

class World implements IWorld {
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Tank[];
  bullets: Bullet[];
  img: HTMLImageElement;
  activeKeys: Set<unknown>;
  interface: Interface;

  constructor(
    ctx: CanvasRenderingContext2D,
    ctx2: CanvasRenderingContext2D,
    img: HTMLImageElement,
  ) {
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.img = img;
    this.init();
  }

  init() {
    this.currentLevel = 1;
    this.land = new Land(this.currentLevel);
    this.playerTank_1 = new Tank(this.land.curLevel);
    this.playerTank_2 = null;
    this.interface = new Interface();
    this.enemyTanks = [];
    this.bullets = [];
    this.activeKeys = new Set();
  }

  render() {
    const { clear: clPlayerTank1, draw: drPlayerTank1 } = this.playerTank_1.prepareRenderTank(
      this.activeKeys,
      this.img,
    );
    this.ctx.clearRect(...clPlayerTank1);
    this.ctx.drawImage(...drPlayerTank1);

    if (this.bullets.length > 0) {
      for (const bullet of this.bullets) {
        if (!bullet.isExplose) {
          const { clear: clBullet } = { ...bullet.prepareRenderBullet(this.img) };
          this.ctx.clearRect(...clBullet);
          bullet.fire();
          const { draw: drBullet } = { ...bullet.prepareRenderBullet(this.img) };
          this.ctx.drawImage(...drBullet);
        } else {
          const { clear: clBullet } = { ...bullet.prepareRenderBullet(this.img) };
          this.ctx.clearRect(...clBullet);
          this.bullets = this.bullets.filter((item) => item !== bullet);
          bullet.animationExploseBullet(explosion.small, 30, this.ctx2, this.img);
          const walls = this.land.destroyWall(bullet.stopBlocks, bullet.direction, 0);
          this.renderWalls(walls);
        }
      }
    }
  }

  renderStart() {
    const curLand = this.land.prepareMap(this.land.curLevel);
    this.land.prepareRenderLand(curLand, this.img).forEach((item) => {
      const { draw } = { ...item };
      this.ctx.drawImage(...draw);
    });
    this.renderBorders();
    this.interface.prepareRender(this.img).map((item) => this.ctx.drawImage(...item));
  }

  private renderWalls(walls: { col: number; row: number }[]) {
    this.land
      .prepareRenderWalls(walls)
      .filter((item) => !item.frame)
      .forEach((item) => {
        this.ctx.clearRect(item.x, item.y, TILE_SIZE, TILE_SIZE);
      });
    this.land
      .prepareRenderLand(
        this.land.prepareRenderWalls(walls).filter((item) => item.frame),
        this.img,
      )
      .forEach((item) => {
        const { clear, draw } = { ...item };
        this.ctx.clearRect(...clear);
        this.ctx.drawImage(...draw);
      });
  }

  private renderBorders() {
    this.ctx.fillStyle = COLOR_GRAY;
    BORDER_RECTS.map((border) =>
      this.ctx.fillRect(border.x, border.y, border.width, border.height),
    );
  }

  controll(key: Set<unknown>) {
    this.activeKeys = key;
    if (key.has(ControlKey.space)) {
      this.shot(this.playerTank_1);
    }
  }

  private shot(tank: Tank) {
    if (tank.isShot) {
      this.bullets.push(new Bullet(tank, this.land.curLevel));
      tank.fire();
    }
  }
}

export default World;
