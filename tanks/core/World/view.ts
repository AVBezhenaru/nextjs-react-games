/* eslint-disable lines-between-class-members */
import { store } from '../../../store';
import {
  NUMBER_OF_UNITS,
  UNIT_SIZE,
  TILE_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  NUMBS,
  UI,
} from '../../constants';
import { EnemyTank } from '../Models/tanks/Enemy-tank';

import { Stage } from './Stage';

const PLAYFIELD_X = UNIT_SIZE;
const PLAYFIELD_Y = UNIT_SIZE;
const PLAYFIELD_WIDTH = NUMBER_OF_UNITS * UNIT_SIZE;
const PLAYFIELD_HEIGHT = NUMBER_OF_UNITS * UNIT_SIZE;
const PANEL_X = PLAYFIELD_X + PLAYFIELD_WIDTH;
const PANEL_Y = PLAYFIELD_Y;
const PANEL_HEIGHT = PANEL_Y + PLAYFIELD_HEIGHT;

export class View {
  canvas: any;
  sprite: HTMLImageElement;

  constructor(ctx: any, sprite: HTMLImageElement) {
    this.canvas = ctx;
    this.canvas.imageSmoothingEnabled = false;
    this.sprite = sprite;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  update(stage: Stage) {
    this.clearScreen();
    this.renderStage(stage);
    this.renderPanel(stage);
    this.renderGrid();
  }

  clearScreen() {
    this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderStage(stage: Stage) {
    this.canvas.fillStyle = '#636363';
    this.canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.canvas.fillStyle = '#000000';
    this.canvas.fillRect(PLAYFIELD_X, PLAYFIELD_Y, PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT);

    for (const object of stage.objects) {
      const { x, y, width, height, sprite } = object;

      if (!sprite) return;

      this.canvas.drawImage(
        this.sprite,
        ...sprite,
        PLAYFIELD_X + x,
        PLAYFIELD_Y + y,
        width,
        height,
      );

      if (object.debug) {
        this.canvas.strokeStyle = '#ff0000';
        this.canvas.lineWidth = 2;
        this.canvas.strokeRect(x + 1, y + 1, width - 2, height - 2);
        object.debug = false;
      }
    }
  }

  renderPanel(stage: Stage) {
    this.renderEnemyTankIcons(stage.enemyTanks);
    this.renderPlayer1Lives();
    this.renderStageNumber();
  }

  renderGrid() {
    for (let y = 0; y < NUMBER_OF_UNITS; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS; x++) {
        this.canvas.strokeStyle = '#ffffff';
        this.canvas.lineWidth = 0.2;
        this.canvas.strokeRect(
          PLAYFIELD_X + (x * UNIT_SIZE + 1),
          PLAYFIELD_Y + (y * UNIT_SIZE + 1),
          UNIT_SIZE - 2,
          UNIT_SIZE - 2,
        );
      }
    }

    for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
        this.canvas.strokeStyle = '#ffffff';
        this.canvas.lineWidth = 0.1;
        this.canvas.strokeRect(
          PLAYFIELD_X + (x * TILE_SIZE + 1),
          PLAYFIELD_Y + (y * TILE_SIZE + 1),
          TILE_SIZE - 2,
          TILE_SIZE - 2,
        );
      }
    }
  }

  renderEnemyTankIcons(enemyTanks: EnemyTank[]) {
    this.canvas.fillStyle = '#000000';

    for (let i = 0, x = 0, y = 0; i < enemyTanks.length; i++) {
      this.canvas.drawImage(
        this.sprite,
        ...UI.enemy,
        PANEL_X + x * TILE_SIZE + 32,
        PANEL_Y + y * TILE_SIZE + 32,
        TILE_SIZE,
        TILE_SIZE,
      );

      if (x === 1) {
        x = 0;
        y++;
      } else {
        x++;
      }
    }
  }

  renderPlayer1Lives() {
    this.canvas.drawImage(
      this.sprite,
      ...UI.player_I,
      PANEL_X + TILE_SIZE,
      PANEL_Y + PANEL_HEIGHT * 0.5,
      UNIT_SIZE,
      TILE_SIZE,
    );

    this.canvas.drawImage(
      this.sprite,
      ...UI.player,
      PANEL_X + TILE_SIZE,
      PANEL_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );

    this.canvas.drawImage(
      this.sprite,
      ...NUMBS[store.getState().tanks.player1Live],
      PANEL_X + TILE_SIZE * 2,
      PANEL_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );
  }

  renderStageNumber() {
    this.canvas.drawImage(
      this.sprite,
      ...UI.flag,
      PANEL_X + TILE_SIZE - 10,
      PANEL_Y + PANEL_HEIGHT * 0.75,
      UNIT_SIZE * 2,
      UNIT_SIZE,
    );

    const stageLevel = store.getState().tanks.stage;
    const a = Math.floor(stageLevel / 10);
    const b = stageLevel % 10;

    this.canvas.drawImage(
      this.sprite,
      ...NUMBS[a],
      PANEL_X + TILE_SIZE * 2,
      PANEL_Y + PANEL_HEIGHT * 0.75 + UNIT_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );

    this.canvas.drawImage(
      this.sprite,
      ...NUMBS[b],
      PANEL_X + TILE_SIZE * 2 + 32,
      PANEL_Y + PANEL_HEIGHT * 0.75 + UNIT_SIZE,
      TILE_SIZE,
      TILE_SIZE,
    );
  }
}
