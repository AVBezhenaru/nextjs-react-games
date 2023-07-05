import Entity from './Entity';
import { loadMarioSprites } from './spriteSheets/LoadSprites';
import Velocity from './traits/Velocity';
import Jump from './traits/Jump';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, this.pos.x, this.pos.y);
    };

    return mario;
  });
