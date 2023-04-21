import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './Bonus';

export class Shovel extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'shovel';
    this.sprites = BONUS;
    this.spriteBonus = 2;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
