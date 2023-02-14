/* eslint-disable lines-between-class-members */
import { playerPrimary } from '../tileMap';
import { switchFrame } from '../utils/switchFrame';
import { FIELD_SIZE } from '../../config';
import { PLAYER_DEFAULT_SPAWN_POSITIONS } from '../../config';

export enum ControlKey {
  up = 'ArrowUp',
  down = 'ArrowDown',
  left = 'ArrowLeft',
  right = 'ArrowRight',
  space = 'Space',
}

export enum Rank {
  LEVEL1 = 'rank_1',
  LEVEL2 = 'rank_2',
  LEVEL3 = 'rank_3',
  LEVEL4 = 'rank_4',
}

enum Type {
  PLAYER1 = 'playerPrimary',
  PLAYER2 = 'playerSecondary',
  ENEMY = 'enemy',
}

interface ITank {
  x: number;
  y: number;
  direction: ControlKey;
  speed: number;
  rank: Rank;
  type: Type;
}

export class Tank implements ITank {
  x: number;
  y: number;
  view: number[];
  direction: ControlKey;
  speed: number;
  rank: Rank;
  frames: number[][];
  type: Type;
  tank_size: number[];

  constructor() {
    this.x = PLAYER_DEFAULT_SPAWN_POSITIONS[0].x;
    this.y = PLAYER_DEFAULT_SPAWN_POSITIONS[0].y;
    [this.view] = [...playerPrimary.rank_1.up];
    this.direction = ControlKey.up;
    this.speed = 3;
    this.rank = Rank.LEVEL1;
    this.type = Type.PLAYER1;
    this.frames = playerPrimary.rank_1.up;
    this.tank_size = [this.view[2], this.view[3]];
  }

  moveTank(key: Set<unknown>) {
    switch (true) {
      case key.has(ControlKey.up):
        if (this.y > 0) {
          this.y -= this.speed;
          this.view = switchFrame(playerPrimary[this.rank].up, this.view);
        }
        break;
      case key.has(ControlKey.right):
        if (this.x < FIELD_SIZE - this.tank_size[0]) {
          this.x += this.speed;
          this.view = switchFrame(playerPrimary[this.rank].right, this.view);
        }
        break;
      case key.has(ControlKey.down):
        if (this.y < FIELD_SIZE - this.tank_size[1]) {
          this.y += this.speed;
          this.view = switchFrame(playerPrimary[this.rank].down, this.view);
        }
        break;
      case key.has(ControlKey.left):
        if (this.x > 0) {
          this.x -= this.speed;
          this.view = switchFrame(playerPrimary[this.rank].left, this.view);
        }
        break;
    }
  }
}

