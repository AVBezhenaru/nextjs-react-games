/* eslint-disable lines-between-class-members */
import { Tank } from '../Models/Tank';
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

class World implements IWorld {
  ctx: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  prevLand: Land | [];
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Tank[];
  bullets: Bullet[];
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;
    this.init();
  }

  init() {
    this.currentLevel = 1;
    this.land = new Land(this.currentLevel);
    this.prevLand = [];
    this.playerTank_1 = new Tank(this.land.curLevel);
    this.playerTank_2 = null;
    this.enemyTanks = [];
    this.bullets = [];
  }

  renderOnce() {
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

  renderPlayer_1(key: Set<unknown>) {
    this.renderTank(this.playerTank_1, key);
  }

  renderTank(tank: Tank, key: Set<unknown>) {
    const [x, y] = tank.getPosition();
    this.ctx.clearRect(x, y, TILE_SIZE_BIG, TILE_SIZE_BIG);
    tank.moveTank(key);
    this.ctx.drawImage(
      this.img,
      tank.view[0],
      tank.view[1],
      tank.view[2],
      tank.view[3],
      tank.x,
      tank.y,
      tank.view[2],
      tank.view[3],
    );
  }
}

export default World;
