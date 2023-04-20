/* eslint-disable lines-between-class-members */
import { store } from '../../../store/index';
import { CANVAS_HEIGHT, CANVAS_WIDTH, UI } from '../../constants';
import { IDataMap } from '../../interfaces';
import {
  tanksGameLoadingAction,
  tanksGameOverAction,
  tanksGameStage,
  tanksGameVictoryAction,
} from '../../reducers/tanksGameAction';

import Input from './input';
import Stage from './stage';
import stages from './stages';
import View from './view';

export default class Game {
  input: Input;
  view: View;
  stages: IDataMap[];
  player1: any;
  player2: any;
  stage: Stage;
  frames: number;
  lastFrame: number;

  constructor({ input, view }: { input: Input; view: View }) {
    this.input = input;
    this.view = view;
    this.stages = stages;
    this.player1 = null;
    this.player2 = null;
    this.stage = null;
    this.frames = 0;
    this.lastFrame = 0;

    this.loop = this.loop.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
    this.onGameVictory = this.onGameVictory.bind(this);
  }

  start() {
    this.stage = new Stage(stages[0]);
    this.stage.on('gameOver', this.onGameOver);
    this.stage.on('gameVictory', this.onGameVictory);

    requestAnimationFrame(this.loop);
  }

  loop(currentFrame: number) {
    const frameDelta = currentFrame - this.lastFrame;

    if (!store.getState().tanks.pause && !store.getState().tanks.gameOver) {
      this.stage.update(this.input, frameDelta);
      this.view.update(this.stage);
      this.frames = 0;

      this.lastFrame = currentFrame;
    }

    if (store.getState().tanks.pause) {
      this.view.canvas.drawImage(
        this.view.sprite,
        ...UI.pause,
        CANVAS_WIDTH / 2 - 120,
        CANVAS_HEIGHT / 2 + 50,
        156,
        28,
      );
    }

    requestAnimationFrame(this.loop);
  }

  onGameOver() {
    store.dispatch(tanksGameOverAction(true));
  }

  onGameVictory() {
    this.stage.playerTank.fireMusic.pause();
    store.dispatch(tanksGameVictoryAction());
    store.dispatch(tanksGameStage());
    store.dispatch(tanksGameLoadingAction(false));
  }
}
