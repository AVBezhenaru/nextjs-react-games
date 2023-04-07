/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */

import { ControlKey, Direction, Tank } from '../Models/Tank';
import { Enemy } from '../Models/Enemy';
import { Land } from '../Models/Land';
import { Bullet } from '../Models/Bullet';
import { Base } from '../Models/Base';
import {
  BORDER_RECTS,
  COLOR_GRAY,
  ENEMY_DEFAULT_SPAWN_POSITIONS,
  PLAYER_DEFAULT_SPAWN_POSITIONS,
  TILE_SIZE,
} from '../../config';
import { enemy, explosion, playerPrimary } from '../tileMap';
import { Interface } from '../Models/Interface';
import { store } from '../../../store/index';
import {
  tanksGameOverAction,
  tanksGameVictoryAction,
  tanksGameCountScoresAction,
} from '../../reducers/tanksGameAction';
import { RespawnSprite } from '../Models/RespawnSprite';

const enemyCounter: { LEVEL_1: number } = {
  LEVEL_1: 3,
};

// Audio assets
let gameOver: HTMLAudioElement;
let gameVictory: HTMLAudioElement;
let fire: HTMLAudioElement;
const enemyFire: HTMLAudioElement[] = [];
let hitEnemy: HTMLAudioElement;
if (typeof Audio !== 'undefined') {
  gameOver = new Audio('/audio/tanks/game-over.mp3');
  gameVictory = new Audio('/audio/tanks/victory.mp3');
  fire = new Audio('/audio/tanks/fire.mp3');
  for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
    enemyFire.push(new Audio('/audio/tanks/fire.mp3'));
  }
  hitEnemy = new Audio('/audio/tanks/hit-enemy.mp3');
}

interface IWorld {
  isWin: number;
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Enemy[];
  bullets: Bullet[];
  base: Base;
  respawn: boolean[];
  respawnEnemySprite: RespawnSprite[];
  respawnSprite: RespawnSprite;
  interval: NodeJS.Timer[];
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
  isWin: number;
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  currentLevel: number;
  land: Land;
  playerTank_1: Tank;
  playerTank_2: Tank;
  enemyTanks: Enemy[];
  bullets: Bullet[];
  base: Base;
  respawn: boolean[];
  respawnEnemySprite: RespawnSprite[];
  respawnSprite: RespawnSprite;
  interval: NodeJS.Timer[];
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
    this.enemyTanks = [];
    this.interface = new Interface();
    this.bullets = [];
    this.base = new Base(this.land.curLevel);
    this.activeKeys = new Set();
    this.respawn = [];
    this.interval = [];
    this.respawnEnemySprite = [];
    this.respawnSprite = new RespawnSprite(
      this.land.curLevel,
      this.playerTank_1.x,
      this.playerTank_1.y,
    );

    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      this.enemyTanks.push(new Enemy(this.land.curLevel, i, i + 1));
      this.respawnEnemySprite.push(
        new RespawnSprite(this.land.curLevel, this.enemyTanks[i].x, this.enemyTanks[i].y),
      );
    }
    this.isWin = this.enemyTanks.length * 2;

    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      const interval = setInterval(() => {
        enemyFire[i].play();
        this.enemyFire(this.enemyTanks[i]);
      }, 1500);
      this.interval[i] = interval;
      this.respawn[i] = false;
    }
  }

  render() {
    if (this.base.health === 0 || this.playerTank_1.lives === 0) {
      this.setGameOver();
    }

    if (this.isWin <= 0) {
      this.setGameWin();
    }

    const { clear: clSprite, draw: drSprite } = this.respawnSprite.render(this.img);
    if (!this.playerTank_1.isDead) {
      const { clear: clPlayerTank1, draw: drPlayerTank1 } = this.playerTank_1.prepareRenderTank(
        this.activeKeys,
        this.img,
      );
      this.ctx.clearRect(...clPlayerTank1);
      this.ctx.drawImage(...drPlayerTank1);
    } else {
      this.ctx.clearRect(...clSprite);
      this.ctx.drawImage(...drSprite);
    }

    if (this.bullets.length > 0) {
      for (const bullet of this.bullets) {
        const shouted = this.playerTank_1.calculateDeadZone(
          bullet.x,
          bullet.y,
          bullet.direction,
          bullet.tank.title,
        );

        if (shouted) {
          bullet.isExplose = true;
          this.playerTank_1.isDead = true;
          this.playerTank_1.lives -= 1;
          const { clear: clPlayerTank1 } = this.playerTank_1.prepareRenderTank(
            this.activeKeys,
            this.img,
          );
          this.ctx.clearRect(...clPlayerTank1);
          this.respawnSprite.vision = true;

          setTimeout(() => {
            this.playerTank_1.isDead = false;
            this.playerTank_1.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x + 6;
            this.playerTank_1.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y + 2;
            this.playerTank_1.direction = Direction.up;
            [this.playerTank_1.view] = [...playerPrimary.rank_3.up];
          }, 2000);
        }

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

    for (let i = 0; i < enemyCounter.LEVEL_1; i++) {
      if (!this.enemyTanks[i].isDead) {
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
              hitEnemy.play();
              this.enemyTanks[i].lives -= 1;
              this.isWin -= 1;
              this.playerTank_1.reloadWeapon();
              this.enemyTanks[i].enemyDestroyed();
              clearInterval(this.interval[i]);
              this.ctx.clearRect(...clEnemy);
              this.respawn[i] = true;
            }
          }
        }
      } else {
        this.respawnEnemySprite[i].vision = true;
        const { clear: clSprite, draw: drSprite } = this.respawnEnemySprite[i].render(this.img);

        if (this.enemyTanks[i].lives !== 0) {
          this.ctx.clearRect(...clSprite);
          this.ctx.drawImage(...drSprite);

          setTimeout(() => {
            if (this.respawn[i]) {
              this.enemyTanks[i].isDead = false;
              this.enemyTanks[i].x = ENEMY_DEFAULT_SPAWN_POSITIONS[i].x + 2;
              this.enemyTanks[i].y = ENEMY_DEFAULT_SPAWN_POSITIONS[i].y;
              [this.enemyTanks[i].view] = [...enemy.a.down];
              const interval = setInterval(() => {
                enemyFire[i].play();
                this.enemyFire(this.enemyTanks[i]);
              }, 1500);
              this.interval[i] = interval;
              this.enemyTanks[i].direction = Direction.down;
              this.respawn[i] = false;
              this.respawnEnemySprite[i].vision = false;
              this.ctx.clearRect(...clSprite);
            }
          }, 2000);
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

  setGameWin() {
    gameVictory.play();
    setTimeout(() => {
      store.dispatch(
        tanksGameCountScoresAction([enemyCounter.LEVEL_1 * 2, 3 - this.playerTank_1.lives]),
      );
      store.dispatch(tanksGameVictoryAction());
    }, 500);
  }

  setGameOver() {
    gameOver.play();
    setTimeout(() => {
      store.dispatch(tanksGameOverAction(true));
    }, 500);
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
      fire.play();
      this.bullets.push(new Bullet(tank, this.land.curLevel));
      tank.fire();
    }
  }
}

export default World;
