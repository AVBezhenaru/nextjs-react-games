/* eslint-disable lines-between-class-members */

import { View } from './View';
import { Game } from './Game';
import { Input } from './Input';

export class World {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;
    this.init();
  }

  init() {
    const game = new Game({
      input: new Input(),
      view: new View(this.ctx, this.img),
    });

    game.start();
  }
}
