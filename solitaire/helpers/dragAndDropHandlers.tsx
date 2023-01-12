import React from 'react';

import {
  helperCardsAction,
  gameCardsAction,
  setMoveCounterAction,
  resultStackAction,
  setDragOverAction,
  setGamePointsAction,
} from '../store/actions/cards';
import { TypeCardFull, TypeDispatch, TypeResultStack } from '../types';

export const dragOverHandler = (
  e: React.DragEvent<HTMLDivElement>,
  dispatch: TypeDispatch,
  index: number,
  dragOver: number,
) => {
  e.preventDefault();
  if (dragOver !== index) {
    dispatch(setDragOverAction(index));
  }
};

export const dropHandler = (
  e: React.DragEvent<Element>,
  dispatch: TypeDispatch,
  items: { items: TypeCardFull[]; idStack: number },
  idStack: number,
  gameCards: TypeCardFull[][],
  helperCards: TypeCardFull[],
  moveCounter: number,
  resultStack: TypeResultStack,
  gamePoints: number,
) => {
  e.preventDefault();
  if (items.idStack < 14) {
    if (idStack < 14) {
      if (gameCards[idStack].length === 0) {
        if (items.items[0].nameCard === 13) {
          const newArr = gameCards.map((arr, i) => {
            if (i === idStack) {
              arr = [...arr, ...items.items];
            }
            if (i === items.idStack) {
              const count = items.items.length;
              const newArr = arr.slice(0, arr.length - count);
              arr = newArr.map((item, i) => {
                if (i === newArr.length - 1) return { ...item, open: true };
                return item;
              });
            }
            return arr;
          });
          dispatch(setGamePointsAction(gamePoints + 15));
          dispatch(setMoveCounterAction(moveCounter + 1));
          dispatch(gameCardsAction(newArr));
          if (items.idStack === 8) {
            const newHelperCards = helperCards.slice(0, helperCards.length - 1);
            dispatch(helperCardsAction(newHelperCards));
          }
        }
      } else {
        const prev = gameCards[idStack][gameCards[idStack].length - 1];
        if (prev.color !== items.items[0].color && prev.nameCard === items.items[0].nameCard + 1) {
          const newCardsOut = gameCards.map((arr, i) => {
            if (i === idStack) {
              arr = [...arr, ...items.items];
            }
            if (i === items.idStack) {
              const count = items.items.length;
              const newArr = arr.slice(0, arr.length - count);
              arr = newArr.map((item, i) => {
                if (i === newArr.length - 1) return { ...item, open: true };
                return item;
              });
            }
            return arr;
          });
          dispatch(setGamePointsAction(gamePoints + 15));
          dispatch(setMoveCounterAction(moveCounter + 1));
          dispatch(gameCardsAction(newCardsOut));
          if (items.idStack === 8) {
            const newHelperCards = helperCards.slice(0, helperCards.length - 1);
            dispatch(helperCardsAction(newHelperCards));
          }
        }
      }
    }

    if (idStack >= 14) {
      if (items.items[0].nameCard === 1) {
        const newResult = { ...resultStack };
        newResult[idStack] = items.items;
        dispatch(resultStackAction(newResult));
        const newArr = gameCards.map((arr, i) => {
          if (i === idStack) {
            arr = [...arr, ...items.items];
          }
          if (i === items.idStack) {
            const count = items.items.length;
            const newArr = arr.slice(0, arr.length - count);
            arr = newArr.map((item, i) => {
              if (i === newArr.length - 1) return { ...item, open: true };
              return item;
            });
          }
          return arr;
        });
        if (items.idStack === 8) {
          const newHelperCards = helperCards.slice(0, helperCards.length - 1);
          dispatch(helperCardsAction(newHelperCards));
        }

        dispatch(gameCardsAction(newArr));
        dispatch(setMoveCounterAction(moveCounter + 1));
        dispatch(setGamePointsAction(gamePoints + 50));
      } else {
        const prev = resultStack[idStack][resultStack[idStack].length - 1];

        if (prev.suit === items.items[0].suit && prev.nameCard === items.items[0].nameCard - 1) {
          const newCardsOut = gameCards.map((arr, i) => {
            if (i === items.idStack) {
              const count = items.items.length;
              const newArr = arr.slice(0, arr.length - count);
              arr = newArr.map((item, i) => {
                if (i === newArr.length - 1) return { ...item, open: true };
                return item;
              });
            }
            return arr;
          });

          dispatch(gameCardsAction(newCardsOut));
          const newResult = { ...resultStack };
          newResult[idStack] = [...newResult[idStack], ...items.items];
          dispatch(resultStackAction(newResult));
          if (items.idStack === 8) {
            const newHelperCards = helperCards.slice(0, helperCards.length - 1);
            dispatch(helperCardsAction(newHelperCards));
          }
        }
        dispatch(setGamePointsAction(gamePoints + 50));
        dispatch(setMoveCounterAction(moveCounter + 1));
      }
    }
  }
};
