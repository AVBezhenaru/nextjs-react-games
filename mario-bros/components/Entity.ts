import Vec2 from './Vec2';

export class Trait {
  private NAME: string;

  constructor(name: string) {
    this.NAME = name;
  }

  update() {
    console.warn('Unhandled update call in Trait');
  }
}

export default class Entity {
  pos: Vec2;

  size: Vec2;

  private vel: Vec2;

  private traits: number[];

  draw: (ctx: any) => void;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);

    this.traits = [];
  }

  addTrait(trait: any) {
    this.traits.push(trait);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // idk how to fix it (ts)
    this[trait.NAME] = trait;
  }

  update(deltaTime: number) {
    this.traits.forEach((trait: any) => {
      trait.update(this, deltaTime);
    });
  }
}
