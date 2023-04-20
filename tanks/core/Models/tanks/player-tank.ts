/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-destructuring */

import { store } from '../../../../store';
import {
  Keys,
  Direction,
  PLAYER1_TANK_POSITION,
  PLAYER1_TANK_SPRITES,
  TANK_SPEED,
  BULLET_SPEED,
} from '../../../constants';
import { IArgs } from '../../../interfaces';
import { Input } from '../../World/input';
import { Stage } from '../../World/stage';
import { getDirectionForKeys, getAxisForDirection, getValueForDirection } from '../../utils';
import { Sheild } from '../sheild';

import { Tank } from './tank';

export class PlayerTank extends Tank {
  type: string;
  levelTank: number;
  sheild: Sheild;
  isSheild: boolean;

  constructor(args?: IArgs) {
    super(args);

    this.type = 'playerTank';
    this.x = PLAYER1_TANK_POSITION[0];
    this.y = PLAYER1_TANK_POSITION[1];
    this.direction = Direction.UP;
    this.speed = TANK_SPEED;
    this.levelTank = store.getState().tanks.levelTank;
    this.sprites = PLAYER1_TANK_SPRITES[this.levelTank];
    this.isSheild = false;
    this.sheild = null;
  }

  update({ input, frameDelta, world }: { input: Input; frameDelta: number; world: Stage }) {
    if (this.isSheild && !this.sheild) {
      this.sheild = new Sheild({ x: this.x, y: this.y });
      this.emit('sheild', this.sheild);
    } else if (!this.isSheild) {
      this.emit('sheildOff', this.sheild);
      this.sheild = null;
    }
    if (this.isSheild) {
      this.sheild.x = this.x;
      this.sheild.y = this.y;
    }

    this.levelTank = store.getState().tanks.levelTank;
    this.sprites = PLAYER1_TANK_SPRITES[this.levelTank];
    if (this.levelTank >= 1) {
      this.bulletSpeed = BULLET_SPEED + 1;
    }
    if (this.levelTank >= 2) {
      this.bulletSpeed = BULLET_SPEED + 1.5;
      this.speed = TANK_SPEED + 1;
    }
    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys);
      const axis = getAxisForDirection(direction);
      const value = getValueForDirection(direction);

      this.turn(direction);
      this.move(axis, value);
      this.animate(frameDelta);

      const isOutOfBounds = world.isOutOfBounds(this);
      const hasCollision = world.hasCollision(this);

      if (isOutOfBounds || hasCollision) {
        this.move(axis, -value);
      }
    }

    if (input.keys.has(Keys.SPACE)) {
      this.fire();
    }
  }
}
