/* eslint-disable lines-between-class-members */
import { SHEILD, UNIT_SIZE } from '../../constants';
import { IArgs } from '../../interfaces';

import { GameObject } from './game-object';

export class Sheild extends GameObject {
  spriteBonus: number;
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.type = 'sheild';
    this.sprites = SHEILD;
    this.width = UNIT_SIZE;
    this.height = UNIT_SIZE;
    this.spriteBonus = 0;
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }

  get sprite() {
    return this.sprites[this.spriteBonus + this.animationFrame];
  }

  animate(frameDelta: number) {
    this.frames += frameDelta;

    if (this.frames > 250) {
      // eslint-disable-next-line no-bitwise
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  update({ frameDelta }: { frameDelta: number }) {
    this.animate(frameDelta);
  }
}
