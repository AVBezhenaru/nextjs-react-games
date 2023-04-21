/* eslint-disable lines-between-class-members */
import {
  Direction,
  TILE_SIZE,
  TANK_WIDTH,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_TURN_THRESHOLD,
} from '../../../constants';
import { GameObject } from '../Game-object';
import { Bullet } from '../Bullets/Bullet';
import { IArgs } from '../../../interfaces';
import { Explosion } from '../Bullets/Explosion';

import { TankExplosion } from './Tank-explosion';

export class Tank extends GameObject {
  speed: number;
  bulletSpeed: number;
  bullet: Bullet;
  direction: number;
  explosion: Explosion;
  fireStop: boolean;
  fireMusic: HTMLAudioElement;
  hitEnemy: HTMLAudioElement;

  constructor(args: IArgs) {
    super(args);

    this.width = TANK_WIDTH;
    this.height = TANK_HEIGHT;
    this.speed = TANK_SPEED;
    this.bulletSpeed = 2;
    this.bullet = null;
    this.explosion = null;
    this.fireStop = false;
    this.fireMusic = new Audio('/audio/tanks/fire.mp3');
    this.hitEnemy = new Audio('/audio/tanks/enemy-explosion.mp3');
  }

  get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame];
  }

  get isExploding() {
    return Boolean(this.explosion?.isExploding);
  }

  turn(direction: number) {
    const prevDirection = this.direction;

    this.direction = direction;

    if (direction === Direction.UP || direction === Direction.DOWN) {
      if (prevDirection === Direction.RIGHT) {
        const value = TILE_SIZE - (this.x % TILE_SIZE);

        if (value <= TANK_TURN_THRESHOLD) {
          this.x += value;
        }
      } else if (prevDirection === Direction.LEFT) {
        const value = this.x % TILE_SIZE;

        if (value <= TANK_TURN_THRESHOLD) {
          this.x -= value;
        }
      }
    } else if (prevDirection === Direction.UP) {
      const value = this.y % TILE_SIZE;

      if (value <= TANK_TURN_THRESHOLD) {
        this.y -= value;
      }
    } else if (prevDirection === Direction.DOWN) {
      const value = TILE_SIZE - (this.y % TILE_SIZE);

      if (value <= TANK_TURN_THRESHOLD) {
        this.y += value;
      }
    }
  }

  animate(frameDelta: number) {
    this.frames += frameDelta;

    if (this.frames > 20) {
      // eslint-disable-next-line no-bitwise
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  fire() {
    if (!this.bullet && !this.fireStop) {
      const [x, y] = this.getBulletStartingPosition();
      this.bullet = new Bullet({
        x,
        y,
        tank: this,
        direction: this.direction,
        speed: this.bulletSpeed,
      });

      if (this.type === 'playerTank') {
        this.fireMusic.play();
      }

      this.bullet.on('destroyed', () => {
        this.bullet = null;
        this.bulletCount--;
      });

      this.emit('fire', this.bullet);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hit(bullet?: unknown) {
    this.explode();
    this.destroy();
  }

  explode() {
    if (this.isExploding) return;

    const [x, y] = this.getExplosionStartingPosition();

    this.explosion = new TankExplosion({ x, y });
    this.emit('explode', this.explosion);
  }

  destroy() {
    this.isDestroyed = true;
    this.bullet = null;
    this.explosion = null;
    this.emit('destroyed', this);
    this.hitEnemy.play();
  }

  getBulletStartingPosition() {
    switch (this.direction) {
      case Direction.UP:
        return [this.left + 24, this.top - 8];
      case Direction.RIGHT:
        return [this.right - 16, this.top + 24];
      case Direction.DOWN:
        return [this.left + 20, this.bottom - 16];
      case Direction.LEFT:
        return [this.left, this.top + 24];
    }
  }

  getExplosionStartingPosition() {
    switch (this.direction) {
      case Direction.UP:
        return [this.left + 20, this.top];
      case Direction.RIGHT:
        return [this.right - 16, this.top + 24];
      case Direction.DOWN:
        return [this.left + 20, this.bottom - 16];
      case Direction.LEFT:
        return [this.left, this.top + 24];
    }
  }
}
