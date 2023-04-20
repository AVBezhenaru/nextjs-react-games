/* eslint-disable lines-between-class-members */
import { TILE_SIZE } from '../../../constants';
import { GameObject } from '../game-object';

export class Wall extends GameObject {
  spriteIndex: number;
  damage: number;

  constructor({ ...rest }) {
    super(rest);

    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.spriteIndex = 0;
    this.damage = 0;
  }

  get sprite() {
    return this.sprites[this.spriteIndex];
  }
}
