import { sortCardsAction } from '../store/actions/cards';

export const setRandomCards = (cards: []) => (dispatch: any) => {
  const newArr = [...cards].sort(() => Math.random() - 0.5);
  console.log(newArr);
  dispatch(sortCardsAction(newArr));
};
