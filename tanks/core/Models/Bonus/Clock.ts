import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Bonus } from './Bonus';

export class Clock extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'clock';
    this.sprites = BONUS;
    this.spriteBonus = 1;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
