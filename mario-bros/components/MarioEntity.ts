import Entity from './Entity';
import { loadMarioSprites } from './spriteSheets/LoadSprites';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();

    mario.pos.set(64, 180);
    mario.vel.set(2, -10);

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, mario.pos.x, mario.pos.y);
    };

    mario.update = function updateMario(deltaTime: any) {
      mario.pos.x += mario.vel.x;
      mario.pos.y += mario.vel.y;
    };

    return mario;
  });
