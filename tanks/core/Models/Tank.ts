/* eslint-disable lines-between-class-members */
import { playerPrimary } from '../tileMap';

export enum Direction {
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
  direction: Direction;
  speed: number;
  rank: Rank;
  type: Type;
}

export class Tank implements ITank {
  x: number;
  y: number;
  view: number[];
  direction: Direction;
  speed: number;
  rank: Rank;
  frames: number[][];
  type: Type;

  constructor() {
    this.x = 10;
    this.y = 10;
    [this.view] = [...playerPrimary.rank_1.ArrowUp];
    this.direction = Direction.up;
    this.speed = 3.5;
    this.rank = Rank.LEVEL1;
    this.type = Type.PLAYER1;
    this.frames = playerPrimary.rank_1.ArrowUp;
  }
}
