import { TypeDispatch, TypeCardFull } from '../types';
import {
  sortCardsAction,
  gameCardsAction,
  helperCardsAction,
  resultStackAction,
  setCounterAction,
  setIsReadyAction,
  setIsWinAction,
  setMoveCounterAction,
  setGamePointsAction,
} from '../store/actions/cards';
import { dataResultStack } from '../store/dataCards';

export const getRandomCards = (
  sortArr: TypeCardFull[],
  gameArr: TypeCardFull[][],
  num: number,
  dispatch: TypeDispatch,
) => {
  const arr = [...sortArr].filter((_, index) => index >= sortArr.length - num);

  const newSortCards = arr.map((item, index) => {
    if (index === arr.length - 1) {
      return { ...item, open: true };
    }
    return item;
  });
  const outArr = [...gameArr, newSortCards];
  const newArr = [...sortArr].filter((_, index) => index < sortArr.length - num);
  dispatch(sortCardsAction(newArr));
  dispatch(gameCardsAction(outArr));
};

export const startNewGame = (dispatch: TypeDispatch, cards: TypeCardFull[]) => {
  dispatch(setMoveCounterAction(0));
  dispatch(setIsReadyAction(false));
  dispatch(gameCardsAction([]));
  dispatch(helperCardsAction([]));
  dispatch(resultStackAction(dataResultStack));
  dispatch(setIsWinAction(false));
  const newArr = [...cards].sort(() => Math.random() - 0.5);
  dispatch(sortCardsAction(newArr));
  dispatch(setCounterAction(1));
  dispatch(setGamePointsAction(0));
};

export const changeHelperCards = (
  dispatch: TypeDispatch,
  helperCards: TypeCardFull[],
  sortCards: TypeCardFull[],
  moveCounter: number,
  gamePoints: number,
) => {
  const arr = [...helperCards];
  if (sortCards.length === 0) {
    const repeatArr = arr.map((item) => ({ ...item, open: false }));
    dispatch(sortCardsAction(repeatArr.reverse()));
    dispatch(helperCardsAction([]));
  } else {
    const el = [...sortCards][sortCards.length - 1];
    arr.push({ ...el, open: true });
    const newPoints = gamePoints > 4 ? gamePoints - 5 : gamePoints;

    dispatch(helperCardsAction(arr));
    dispatch(sortCardsAction([...sortCards].slice(0, -1)));

    dispatch(setGamePointsAction(newPoints));
  }
  dispatch(setMoveCounterAction(moveCounter + 1));
};
