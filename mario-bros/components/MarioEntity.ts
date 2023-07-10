import Entity from './Entity';
import { loadMarioSprites } from './spriteSheets/LoadSprites';
import Velocity from './traits/Velocity';
import Jump from './traits/Jump';
import Go from './traits/Go';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, this.pos.x, this.pos.y);
    };

    return mario;
  });
