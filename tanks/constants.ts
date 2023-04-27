export const NUMBER_OF_UNITS = 13;
export const TILE_SIZE = 32;
export const UNIT_SIZE = 64;
export const STAGE_SIZE = NUMBER_OF_UNITS * UNIT_SIZE;

export const Keys = {
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  SPACE: 'Space',
  ENTER: 'Enter',
};

export const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

export const TerrainType = {
  BASE: 0,
  BRICK_WALL: 1,
  STEEL_WALL: 2,
  TREE: 3,
  WATER: 4,
  ICE: 5,
};

export const CANVAS_WIDTH = STAGE_SIZE + UNIT_SIZE * 4;
export const CANVAS_HEIGHT = STAGE_SIZE + UNIT_SIZE;

export const BASE_POSITION = [6 * UNIT_SIZE, 12 * UNIT_SIZE];
export const BASE_WIDTH = UNIT_SIZE;
export const BASE_HEIGHT = UNIT_SIZE;
export const BASE_SPRITES = [
  [19 * UNIT_SIZE + 28, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [20 * UNIT_SIZE + 28, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
];

export const BRICK_WALL_SPRITES = [
  [16 * UNIT_SIZE + 28, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
  [16.5 * UNIT_SIZE + 28, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right
  [17 * UNIT_SIZE + 28, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom
  [17.5 * UNIT_SIZE + 28, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // left
  [18 * UNIT_SIZE + 28, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top
];
export const BRICK_WALL_SPRITE_MAP: { [index: number]: number } = {
  0: 0,
  1: 1,
  2: 2,
  4: 3,
  8: 4,
};

export const BULLET_WIDTH = 16;
export const BULLET_HEIGHT = 16;
export const BULLET_SPEED = 4;
export const BULLET_SPRITES = [
  [20 * UNIT_SIZE + 36, 6 * UNIT_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT],
  [21.5 * UNIT_SIZE + 36, 6 * UNIT_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT],
  [21 * UNIT_SIZE + 36, 6 * UNIT_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT],
  [20.5 * UNIT_SIZE + 36, 6 * UNIT_SIZE + 24, BULLET_WIDTH, BULLET_HEIGHT],
];

export const BULLET_EXPLOSION_WIDTH = UNIT_SIZE;
export const BULLET_EXPLOSION_HEIGHT = UNIT_SIZE;
export const BULLET_EXPLOSION_SPEED = 4;
export const BULLET_EXPLOSION_SPRITES = [
  [16 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
];

export const ENEMY_TANK_SPEED = 1;
export const ENEMY_TANK_TURN_TIMER_THRESHOLD = 200;
export const ENEMY_TANK_START_POSITIONS = [
  [6 * UNIT_SIZE, 0],
  [0 * UNIT_SIZE, 0],
  [12 * UNIT_SIZE, 0],
];
export const ENEMY_TANK_SPRITES = [
  [
    [8 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [9 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [14 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [15 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [12 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [13 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [10 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
    [11 * UNIT_SIZE + 8, 4 * UNIT_SIZE + 8, UNIT_SIZE, UNIT_SIZE],
  ],
];

export const PLAYER1_TANK_POSITION = [4 * UNIT_SIZE, 12 * UNIT_SIZE];
export const PLAYER1_TANK_SPRITES = [
  [
    [0 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [1 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [6 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [7 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [4 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [5 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [2 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [3 * UNIT_SIZE, 0 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  ],
  [
    [0 * UNIT_SIZE, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [1 * UNIT_SIZE, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [6 * UNIT_SIZE, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [7 * UNIT_SIZE + 5, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [4 * UNIT_SIZE + 3, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [5 * UNIT_SIZE + 3, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [2 * UNIT_SIZE, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [3 * UNIT_SIZE, 1 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  ],
  [
    [0 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [1 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [6 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [7 * UNIT_SIZE + 5, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [4 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [5 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [2 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [3 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  ],
  [
    [0 * UNIT_SIZE, 3 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [1 * UNIT_SIZE, 3 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
    [6 * UNIT_SIZE, 3 * UNIT_SIZE + 2, UNIT_SIZE, UNIT_SIZE],
    [7 * UNIT_SIZE + 5, 3 * UNIT_SIZE + 2, UNIT_SIZE, UNIT_SIZE],
    [4 * UNIT_SIZE + 2, 3 * UNIT_SIZE + 4, UNIT_SIZE, UNIT_SIZE],
    [5 * UNIT_SIZE + 2, 3 * UNIT_SIZE + 4, UNIT_SIZE, UNIT_SIZE],
    [2 * UNIT_SIZE, 3 * UNIT_SIZE + 2, UNIT_SIZE, UNIT_SIZE],
    [3 * UNIT_SIZE, 3 * UNIT_SIZE + 2, UNIT_SIZE, UNIT_SIZE],
  ],
];

export const TANK_WIDTH = UNIT_SIZE;
export const TANK_HEIGHT = UNIT_SIZE;
export const TANK_SPEED = 1;
export const TANK_TURN_THRESHOLD = TILE_SIZE * 0.5;
export const TANK_ANIMATION_FRAME = 20;

export const TANK_EXPLOSION_WIDTH = UNIT_SIZE * 2;
export const TANK_EXPLOSION_HEIGHT = UNIT_SIZE * 2;
export const TANK_EXPLOSION_SPEED = 4;
export const TANK_EXPLOSION_SPRITES = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  // [16 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  // [17 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  // [18 * UNIT_SIZE + 28, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
];

export const STEEL_WALL_SPRITES = [
  [16 * UNIT_SIZE + 28, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
  [17 * UNIT_SIZE + 28, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right
  [18 * UNIT_SIZE + 28, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom
  [19 * UNIT_SIZE + 28, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // left
  [20 * UNIT_SIZE + 28, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top
];

export const TREE_WALL_SPRITES = [
  [17 * UNIT_SIZE + 28, 2 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
];

export const WATER_WALL_SPRITES = [
  [16 * UNIT_SIZE + 28, 2 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
];

export const NUMBS: { [key: number]: number[] } = {
  0: [1340, 734, TILE_SIZE, TILE_SIZE],
  1: [1372, 734, TILE_SIZE, TILE_SIZE],
  2: [1404, 734, TILE_SIZE, TILE_SIZE],
  3: [1436, 734, TILE_SIZE, TILE_SIZE],
  4: [1468, 734, TILE_SIZE, TILE_SIZE],
  5: [1340, 766, TILE_SIZE, TILE_SIZE],
  6: [1372, 766, TILE_SIZE, TILE_SIZE],
  7: [1404, 766, TILE_SIZE, TILE_SIZE],
  8: [1436, 766, TILE_SIZE, TILE_SIZE],
  9: [1468, 766, TILE_SIZE, TILE_SIZE],
};

export const UI = {
  enemy: [1308, 768, 32, 32],
  player: [1536, 576, 28, 32],
  pause: [1184, 704, 156, 28],
  stage: [1344, 704, 156, 28],
  gameOver: [1184, 736, 124, 60],
  flag: [1532, 736, 64, 60],
  player_I: [1536, 544, 60, 28],
  player_II: [1536, 640, 60, 28],
};

// export const bonus = {
//   helmet: [1052, 448, 64, 60],
//   clock: [1116, 448, 64, 60],
//   shovel: [1180, 448, 64, 60],
//   start: [1244, 448, 64, 60],
//   grenade: [1308, 448, 64, 60],
//   tank: [1372, 448, 64, 60],
//   gun: [1436, 448, 64, 60],
// };

export const BONUS = [
  [1052, 448, 64, 60],
  [1116, 448, 64, 60],
  [1180, 448, 64, 60],
  [1244, 448, 64, 60],
  [1308, 448, 64, 60],
  [1372, 448, 64, 60],
  [1436, 448, 64, 60],
];

export const SPAWN = [
  [1064, 396, 36, 36],
  [1124, 392, 44, 44],
  [1184, 388, 52, 52],
  [1244, 384, 60, 60],
];

export const SHEILD = [
  [16 * UNIT_SIZE + 28, 9 * UNIT_SIZE, 64, 64],
  [1116, 576, 64, 64],
];
