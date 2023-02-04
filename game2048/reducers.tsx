import { Reducer } from 'redux';

import * as actions from './actions';

interface IState {
  numberColor: number[];
}

const reducer: Reducer = (
  state: IState = {
    numberColor: [72, 3, 182],
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
export default reducer;
