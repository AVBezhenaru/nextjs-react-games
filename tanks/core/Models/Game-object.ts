/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable lines-between-class-members */
import { IArgs } from '../../interfaces';
import { EventManager } from '../../observer/Observer';
import { Stage } from '../World/Stage';

export class GameObject extends EventManager {
  _x: number;
  _y: number;
  _width: number;
  _height: number;
  sprites: number[][];
  animationFrame: number;
  animationSpeed: number;
  frames: number;
  isDestructable: boolean;
  isDestroyed: boolean;
  speed?: number;
  // eslint-disable-next-line no-undef
  [axis: string]: any;

  constructor({ x, y, width, height, sprites }: IArgs = {}) {
    super();

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.sprites = sprites;
    this.animationFrame = 0;
    this.animationSpeed = 0;
    this.frames = 0;
    this.isDestructable = false;
    this.isDestroyed = false;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get top() {
    return this.y;
  }

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }

  move(axis: string, value: number) {
    this[axis] += value * this.speed;
  }

  update({}: {
    input?: { keys: Set<string>; drive: HTMLAudioElement };
    frameDelta?: number;
    world?: Stage;
  } = {}): void {}

  stop() {
    this.speed = 0;
  }
}
