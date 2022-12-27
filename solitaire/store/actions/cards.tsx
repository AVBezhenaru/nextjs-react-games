import { CardsActionTypes, TypeActions, TypeCardFull } from '../../types';

export const changeIsOpen = (status: boolean): TypeActions => ({
  type: CardsActionTypes.CHANGE_IS_OPEN,
  payload: status,
});

export const sortCardsAction = (data: TypeCardFull[]): TypeActions => ({
  type: CardsActionTypes.SORT_CARDS,
  payload: data,
});
