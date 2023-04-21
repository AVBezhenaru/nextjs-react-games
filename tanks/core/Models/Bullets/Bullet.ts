/* eslint-disable @typescript-eslint/no-unused-vars */
import { BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPRITES, Direction } from '../../../constants';
import { Stage } from '../../World/Stage';
import { getAxisForDirection, getValueForDirection } from '../../utils';
import { GameObject } from '../Game-object';
import { Tank } from '../Tanks/Tank';

import { BulletExplosion } from './Bullet-explosion';

export class Bullet extends GameObject {
  constructor({
    tank,
    direction,
    speed,
    ...args
  }: {
    tank: Tank;
    direction: number;
    speed: number;
    x: number;
    y: number;
  }) {
    super(args);

    this.type = 'bullet';
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.sprites = BULLET_SPRITES;
    this.direction = direction;
    this.speed = speed;
    this.tank = tank;
    this.explosion = null;
  }

  get sprite() {
    return this.sprites[this.direction];
  }

  get isExploding() {
    return Boolean(this.explosion);
  }

  get isFromEnemyTank() {
    return this.tank?.type === 'enemyTank';
  }

  get isFromPlayerTank() {
    return this.tank?.type === 'playerTank';
  }

  update({ world }: { world: Stage }) {
    if (this.isExploding) return;

    const axis = getAxisForDirection(this.direction);
    const value = getValueForDirection(this.direction);

    this.move(axis, value);

    const isOutOfBounds = world.isOutOfBounds(this);
    const collision = world.getCollision(this);
    const shouldExplode = isOutOfBounds || (collision && this.collide(collision.objects));

    if (shouldExplode) {
      this.stop();
      this.explode();
    }
  }

  collide(objects: any) {
    let shouldExplode = false;

    for (const object of objects) {
      // eslint-disable-next-line no-continue
      if (object === this.tank || object === this.explosion) continue;

      object.hit(this);
      shouldExplode = true;
    }

    return shouldExplode;
  }

  hit() {
    this.stop();
    this.explode();
  }

  explode() {
    const [x, y] = this.getExplosionStartingPosition();

    this.explosion = new BulletExplosion({ x, y });
    this.explosion.on('destroyed', () => this.destroy());
    this.emit('explode', this.explosion);
  }

  destroy() {
    this.tank = null;
    this.explosion = null;
    this.emit('destroyed', this);
  }

  getExplosionStartingPosition() {
    switch (this.direction) {
      case Direction.UP:
        return [this.left - 20, this.top - 24];
      case Direction.RIGHT:
        return [this.right - 32, this.top - 24];
      case Direction.DOWN:
        return [this.left - 20, this.bottom - 32];
      case Direction.LEFT:
        return [this.left - 32, this.top - 24];
    }
  }
}
