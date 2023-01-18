import {
  helperCardsAction,
  gameCardsAction,
  resultStackAction,
  setMoveCounterAction,
  setGamePointsAction,
} from '../store/actions/cards';
import { TypeDispatch, TypeCardFull, TypeResultStack } from '../types';

export const putInResultStack = (
  dispatch: TypeDispatch,
  item: TypeCardFull,
  idStack: number,
  resultStack: TypeResultStack,
  helperCards: TypeCardFull[],
  gameCards: TypeCardFull[][],
  moveCounter: number,
  gamePoints: number,
) => {
  let idResult;

  // keys of result array stacks (right top 4 stacks)
  const resArrKeys = Object.keys(resultStack).map((key) => Number(key));

  for (let i = 0; i < resArrKeys.length; i++) {
    const key = resArrKeys[i];
    if (resultStack[key].length !== 0) {
      if (resultStack[key][0].suit === item.suit) {
        idResult = key;
      }
    }
  }

  if (idResult) {
    const prev = resultStack[idResult][resultStack[idResult].length - 1];

    if (prev.nameCard === item.nameCard - 1) {
      if (idStack === 8) {
        const newHelperCards = helperCards.slice(0, helperCards.length - 1);
        dispatch(helperCardsAction(newHelperCards));
      } else {
        const newCardsOut = gameCards.map((arr, i) => {
          if (i === idStack) {
            const newArr = arr.slice(0, arr.length - 1);
            arr = newArr.map((item, index) => {
              if (index === newArr.length - 1) return { ...item, open: true };
              return item;
            });
          }
          return arr;
        });
        dispatch(gameCardsAction(newCardsOut));
      }

      const newResult = { ...resultStack };
      newResult[idResult] = [...newResult[idResult], item];
      dispatch(resultStackAction(newResult));
    }
    dispatch(setMoveCounterAction(moveCounter + 1));
    dispatch(setGamePointsAction(gamePoints + 50));
  }
};
