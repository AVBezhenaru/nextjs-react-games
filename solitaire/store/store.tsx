import { TypeActions } from '../types';

import { dataCardsState } from './dataCards';

export const storeSolitaire = (state = dataCardsState, action: TypeActions) => {
  switch (action.type) {
    case 'SORT_CARDS':
      return {
        ...state,
        sortCards: action.payload,
      };
    default:
      return state;
  }
};
