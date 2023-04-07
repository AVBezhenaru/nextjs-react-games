// eslint-disable-next-line import/no-extraneous-dependencies
import { Reducer } from 'redux';

interface IState {
  gameOver: boolean;
  gameStart: boolean;
  gameLoading: boolean;
  gameVictory: boolean;
  countScores: [number, number];
}

const tanksGameReducer: Reducer = (
  state: IState = {
    gameOver: false,
    gameStart: false,
    gameLoading: false,
    gameVictory: false,
    countScores: [0, 0],
  },
  action: { type?: string; payload?: boolean | [number, number] } = {},
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
      return { ...state, countScores: action.payload };
    default:
      return state;
  }
};

export default tanksGameReducer;
