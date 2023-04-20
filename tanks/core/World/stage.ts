/* eslint-disable lines-between-class-members */
import { STAGE_SIZE, TILE_SIZE, TerrainType, UNIT_SIZE } from '../../constants';
import { store } from '../../../store';
import {
  tankPlayer1LiveAction,
  tanksGameCountKill,
  tanksGameCountPoints,
  tanksLevel,
} from '../../reducers/tanksGameAction';
import { EventManager } from '../../observer/Observer';
import { Base } from '../Models/Base';
import { BrickWall } from '../Models/Walls/Brick-wall';
import { SteelWall } from '../Models/Walls/Steel-wall';
import { PlayerTank } from '../Models/Tanks/Player-tank';
import { EnemyTank } from '../Models/Tanks/Enemy-tank';
import { TreeWall } from '../Models/Walls/Tree-wall';
import { WaterWall } from '../Models/Walls/Water-wall';
import { Shovel } from '../Models/bonus/Shovel';
import { Clock } from '../Models/bonus/Clock';
import { Grenade } from '../Models/bonus/Grenade';
import { Live } from '../Models/bonus/Live';
import { Star } from '../Models/bonus/Star';
import { Respawn } from '../Models/Tanks/Respawn';
import { Gun } from '../Models/bonus/Gun';
import { Helmet } from '../Models/bonus/Helmet';
import { IArgs, IDataMap } from '../../interfaces';
import { Sheild } from '../Models/Sheild';
import { Explosion } from '../Models/Bullets/Explosion';
import { Bullet } from '../Models/Bullets/Bullet';

import { Input } from './Input';

export class Stage extends EventManager {
  base: Base;
  playerTank: PlayerTank;
  enemyTanks: EnemyTank[];
  terrain: any;
  enemyTankCount: number;
  enemyTankTimer: number;
  enemyTankPositionIndex: number;
  objects: any;
  gameOver: HTMLAudioElement;
  liveMusic: HTMLAudioElement;
  powerUp: HTMLAudioElement;
  bonusCount: number;

  static createObject(type: number, args: IArgs) {
    switch (type) {
      case TerrainType.BRICK_WALL:
        return new BrickWall(args);
      case TerrainType.STEEL_WALL:
        return new SteelWall(args);
      case TerrainType.TREE:
        return new TreeWall(args);
      case TerrainType.WATER:
        return new WaterWall(args);
    }
  }

