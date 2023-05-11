// eslint-disable-next-line import/no-extraneous-dependencies
import { Reducer } from 'redux';

interface IState {
  gameOver: boolean;
  gameStart: boolean;
  gameLoading: boolean;
  gameVictory: boolean;
  countKilledPerRound: number;
  countKilledAll: number;
  totalPoints: number;
  pause: boolean;
  player1Live: number;
  stage: number;
  levelTank: number;
}

const tanksGameReducer: Reducer = (
  state: IState = {
    gameOver: false,
    gameStart: false,
    gameLoading: false,
    gameVictory: false,
    countKilledPerRound: 0,
    countKilledAll: 0,
    totalPoints: 0,
    pause: false,
    player1Live: 2,
    stage: 0,
    levelTank: 0,
  },
  action: { type?: string; payload?: boolean | number } = {},
) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, gameStart: true };
    case 'START_LOADING':
      return { ...state, gameLoading: action.payload };
    case 'GAME_VICTORY':
      return { ...state, gameVictory: true, gameStart: false };
    case 'GAME_OVER':
      return { ...state, gameOver: true };
    case 'SET_COUNT_KILLED':
      if (action.payload === true) {
        return {
          ...state,
          countKilledPerRound: state.countKilledPerRound + 1,
          countKilledAll: state.countKilledAll + 1,
        };
      }
      return { ...state, countKilledPerRound: 0 };
    case 'SET_COUNT_POINT':
      return { ...state, totalPoints: state.totalPoints + +action.payload };
    case 'PAUSE':
      return { ...state, pause: !state.pause };
    case 'PLAYER_1_LIVE':
      if (action.payload === true) {
        return { ...state, player1Live: state.player1Live + 1 };
      }
      return { ...state, player1Live: state.player1Live - 1 };
    case 'STAGE':
      return { ...state, stage: state.stage + 1 };
    case 'LEVEL_TANK':
      if (state.levelTank < 3 && +action.payload === 1) {
        return { ...state, levelTank: state.levelTank + 1 };
      }
      if (state.levelTank > 0 && +action.payload === 0) {
        return { ...state, levelTank: state.levelTank - 1 };
      }
      if (+action.payload === 2) {
        return { ...state, levelTank: 0 };
      }
      if (+action.payload === 3) {
        return { ...state, levelTank: 3 };
      }
      return state;
    default:
      return state;
  }
};

export default tanksGameReducer;
