import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './Bonus';

export class Star extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'star';
    this.sprites = BONUS;
    this.spriteBonus = 3;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