  static createTerrain(map: number[][]) {
    const objects = [];

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map.length; j++) {
        const value = map[j][i];

        if (value) {
          const object = Stage.createObject(value, {
            x: i * TILE_SIZE,
            y: j * TILE_SIZE,
          });

          objects.push(object);
        }
      }
    }

    return objects;
  }

  static createEnemies(types: number[]) {
    return types.map((type: number) => new EnemyTank({ type }));
  }

  constructor(data: IDataMap) {
    super();

    this.base = new Base();
    this.playerTank = new PlayerTank();
    this.enemyTanks = Stage.createEnemies(data.enemies);
    this.terrain = Stage.createTerrain(data.map[store.getState().tanks.stage]);
    this.enemyTankCount = 0;
    this.enemyTankTimer = 0;
    this.enemyTankPositionIndex = 0;
    this.objects = new Set([this.base, this.playerTank, ...this.terrain]);
    this.gameOver = new Audio('/audio/tanks/game-over.mp3');
    this.liveMusic = new Audio('/audio/tanks/life.mp3');
    this.powerUp = new Audio('/audio/tanks/powerup-pickup.mp3');
    this.bonusCount = 0;
    this.init();
  }

  init() {
    this.base.on('destroyed', () => {
      this.emit('gameOver');
      this.gameOver.play();
    });

    this.playerTank.on('fire', (bullet: Bullet) => {
      this.objects.add(bullet);

      bullet.on('explode', (explosion: Explosion) => {
        this.objects.add(explosion);

        explosion.on('destroyed', () => {
          this.objects.delete(explosion);
        });
      });

      bullet.on('destroyed', () => {
        this.objects.delete(bullet);
      });
    });

    this.playerTank.on('sheild', (sheild: Sheild) => {
      this.objects.add(sheild);
    });

    this.playerTank.on('sheildOff', (sheild: Sheild) => {
      this.objects.delete(sheild);
    });

    this.playerTank.on('destroyed', (tank: PlayerTank) => {
      if (this.playerTank.isSheild) {
        console.log('sheild');
      } else if (store.getState().tanks.levelTank > 2) {
        store.dispatch(tanksLevel(0));
      } else {
        store.dispatch(tankPlayer1LiveAction(false));
        store.dispatch(tanksLevel(2));
        if (store.getState().tanks.player1Live !== 0) {
          this.playerTank.x = 4 * UNIT_SIZE;
          this.playerTank.y = 12 * UNIT_SIZE;
        } else {
          this.objects.delete(tank);
          this.emit('gameOver');
          this.gameOver.play();
        }
      }
    });

    // eslint-disable-next-line array-callback-return
    this.enemyTanks.map((enemyTank: EnemyTank) => {
      enemyTank.on('fire', (bullet: Bullet) => {
        this.objects.add(bullet);

        bullet.on('explode', (explosion: Explosion) => {
          this.objects.add(explosion);

          explosion.on('destroyed', () => {
            this.objects.delete(explosion);
          });
        });

        bullet.on('destroyed', () => {
          this.objects.delete(bullet);
        });
      });

      enemyTank.on('explode', (explosion: Explosion) => {
        this.objects.add(explosion);

        explosion.on('destroyed', () => {
          this.objects.delete(explosion);
        });
      });

      enemyTank.on('destroyed', () => {
        this.removeEnemyTank(enemyTank);
        store.dispatch(tanksGameCountKill(true));
        store.dispatch(tanksGameCountPoints(200));
      });
    });
  }

  get width() {
    return STAGE_SIZE;
  }

  get height() {
    return STAGE_SIZE;
  }

  get top() {
    return 0;
  }

  get right() {
    return this.width;
  }

  get bottom() {
    return this.height;
  }

  get left() {
    return 0;
  }

  update(input: Input, frameDelta: number) {
    const state = {
      input,
      frameDelta,
      world: this,
    };

    if (this.shouldAddEnemyTank(frameDelta)) {
      this.addEnemyTank();
    }

    if (this.enemyTankCount === 0) {
      this.emit('gameVictory');
      this.enemyTankCount = 1;
    }

    this.objects.forEach((object: any) => object.update(state));
  }

  isOutOfBounds(object: any) {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    );
  }

  hasCollision(object: any) {
    const collision = this.getCollision(object);

    return Boolean(collision);
  }

  getCollision(object: any) {
    const collisionObjects = this.getCollisionObjects(object);

    if (collisionObjects.size > 0) {
      return { objects: collisionObjects };
    }
  }

  getCollisionObjects(object: any) {
    const objects = new Set();
    for (const other of this.objects) {
      if (
        other !== object &&
        this.haveCollision(object, other) &&
        other.type !== 'explosion' &&
        other.type !== 'Tree-wall' &&
        !(object.type === 'bullet' && other.type === 'Water-wall') &&
        !((object.type === 'enemyTank' || object.type === 'bullet') && other.type === 'bonus') &&
        !(
          object.type === 'bullet' &&
          object.tank.type === 'enemyTank' &&
          (other.type === 'enemyTank' ||
            (other.type === 'bullet' && other.tank.type === 'enemyTank'))
        ) &&
        !(other.type === 'respawn' && (object.type === 'bullet' || object.type === 'explosion')) &&
        !(
          (object.type === 'playerTank' ||
            (object.type === 'bullet' && object.tank.type === 'playerTank')) &&
          other.type === 'sheild'
        )
      ) {
        objects.add(other);
      }
      if (
        other !== object &&
        this.haveCollision(object, other) &&
        object.type === 'playerTank' &&
        other.type === 'bonus'
      ) {
        switch (other.typeUniq) {
          case 'shovel':
            // eslint-disable-next-line no-case-declarations
            const baseSteel: object[] = [];
            baseSteel[0] = new SteelWall({ x: 352, y: 736 });
            baseSteel[1] = new SteelWall({ x: 384, y: 736 });
            baseSteel[2] = new SteelWall({ x: 416, y: 736 });
            baseSteel[3] = new SteelWall({ x: 448, y: 736 });
            baseSteel[4] = new SteelWall({ x: 352, y: 768 });
            baseSteel[5] = new SteelWall({ x: 352, y: 800 });
            baseSteel[6] = new SteelWall({ x: 448, y: 768 });
            baseSteel[7] = new SteelWall({ x: 448, y: 800 });
            for (const el of baseSteel) {
              this.objects.add(el);
            }
            setTimeout(() => {
              for (const el of baseSteel) {
                this.objects.delete(el);
              }
            }, 8000);
            break;
          case 'clock':
            for (const enemy of this.objects) {
              if (enemy.type === 'enemyTank') {
                enemy.speed = 0;
                enemy.fireStop = true;
                setTimeout(() => {
                  enemy.speed = 1;
                  enemy.fireStop = false;
                }, 8000);
              }
            }
            break;
          case 'grenade':
            for (const enemy of this.objects) {
              if (enemy.type === 'enemyTank') {
                enemy.isDestroyed = true;
              }
            }
            break;
          case 'live':
            store.dispatch(tankPlayer1LiveAction(true));
            this.liveMusic.play();
            break;
          case 'star':
            store.dispatch(tanksLevel(1));
            this.powerUp.play();
            break;
          case 'gun':
            store.dispatch(tanksLevel(3));
            this.powerUp.play();
            break;
          case 'helmet':
            object.isSheild = true;
            setTimeout(() => {
              object.isSheild = false;
            }, 8000);
        }
        this.objects.delete(other);
        store.dispatch(tanksGameCountPoints(150));
      }
    }

    return objects;
  }

  haveCollision(a: any, b: any) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  shouldAddEnemyTank(frameDelta: number) {
    this.enemyTankTimer += frameDelta;

    return this.enemyTankTimer > 1000 && this.enemyTankCount < 4;
  }

  // removeWall() {}

  addEnemyTank() {
    const tank = this.enemyTanks.shift();

    if (tank) {
      tank.setPosition(this.enemyTankPositionIndex);

      for (let i = 0; i < 3; i++) {
        const collision = this.hasCollision(tank);

        if (collision) {
          this.enemyTankTimer = 0;
          this.enemyTankPositionIndex = (this.enemyTankPositionIndex + 1) % 3;
          tank.setPosition(this.enemyTankPositionIndex);
        } else {
          break;
        }
      }

      const position = {
        x: tank.x,
        y: tank.y,
      };

      const spawn = new Respawn(position);

      this.enemyTankCount += 1;
      this.enemyTankTimer = 0;
      this.enemyTankPositionIndex = (this.enemyTankPositionIndex + 1) % 3;

      this.objects.add(spawn);
      setTimeout(() => {
        this.objects.delete(spawn);
        this.objects = Array.from(this.objects);
        this.objects.unshift(tank);
        this.objects = new Set(this.objects);
      }, 1500);
    }
  }

  removeEnemyTank(enemyTank: EnemyTank) {
    this.objects.delete(enemyTank);
    this.enemyTankCount -= 1;
    if (this.bonusCount < 2) this.bonusCount++;
    else {
      this.bonusCount = 0;
      const arrayBonus = [Shovel, Clock, Grenade, Live, Gun, Star, Helmet];
      const randomBonusNumber = Math.floor(Math.random() * 7);
      const bonusX = Math.floor(Math.random() * 13) * UNIT_SIZE;
      const bonusY = Math.floor(Math.random() * 13) * UNIT_SIZE;
      this.objects.add(
        new arrayBonus[randomBonusNumber]({
          x: bonusX,
          y: bonusY,
        }),
      );
    }
  }
}
