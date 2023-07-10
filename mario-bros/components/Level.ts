import Compositor from './Compositor';
import { Matrix } from './Vec2';
import TileCollider from "./TileCollider";

export default class Level {
  private gravity: any;

  constructor() {
    this.gravity = 2000;
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });
  }
}
