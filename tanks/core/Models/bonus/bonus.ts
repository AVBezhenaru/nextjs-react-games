/* eslint-disable lines-between-class-members */
import { UNIT_SIZE } from '../../../constants';
import { IArgs } from '../../../interfaces';
import GameObject from '../game-object';

export default class Bonus extends GameObject {
  spriteBonus: number;
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.type = 'bonus';
    this.width = UNIT_SIZE;
    this.height = UNIT_SIZE;
    this.spriteBonus = 0;
  }

  get sprite() {
    return this.sprites[this.spriteBonus];
  }
}
