import { Trait } from '../Entity';

export default class Velocity extends Trait {
  constructor() {
    super('velocity');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update(entity: any, deltaTime: number) {
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
