import {
  BULLET_EXPLOSION_WIDTH,
  BULLET_EXPLOSION_HEIGHT,
  BULLET_EXPLOSION_SPEED,
  BULLET_EXPLOSION_SPRITES,
} from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Explosion } from './explosion';

export class BulletExplosion extends Explosion {
  speed: number;

  constructor(args: IArgs) {
    super(args);

    this.width = BULLET_EXPLOSION_WIDTH;
    this.height = BULLET_EXPLOSION_HEIGHT;
    this.speed = BULLET_EXPLOSION_SPEED;
    this.sprites = BULLET_EXPLOSION_SPRITES;
  }
}
