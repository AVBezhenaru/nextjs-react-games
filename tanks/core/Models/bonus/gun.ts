import { BONUS } from '../../../constants';
import { IArgs } from '../../../interfaces';

import Bonus from './bonus';

export default class Gun extends Bonus {
  typeUniq: string;

  constructor(args: IArgs) {
    super(args);

    this.typeUniq = 'gun';
    this.sprites = BONUS;
    this.spriteBonus = 6;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
