import { CardsActionTypes, TypeActions, TypeCardFull, TypeDragItem } from '../../types';

export const sortCardsAction = (data: TypeCardFull[]): TypeActions => ({
  type: CardsActionTypes.SORT_CARDS,
  payload: data,
});

export const gameCardsAction = (data: TypeCardFull[][]): TypeActions => ({
  type: CardsActionTypes.SET_GAME_CARDS,
  payload: data,
});

export const helperCardsAction = (data: TypeCardFull[]): TypeActions => ({
  type: CardsActionTypes.SET_HELPER_CARDS,
  payload: data,
});

export const resultStackAction = (data: { [key: number]: TypeCardFull[] }): TypeActions => ({
  type: CardsActionTypes.SET_RESULT_STACK,
  payload: data,
});

export const setIsReadyAction = (status: boolean): TypeActions => ({
  type: CardsActionTypes.SET_IS_READY,
  payload: status,
});

export const setCounterAction = (num: number): TypeActions => ({
  type: CardsActionTypes.SET_COUNTER,
  payload: num,
});

export const setMoveCounterAction = (num: number): TypeActions => ({
  type: CardsActionTypes.SET_MOVE_COUNTER,
  payload: num,
});

export const setIsWinAction = (status: boolean): TypeActions => ({
  type: CardsActionTypes.SET_IS_WIN,
  payload: status,
});

export const setDragItemAction = (data: TypeDragItem): TypeActions => ({
  type: CardsActionTypes.SET_DRAG_ITEM,
  payload: data,
});

export const setDragOverAction = (num: number): TypeActions => ({
  type: CardsActionTypes.SET_DRAG_OVER,
  payload: num,
});

export const setGamePointsAction = (num: number): TypeActions => ({
  type: CardsActionTypes.SET_GAME_POINTS,
  payload: num,
});

export const setTheBestPoints = (num: number): TypeActions => ({
  type: CardsActionTypes.SET_THE_BEST_POINTS,
  payload: num,
});
