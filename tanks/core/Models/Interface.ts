/* eslint-disable lines-between-class-members */
import {
  BORDER_LEFT_WIDTH,
  BORDER_TOP_BOTTOM_HEIGHT,
  CANVAS_HEIGHT,
  ENEMY_MAX_TOTAL_COUNT,
  FIELD_SIZE,
  PLAYER_INITIAL_LIVES,
  TILE_SIZE,
} from '../../config';
import { numbs, ui } from '../tileMap';
import { TRenderDraw } from '../World/World';

interface IInterface {
  level: number;
  lives_player_1: number;
  lives_player_2: number;
  enemyCount: number;
  player_2: boolean;
  onPlayer_2: () => void;
  player_1_Die: () => void;
  player_2_Die: () => void;
  enemyTankGo: () => void;
}

export class Interface implements IInterface {
  level: number;
  lives_player_1: number;
  lives_player_2: number;
  enemyCount: number;
  player_2: boolean;

  constructor() {
    this.level = 1;
    this.lives_player_1 = PLAYER_INITIAL_LIVES;
    this.lives_player_2 = PLAYER_INITIAL_LIVES;
    this.enemyCount = ENEMY_MAX_TOTAL_COUNT;
    this.player_2 = false;
  }

  onPlayer_2() {
    this.player_2 = true;
  }

  player_1_Die() {
    this.lives_player_1 -= 1;
  }

  player_2_Die() {
    this.lives_player_2 -= 1;
  }

  enemyTankGo() {
    this.enemyCount -= 1;
  }

  nextLevel() {
    this.level += 1;
  }

  prepareRenderLevel(img: HTMLImageElement): TRenderDraw[] {
    const x = BORDER_LEFT_WIDTH + FIELD_SIZE + TILE_SIZE;
    const y = CANVAS_HEIGHT - TILE_SIZE * 6;
    const prepareLevel = (n: number): TRenderDraw[] => {
      const arrLevel = n
        .toString()
        .split('')
        .reverse()
        .map((item) => +item)
        .filter((item) => item);
      return arrLevel.map((item, index) => {
        const frameNum = numbs[item];
        return [
          img,
          frameNum[0],
          frameNum[1],
          frameNum[2],
          frameNum[3],
          x + TILE_SIZE * 2 - TILE_SIZE * index - TILE_SIZE,
          y + ui.flag[3],
          frameNum[2],
          frameNum[3],
        ];
      });
    };
    const icon: TRenderDraw = [
      img,
      ui.flag[0],
      ui.flag[1],
      ui.flag[2],
      ui.flag[3],
      x,
      y,
      ui.flag[2],
      ui.flag[3],
    ];
    return [icon, ...prepareLevel(this.level)];
  }

  private prepareRenderPlayer_1(img: HTMLImageElement): TRenderDraw[] {
    const x = BORDER_LEFT_WIDTH + FIELD_SIZE + TILE_SIZE;
    const y = BORDER_TOP_BOTTOM_HEIGHT + TILE_SIZE * 15;
    const pl = ui.player_I;
    const icon = ui.player;
    const countLive = this.lives_player_1 - 1;
    const frameNum = numbs[countLive];

    const player: TRenderDraw = [img, pl[0], pl[1], pl[2], pl[3], x, y, pl[2], pl[3]];
    const iconPlayer: TRenderDraw = [
      img,
      icon[0],
      icon[1],
      icon[2],
      icon[3],
      x,
      y + TILE_SIZE,
      icon[2],
      icon[3],
    ];
    const count: TRenderDraw = [
      img,
      frameNum[0],
      frameNum[1],
      frameNum[2],
      frameNum[3],
      x + TILE_SIZE,
      y + TILE_SIZE,
      frameNum[2],
      frameNum[3],
    ];
    return [player, iconPlayer, count];
  }

  prepareRenderIconEnemyTank(img: HTMLImageElement): TRenderDraw[] {
    const out: TRenderDraw[] = [];
    const x = BORDER_LEFT_WIDTH + FIELD_SIZE + TILE_SIZE;
    let y = BORDER_TOP_BOTTOM_HEIGHT;
    const getPosTank = (index: number) => {
      if (index % 2) {
        y += TILE_SIZE;
        return { x: x + (index % 2) + TILE_SIZE, y };
      }
      return { x, y };
    };
    for (let i = 1; i < this.enemyCount + 1; i++) {
      const { x: curX, y: curY } = getPosTank(i);
      out.push([
        img,
        ui.enemy[0],
        ui.enemy[1],
        ui.enemy[2],
        ui.enemy[3],
        curX,
        curY,
        ui.enemy[2],
        ui.enemy[3],
      ]);
    }
    return out;
  }

  prepareRender(img: HTMLImageElement) {
    return [
      ...this.prepareRenderIconEnemyTank(img),
      ...this.prepareRenderPlayer_1(img),
      ...this.prepareRenderLevel(img),
    ];
  }
}
