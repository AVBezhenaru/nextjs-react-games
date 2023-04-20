/* eslint-disable prefer-destructuring */
/* eslint-disable lines-between-class-members */
import { ENEMY_TANK_START_POSITIONS, SPAWN, UNIT_SIZE } from '../../../constants';
import { IArgs } from '../../../interfaces';
import { GameObject } from '../game-object';

export class Respawn extends GameObject {
  spriteBonus: number;
  type: string;

  constructor(args: IArgs) {
    super(args);

    this.type = 'respawn';
    this.width = UNIT_SIZE;
    this.height = UNIT_SIZE;
    this.sprites = SPAWN;
    this.spriteBonus = 0;
  }

  get sprite() {
    return this.sprites[this.spriteBonus + this.animationFrame];
  }

  animate(frameDelta: number) {
    this.frames += frameDelta;

    if (this.frames > 250) {
      // eslint-disable-next-line no-bitwise
      this.animationFrame ^= 1;
      this.frames = 0;
    }
  }

  update({ frameDelta }: { frameDelta: number }) {
    this.animate(frameDelta);
  }

  hit() {
    // eslint-disable-next-line no-useless-return
    if (this.isDestroyed) return;
  }

  setPosition(positionIndex: number) {
    this.x = ENEMY_TANK_START_POSITIONS[positionIndex][0];
    this.y = ENEMY_TANK_START_POSITIONS[positionIndex][1];
  }
}
