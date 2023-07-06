import Compositor from './Compositor';
import { Matrix } from './Vec2';

export default class Level {
  public entities: Set<any>;

  public comp: Compositor;

  public tiles: Matrix;

  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);
    });
  }
}
