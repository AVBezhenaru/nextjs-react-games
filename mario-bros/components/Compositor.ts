export default class Compositor {
  public layer: any[];

  constructor() {
    this.layer = [];
  }

  draw(ctx: any) {
    this.layer.forEach(layer => {
      layer(ctx);
    });
  }
}
