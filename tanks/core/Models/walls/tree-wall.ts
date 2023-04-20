import { TREE_WALL_SPRITES } from '../../../constants';
import { IArgs } from '../../../interfaces';

import Wall from './wall';

export default class TreeWall extends Wall {
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.sprites = TREE_WALL_SPRITES;
    this.type = 'Tree-wall';
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
