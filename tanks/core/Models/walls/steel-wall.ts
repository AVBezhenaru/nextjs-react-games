/* eslint-disable lines-between-class-members */
import { STEEL_WALL_SPRITES } from '../../../constants';
import { IArgs } from '../../../interfaces';

import { Wall } from './Wall';

export class SteelWall extends Wall {
  type: string;
  hitMusic: HTMLAudioElement;

  constructor(args: IArgs) {
    super(args);

    this.sprites = STEEL_WALL_SPRITES;
    this.type = 'Steel-wall';
    this.hitMusic = new Audio('/audio/tanks/hit-steel.mp3');
  }

  hit() {
    this.hitMusic.play();
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }
}
