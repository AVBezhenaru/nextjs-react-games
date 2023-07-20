export default class SpriteSheets {
  private image: any;

  private width: any;

  private height: any;

  private tiles: any;

  constructor(image: any, width: any, height: any) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name: any, x: any, y: any, width: any, height: any) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d').drawImage(this.image, x, y, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);
  }

  defineTile(name: any, x: any, y: any) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name: any, ctx: any, x: any, y: any) {
    const buffer = this.tiles.get(name);
    ctx.drawImage(buffer, x, y);
  }

  drawTile(name: any, ctx: any, x: any, y: any) {
    this.draw(name, ctx, x * this.width, y * this.height);
  }
}
