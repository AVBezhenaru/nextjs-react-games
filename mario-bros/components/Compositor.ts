export default class Compositor {
  public layers: any[];

  constructor() {
    this.layers = [];
  }

  draw(ctx: any) {
    this.layers.forEach((layer) => {
      layer(ctx);
    });
  }
}
