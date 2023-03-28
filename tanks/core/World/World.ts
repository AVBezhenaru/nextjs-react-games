/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */

import { ControlKey, Tank } from '../Models/Tank';
import { Enemy } from '../Models/Enemy';
import { Land } from '../Models/Land';
import { Bullet } from '../Models/Bullet';
import { Base } from '../Models/Base';
import { BORDER_RECTS, COLOR_GRAY, TILE_SIZE } from '../../config';
import { explosion } from '../tileMap';
import { Interface } from '../Models/Interface';

const enemyCounter: { LEVEL_1: number } = {
  LEVEL_1: 3,
};

interface IWorld {
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Enemy[];
  bullets: Bullet[];
  base: Base;
  interval: NodeJS.Timer;
  gameOver: boolean;
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
  enemyTanks: Enemy[];
  bullets: Bullet[];
  base: Base;
  gameOver: boolean;
  interval: NodeJS.Timer;
  img: HTMLImageElement;
  activeKeys: Set<unknown>;
  interface: Interface;

  constructor(
    ctx: CanvasRenderingContext2D,
    ctx2: CanvasRenderingContext2D,
    img: HTMLImageElement,
    gameOver: boolean,
  ) {
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.img = img;
    this.gameOver = gameOver;
    this.init();
  }

  init() {
    this.currentLevel = 1;
    this.land = new Land(this.currentLevel);
    this.playerTank_1 = new Tank(this.land.curLevel);
    this.playerTank_2 = null;
    this.enemyTanks = [];
    this.interface = new Interface();
    this.bullets = [];
    this.base = new Base(this.land.curLevel);
    this.activeKeys = new Set();

    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      this.enemyTanks.push(new Enemy(this.land.curLevel, i, i + 1));
    }

    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      this.interval = setInterval(() => {
        this.enemyFire(this.enemyTanks[i]);
      }, 1500);
    }
  }

  render() {
    if (this.base.health === 0) {
      this.setGameOver();
    }

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

    if (!this.base.isDead) {
      const { clear: clearBase, draw: drawBase } = this.base.render(this.img);
      this.ctx.drawImage(...drawBase);

      if (this.bullets.length > 0) {
        for (const bullet of this.bullets) {
          const getHit = this.base.calculateDeadZone(bullet.x, bullet.y, bullet.direction);

          if (getHit) {
            bullet.isExplose = true;
            this.playerTank_1.reloadWeapon();
          }

          if (this.base.isDead) {
            this.ctx.clearRect(...clearBase);
          }
        }
      }
    }

    this.enemyTanks = this.enemyTanks.filter((enemy: Enemy) => !enemy.isDead);
    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      if (this.enemyTanks[i] !== undefined) {
        const { clear: clEnemy, draw: drEnemy } = this.enemyTanks[i].prepareRenderEnemy(this.img);
        this.ctx.clearRect(...clEnemy);
        this.ctx.drawImage(...drEnemy);
        if (this.bullets.length > 0) {
          for (const bullet of this.bullets) {
            const shouted = this.enemyTanks[i].calculateDeadZone(
              bullet.x,
              bullet.y,
              bullet.direction,
              bullet.tank.title,
            );

            if (shouted) {
              bullet.isExplose = true;
              this.playerTank_1.reloadWeapon();
              this.enemyTanks[i].enemyDestroyed();
              clearInterval(this.interval);
              this.ctx.clearRect(...clEnemy);
            }
          }
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

  // store.dispatch
  setGameOver() {
    this.gameOver = true;
    return this.gameOver;
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

  private enemyFire(enemy: Enemy) {
    if (enemy !== undefined) {
      this.bullets.push(new Bullet(enemy, this.land.curLevel));
      enemy.fire();
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
