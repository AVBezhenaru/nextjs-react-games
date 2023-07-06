// const matrix = new Matrix();
//
// matrix.set(5, 4, {name: 'ground'});
// const tile = matrix.get(mario.pos.x * MARIO_TILES_SIZE, mario.pos.y * MARIO_TILES_SIZE);
//
// if (tile === 'ground') {
//   moveMario();
// }

export class Matrix {
  public grid: any[];

  constructor() {
    this.grid = [];
  }

  forEach(callback) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  get(x, y) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }
}
export default class Vec2 {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
