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
  console.log('put in');
  let idResult;
  if (resultStack[14].length !== 0) {
    if (resultStack[14][0].suit === item.suit) {
      idResult = 14;
    }
  }
  if (resultStack[15].length !== 0) {
    if (resultStack[15][0].suit === item.suit) {
      idResult = 15;
    }
  }
  if (resultStack[16].length !== 0) {
    if (resultStack[16][0].suit === item.suit) {
      idResult = 16;
    }
  }
  if (resultStack[17].length !== 0) {
    if (resultStack[17][0].suit === item.suit) {
      idResult = 17;
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
