/* eslint-disable no-bitwise */
/* eslint-disable lines-between-class-members */
import { Direction, BRICK_WALL_SPRITES, BRICK_WALL_SPRITE_MAP } from '../../../constants';
import { IArgs } from '../../../interfaces';
import Stage from '../../World/stage';
import Bullet from '../bullets/bullet';

import Wall from './wall';

export default class BrickWall extends Wall {
  state: number;
  lastHitDirection: number;
  hitMusic: HTMLAudioElement;

  constructor(args: IArgs) {
    super(args);

    this.sprites = BRICK_WALL_SPRITES;
    this.state = 0b0000;
    this.isDestructable = true;
    this.isDestroyed = false;
    this.lastHitDirection = -1;
    this.type = 'Brick-wall';
    this.hitMusic = new Audio('/audio/tanks/hit-brick.mp3');
  }

  get sprite() {
    return this.sprites[BRICK_WALL_SPRITE_MAP[this.state]];
  }

  update({ world }: { world: Stage }) {
    if (this.isDestroyed) {
      world.objects.delete(this);
    }
  }

  hit(bullet: Bullet) {
    this.hitMusic.play();
    if (this.isDestroyed) return;
    this.damage += 1;

    if (this.damage === 2) {
      this.isDestroyed = true;
    }

    switch (bullet.direction) {
      case Direction.UP:
        this.state |= 0b1000;
        break;
      case Direction.RIGHT:
        this.state |= 0b0001;
        break;
      case Direction.DOWN:
        this.state |= 0b0010;
        break;
      case Direction.LEFT:
        this.state |= 0b0100;
        break;
    }
  }
}
