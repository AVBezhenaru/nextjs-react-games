import { Reducer } from 'redux';

import * as actions from './actions';

interface IState {
  numberColor: number[];
}

const game2048Reducer: Reducer = (
  state: IState = {
    numberColor: [57, 75, 144],
  },
  action: { type?: string; payload?: any } = {},
) => {
  switch (action.type) {
    case actions.SET_COLOR: {
      return { ...state, numberColor: action.payload.color };
    }
    default:
      return state;
  }
};
export default game2048Reducer;
