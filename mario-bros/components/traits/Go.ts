import { Trait } from '../Entity';

export default class Go extends Trait {
  private readonly dir: number;

  private readonly acceleration: number;

  private readonly deceleration: number;

  private readonly dragFactor: number;

  private distance: number;

  private heading: number;

  constructor() {
    super('go');

    this.dir = 0;
    this.acceleration = 400;
    this.deceleration = 300;
    this.dragFactor = 1 / 5000;
    this.distance = 0;
    this.heading = 1;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update(entity: any, deltaTime: number) {
    const absX = Math.abs(entity.vel.x);

    if (this.dir) {
      entity.vel.x += this.acceleration * deltaTime * this.dir;
      this.heading = this.dir;
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * Math.abs(entity.vel.x);
    entity.vel.x -= drag;
    this.distance += absX * deltaTime;
  }
}
