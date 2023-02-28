export const TILE_SIZE = 32;
export const TILE_SIZE_BIG = 64;

export const FIELD_TILE_COUNT = 26;
export const FIELD_SIZE = FIELD_TILE_COUNT * TILE_SIZE;

export const BORDER_LEFT_WIDTH = 64;
export const BORDER_RIGHT_WIDTH = 128;
export const BORDER_TOP_BOTTOM_HEIGHT = 32;

export const BORDER_RECTS = [
  // Top
  {
    x: 0,
    y: 0,
    width: BORDER_LEFT_WIDTH + FIELD_SIZE + BORDER_RIGHT_WIDTH,
    height: BORDER_TOP_BOTTOM_HEIGHT,
  },
  // Bottom
  {
    x: 0,
    y: FIELD_SIZE + BORDER_TOP_BOTTOM_HEIGHT,
    width: BORDER_LEFT_WIDTH + FIELD_SIZE + BORDER_RIGHT_WIDTH,
    height: BORDER_TOP_BOTTOM_HEIGHT,
  },
  // Left
  {
    x: 0,
    y: BORDER_TOP_BOTTOM_HEIGHT,
    width: BORDER_LEFT_WIDTH,
    height: FIELD_SIZE,
  },
  // Right
  {
    x: BORDER_LEFT_WIDTH + FIELD_SIZE,
    y: BORDER_TOP_BOTTOM_HEIGHT,
    width: BORDER_RIGHT_WIDTH,
    height: FIELD_SIZE,
  },
];

export const CANVAS_WIDTH = FIELD_SIZE + BORDER_LEFT_WIDTH + BORDER_RIGHT_WIDTH;
export const CANVAS_HEIGHT = FIELD_SIZE + BORDER_TOP_BOTTOM_HEIGHT * 2;

export const PLAYER_FIRST_SPAWN_DELAY = 0;
export const PLAYER_SPAWN_DELAY = 0;
export const ENEMY_FIRST_SPAWN_DELAY = 0.16;
export const ENEMY_SPAWN_DELAY = 3;

export const ENEMY_MAX_TOTAL_COUNT = 20;
export const ENEMY_MAX_ALIVE_COUNT = 4;
export const ENEMY_MAX_ALIVE_COUNT_MULTIPLAYER = 6;

export const POWERUP_DURATION = 30;
export const SHIELD_SPAWN_DURATION = 3.5;
export const SHIELD_POWERUP_DURATION = 10;
export const BASE_DEFENCE_POWERUP_DURATION = 17;
export const FREEZE_POWERUP_DURATION = 10;

export const FRIENDLY_FIRE_STUN_DURATION = 5;
export const ICE_SLIDE_DURATION = 0.5;

export const POINTS_POWERUP_DURATION = 0.8;
export const POINTS_ENEMY_TANK_DURATION = 0.16;

export const LEVEL_START_DELAY = 2;

export const PLAYER_INITIAL_LIVES = 3;
export const PLAYER_EXTRA_LIVE_POINTS = 20000;
export const DEFAULT_HIGHSCORE = 20000;
export const BONUS_POINTS = 1000;

export const COLOR_BACKDROP = 'rgba(0,0,0,0.7)';
export const COLOR_GRAY = '#636363';
export const COLOR_GRAY_LIGHT = '#737373';
export const COLOR_BLACK = '#000';
export const COLOR_WHITE = '#fff';
export const COLOR_RED = '#d74000';
export const COLOR_YELLOW = '#ffae0a';

export const PLAYER_DEFAULT_SPAWN_POSITIONS = [
  { x: 256, y: 768 },
  { x: 512, y: 768 },
];
export const ENEMY_DEFAULT_SPAWN_POSITIONS = [
  { x: 384, y: 0 },
  { x: 768, y: 0 },
  { x: 0, y: 0 },
];
export const BASE_DEFAULT_POSITION = { x: 352, y: 736 };
export const BASE_DEFAULT_SIZE = { width: 128, height: 96 };

export const MENU_TITLE_DEFAULT_POSITION = {
  x: 112,
  y: 96,
};
export const MENU_DEFAULT_POSITION = {
  x: 16,
  y: 192,
};
