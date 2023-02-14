// import { level_1 } from '../../assents/maps/01';
import { landTiles } from '../tileMap';

interface ILand {
  level: number;
  curLevel: number[][];
}

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 6, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 5, 0, 5, 0, 1, 0, 1, 0],
  [0, 5, 0, 5, 0, 3, 0, 3, 0, 5, 0, 5, 0],
  [3, 0, 3, 3, 0, 5, 0, 5, 0, 3, 3, 0, 3],
  [10, 0, 5, 5, 0, 3, 0, 3, 0, 5, 5, 0, 10],
  [0, 3, 0, 3, 0, 1, 1, 1, 0, 3, 0, 3, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 5, 0, 5, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0, 0],
];

export class Land implements ILand {
  level: number;

  curLevel: number[][];

  // renderMap: number[][];
  context: any;

  landTiles: any;

  constructor(level: number) {
    this.level = level;
    this.curLevel = map;
    this.landTiles = landTiles;
  }

  lavel: number;

  getRenderMap() {
    const context: number[][] = [];
    for (let i = 0; i < this.curLevel.length; i++) {
      context.push([]);
      for (let j = 0; j < this.curLevel[i].length; j++) {
        const ind = this.curLevel[i][j];
        context[i][j] = this.landTiles[ind];
      }
    }
    // console.log(context);
    return context;
  }
}
