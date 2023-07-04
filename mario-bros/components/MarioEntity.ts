import Entity from './Entity';
import { loadMarioSprites } from './spriteSheets/LoadSprites';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, this.pos.x, this.pos.y);
    };

    mario.update = function updateMario(deltaTime) {
      mario.pos.x += mario.vel.x * deltaTime;
      mario.pos.y += mario.vel.y * deltaTime;
    };

    return mario;
  });
