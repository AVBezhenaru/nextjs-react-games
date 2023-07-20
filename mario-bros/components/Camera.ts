import Vec2 from './Vec2';

export default class Camera {
  pos: Vec2;

  private size: Vec2;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(800, 650);
  }
}
