/* eslint-disable lines-between-class-members */

import { View } from './view';
import { Game } from './game';
import { Input } from './input';

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
