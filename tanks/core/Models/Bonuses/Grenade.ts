import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './Bonus';

export class Grenade extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'grenade';
    this.sprites = BONUS;
    this.spriteBonus = 4;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
