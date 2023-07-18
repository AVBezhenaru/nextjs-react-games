import { loadMarioSprites } from './spriteSheets/LoadSprites';
import Entity from './Entity';
import Jump from './traits/Jump';
import Go from './traits/Go';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    function routeFrame(mario) {
      if (mario.go.distance > 0) {
        return mario.go.distance;
      }

      return mario;
    }

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, 0, 0);
    };

    return mario;
  });
