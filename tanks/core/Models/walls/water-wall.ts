import { WATER_WALL_SPRITES } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Wall } from './wall';

export class WaterWall extends Wall {
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.sprites = WATER_WALL_SPRITES;
    this.type = 'Water-wall';
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
