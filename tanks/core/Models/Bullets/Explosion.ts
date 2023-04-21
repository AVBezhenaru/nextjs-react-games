import { IArgs } from '../../../interfaces';
import { GameObject } from '../Game-object';

export class Explosion extends GameObject {
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.type = 'explosion';
  }

  get sprite() {
    return this.sprites[this.animationFrame];
  }

  get isExploding() {
    return this.animationFrame < this.sprites.length;
  }

  update({ frameDelta }: { frameDelta: number }) {
    if (this.isExploding) {
      this.animate(frameDelta);
    } else {
      this.destroy();
    }
  }

  animate(frameDelta: number) {
    this.frames += frameDelta;

    if (this.frames > 50) {
      this.animationFrame = ((this.animationFrame + 1) % this.sprites.length) + 1;
      this.frames = 0;
    }
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    return;
  }

  destroy() {
    this.emit('destroyed', this);
  }
}
