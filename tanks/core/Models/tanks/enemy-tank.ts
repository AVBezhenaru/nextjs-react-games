/* eslint-disable prefer-destructuring */
/* eslint-disable lines-between-class-members */
import {
  Direction,
  ENEMY_TANK_START_POSITIONS,
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_SPEED,
  ENEMY_TANK_TURN_TIMER_THRESHOLD,
} from '../../../constants';
import { IEnemyArgs } from '../../../interfaces';
import { Stage } from '../../World/stage';
import { getAxisForDirection, getValueForDirection } from '../../utils';
import { Bullet } from '../bullets/bullet';

import { Tank } from './tank';

export class EnemyTank extends Tank {
  turnTimer: number;
  type: string;

  static createRandom() {
    const random = Math.floor(Math.random() * 3);
    const [x, y] = ENEMY_TANK_START_POSITIONS[random];
    const sprites = ENEMY_TANK_SPRITES[0];

    return new EnemyTank({ x, y, sprites });
  }

  constructor(args: IEnemyArgs) {
    super(args);

    this.type = 'enemyTank';
    this.direction = Direction.DOWN;
    this.x = 0;
    this.y = 0;
    this.speed = ENEMY_TANK_SPEED;
    this.sprites = ENEMY_TANK_SPRITES[0];
    this.turnTimer = 0;
  }

  setPosition(positionIndex: number) {
    this.x = ENEMY_TANK_START_POSITIONS[positionIndex][0];
    this.y = ENEMY_TANK_START_POSITIONS[positionIndex][1];
  }

  update({ world, frameDelta }: { world: Stage; frameDelta: number }) {
    if (this.isDestroyed) {
      this.explode();
      this.destroy();
    }

    const direction = this.direction;
    const axis = getAxisForDirection(direction);
    const value = getValueForDirection(direction);

    this.move(axis, value);
    this.fire();
    this.animate(frameDelta);

    const isOutOfBounds = world.isOutOfBounds(this);
    const hasCollision = world.hasCollision(this);

    if (isOutOfBounds || hasCollision) {
      this.move(axis, -value);

      if (this.shouldTurn(frameDelta)) {
        this.turnRandomly();
      }
    }
  }

  hit(bullet: Bullet) {
    if (bullet.isFromEnemyTank) return;
    super.hit();
  }

  shouldTurn(frameDelta: number) {
    this.turnTimer += frameDelta;

    return this.turnTimer > ENEMY_TANK_TURN_TIMER_THRESHOLD;
  }

  turnRandomly() {
    const randomDirection = Math.floor(Math.random() * 4);

    this.turnTimer = 0;
    this.turn(randomDirection);
  }
}
