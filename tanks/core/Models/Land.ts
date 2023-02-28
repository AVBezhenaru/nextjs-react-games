// import { level_1 } from '../../assents/maps/01';
import { TILE_SIZE } from '../../config';
import { landTiles } from '../tileMap';

import { Direction } from './Tank';

interface ILand {
  level: number;
  curLevel: number[][];
}

export type TWall = {
  stopRow1: number;
  stopCol1: number;
  stopRow2: number;
  stopCol2: number;
};

export type TLand = number[][];

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 6, 6, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 6, 6, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
  [6, 6, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 6, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export class Land implements ILand {
  level: number;

  curLevel: TLand;

  landTiles;

  constructor(level: number) {
    this.level = level;
    this.curLevel = map;
    this.landTiles = landTiles;
  }

  lavel: number;

  prepareMap(map: TLand): {
    x: number;
    y: number;
    frame: number[];
  }[] {
    const context = [];
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const ind = map[i][j];
        if (this.landTiles[ind])
          context.push({ x: j * TILE_SIZE, y: i * TILE_SIZE, frame: this.landTiles[ind] });
      }
    }
    return context;
  }

  destroyWall(walls: TWall, direction: Direction, power: 0 | 1) {
    let stopLine: number;
    switch (true) {
      case direction === Direction.up:
        stopLine = Math.max(walls.stopRow1, walls.stopRow2, power);
        this.changeWall(walls.stopCol1, stopLine, direction, power);
        this.changeWall(walls.stopCol2, stopLine, direction, power);
        return [
          { col: walls.stopCol1 + 0, row: stopLine + 0 },
          { col: walls.stopCol2 + 0, row: stopLine + 0 },
        ];

      case direction === Direction.right:
        stopLine =
          Math.min(walls.stopCol1, walls.stopCol2) > 25
            ? 25
            : Math.min(walls.stopCol1, walls.stopCol2);
        this.changeWall(stopLine, walls.stopRow1, direction, power);
        this.changeWall(stopLine, walls.stopRow2, direction, power);
        return [
          { col: stopLine + 0, row: walls.stopRow1 + 0 },
          { col: stopLine + 0, row: walls.stopRow2 + 0 },
        ];
      case direction === Direction.down:
        stopLine =
          Math.min(walls.stopRow1, walls.stopRow2) > 25
            ? 25
            : Math.min(walls.stopRow1, walls.stopRow2);
        this.changeWall(walls.stopCol1, stopLine, direction, power);
        this.changeWall(walls.stopCol2, stopLine, direction, power);
        return [
          { col: walls.stopCol1 + 0, row: stopLine + 0 },
          { col: walls.stopCol2 + 0, row: stopLine + 0 },
        ];
      case direction === Direction.left:
        stopLine =
          Math.max(walls.stopCol1, walls.stopCol2) < 0
            ? 0
            : Math.max(walls.stopCol1, walls.stopCol2);
        this.changeWall(stopLine, walls.stopRow1, direction, power);
        this.changeWall(stopLine, walls.stopRow2, direction, power);
        return [
          { col: stopLine + 0, row: walls.stopRow1 + 0 },
          { col: stopLine + 0, row: walls.stopRow2 + 0 },
        ];
    }
  }

  private changeWall(col: number, row: number, direction: Direction, power: 0 | 1) {
    if (col < 0) col = 0;
    if (col > 25) col = 25;
    switch (true) {
      case direction === Direction.up && power === 0:
        if (this.curLevel[row][col] === 1) {
          this.curLevel[row][col] = 5;
        } else if (this.curLevel[row][col] === 5) {
          this.curLevel[row][col] = 0;
        }
        break;
      case direction === Direction.right && power === 0:
        if (this.curLevel[row][col] === 1) {
          this.curLevel[row][col] = 2;
        } else if (this.curLevel[row][col] === 2) {
          this.curLevel[row][col] = 0;
        }
        break;
      case direction === Direction.down && power === 0:
        if (this.curLevel[row][col] === 1) {
          this.curLevel[row][col] = 3;
        } else if (this.curLevel[row][col] === 3) {
          this.curLevel[row][col] = 0;
        }
        break;
      case direction === Direction.left && power === 0:
        if (this.curLevel[row][col] === 1) {
          this.curLevel[row][col] = 4;
        } else if (this.curLevel[row][col] === 4) {
          this.curLevel[row][col] = 0;
        }
        break;
    }
  }
}
