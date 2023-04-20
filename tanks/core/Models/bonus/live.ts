import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './bonus';

export class Live extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'live';
    this.sprites = BONUS;
    this.spriteBonus = 5;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
