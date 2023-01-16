import { TypeActions } from '../types';

import { dataCardsState } from './dataCards';

export const storeSolitaire = (state = dataCardsState, action: TypeActions) => {
  switch (action.type) {
    case 'SORT_CARDS':
      return {
        ...state,
        sortCards: action.payload,
      };
    case 'SET_GAME_CARDS':
      return {
        ...state,
        gameCards: action.payload,
      };
    case 'SET_HELPER_CARDS':
      return {
        ...state,
        helperCards: action.payload,
      };
    case 'SET_RESULT_STACK':
      return {
        ...state,
        resultStack: action.payload,
      };
    case 'SET_COUNTER':
      return {
        ...state,
        counter: action.payload,
      };
    case 'SET_MOVE_COUNTER':
      return {
        ...state,
        moveCounter: action.payload,
      };
    case 'SET_IS_WIN':
      return {
        ...state,
        isWin: action.payload,
      };
    case 'SET_DRAG_ITEM':
      return {
        ...state,
        dragItem: action.payload,
      };
    case 'SET_DRAG_OVER':
      return {
        ...state,
        dragOver: action.payload,
      };
    case 'SET_GAME_POINTS':
      return {
        ...state,
        gamePoints: action.payload,
      };
    case 'SET_THE_BEST_POINTS':
      return {
        ...state,
        theBestPoints: action.payload,
      };
    default:
      return state;
  }
};
