import {
  TANK_EXPLOSION_WIDTH,
  TANK_EXPLOSION_HEIGHT,
  TANK_EXPLOSION_SPEED,
  TANK_EXPLOSION_SPRITES,
} from '../../../constants';
import { IArgs } from '../../../interfaces';
import { Explosion } from '../Bullets/Explosion';

export class TankExplosion extends Explosion {
  speed: number;

  constructor(args: IArgs) {
    super(args);

    this.width = TANK_EXPLOSION_WIDTH;
    this.height = TANK_EXPLOSION_HEIGHT;
    this.speed = TANK_EXPLOSION_SPEED;
    this.sprites = TANK_EXPLOSION_SPRITES;
  }
}
