type TetrominoType = (string | number)[][];

export type CreateStageType = TetrominoType;

export type CellIntrAttrType = {
  key: number;
  type: number;
  color?: string;
};

export type DetailType = {
  shape: TetrominoType[];
  color?: string;
};

export type DetailsType = {
  I: DetailType;
  J: DetailType;
  L: DetailType;
  O: DetailType;
  S: DetailType;
  T: DetailType;
  Z: DetailType;
};

export type DropTimeType = {
  [key: string]: number;
};

export type ScoreType = {
  [key: string]: number;
};

export type InitialStateType = {
  detailsInPlay: {
    position: { x: number; y: number };
    tetromino: any;
    color?: string;
    collided: boolean;
  }[];
  stage: CreateStageType;
  nextDetailStage: any; // ???
  detail: {
    position: { x: number; y: number };
    tetromino: any;
    color?: string;
    collided: boolean;
  };
  nextDetail: {
    position: { x: number; y: number };
    tetromino: any;
    color?: string;
    collided: boolean;
  };
  hasCollided: boolean;
  rotationIdx: number;
  dropTime: number;
  isGameOver: boolean;
  score: number;
  linesCleared: number;
  level: number;
  isGamePaused: boolean;
  intervalId: any;
  isOut: boolean;
};

export type UsePlayerType = {
  position: { x: number; y: number };
  tetro: (string | number)[][][];
  collided: boolean;
};
