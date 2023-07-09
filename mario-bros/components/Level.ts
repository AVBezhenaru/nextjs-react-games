import Compositor from './Compositor';
import { Matrix } from './Vec2';
import TileCollider from "./TileCollider";

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();

    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      this.tileCollider.test(entity);
    });
  }
}
