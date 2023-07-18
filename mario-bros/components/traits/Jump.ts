import { Trait } from '../Entity';

export default class Jump extends Trait {
  private readonly duration: number;

  private engageTime: number;

  private readonly velocity: number;

  constructor() {
    super('jump');

    this.duration = 0.5;
    this.engageTime = 0;

    this.velocity = 200;
  }

  start() {
    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
  }

  update(entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity;
      this.engageTime -= deltaTime;
    }
  }
}
