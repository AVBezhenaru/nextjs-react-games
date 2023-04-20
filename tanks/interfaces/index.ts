export interface IArgs {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  sprites?: number[][];
}

export interface IEnemyArgs extends IArgs {
  type?: number;
}

export interface IDataMap {
  map: number[][][];
  mapNull: number[][];
  enemies: number[];
}
