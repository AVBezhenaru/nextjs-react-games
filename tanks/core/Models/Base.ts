/* eslint-disable prefer-destructuring */
import { BASE_POSITION, BASE_WIDTH, BASE_HEIGHT, BASE_SPRITES } from '../../constants';
import { IArgs } from '../../interfaces';

import { GameObject } from './Game-object';

export class Base extends GameObject {
  constructor(args?: IArgs) {
    super(args);

    this.x = BASE_POSITION[0];
    this.y = BASE_POSITION[1];
    this.width = BASE_WIDTH;
    this.height = BASE_HEIGHT;
    this.sprites = BASE_SPRITES;
    this.isDestroyed = false;
  }

  get sprite() {
    return this.sprites[Number(this.isDestroyed)];
  }

  hit() {
    this.emit('destroyed', this);
  }
}
