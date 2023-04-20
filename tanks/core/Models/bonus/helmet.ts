import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './bonus';

export class Helmet extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'helmet';
    this.sprites = BONUS;
    this.spriteBonus = 0;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
