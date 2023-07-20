export default class TileResolver {
  private tileSize: number;

  private matrix: any;

  constructor(matrix: any, tileSize = 16) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1: number, pos2: number) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);
    return range;
  }

  getByIndex(indexX: number, indexY: number) {
    const tile = this.matrix.get(indexX, indexY);

    if (tile) {
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;

      return {
        tile,
        y1,
        y2,
        x1,
        x2,
      };
    }
  }

  searchByPosition(posX: number, posY: number) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  searchByRange(x1: number, x2: number, y1: number, y2: number) {
    const matches: any = [];
    this.toIndexRange(x1, x2).forEach((indexX: number) => {
      this.toIndexRange(y1, y2).forEach((indexY: number) => {
        const match = this.getByIndex(indexX, indexY);

        if (match) matches.push(match);
      });
    });

    return matches;
  }
}
