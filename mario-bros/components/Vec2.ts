export class Matrix {
  private readonly grid: any[];

  constructor() {
    this.grid = [];
  }

  forEach(callback: any) {
    this.grid.forEach((column, x) => {
      column.forEach((value: number, y: number) => {
        callback(value, x, y);
      });
    });
  }

  get(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x: number, y: number, value: number) {
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
