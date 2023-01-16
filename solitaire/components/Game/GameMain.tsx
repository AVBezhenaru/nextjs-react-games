import React, { FC, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';
import { changeHelperCards, getRandomCards, startNewGame } from '../../helpers/setGameCards';
import {
  setIsReadyAction,
  setCounterAction,
  setIsWinAction,
  setTheBestPoints,
} from '../../store/actions/cards';
import { dragOverHandler, dropHandler } from '../../helpers/dragAndDropHandlers';
import { putInResultStack } from '../../helpers/doubleClickFunction';
import { TypeCardFull, TypeDragItem } from '../../types';

import { Win } from './Win/Win';
import { Header } from './Header/Header';
import { Card } from './Card/Card';
import { SectionGame, BodyGame, Stack } from './GameMainStyle';

const stacks = [0, 1, 2, 3, 4, 5, 6];

export const GameMain: FC = () => {
  const dispatch = useAppDispatch();
  const {
    sortCards,
    cards,
    gameCards,
    helperCards,
    isReady,
    resultStack,
    counter,
    moveCounter,
    isWin,
    dragOver,
    gamePoints,
    theBestPoints,
  } = useAppSelector((state) => state.solitaire);

  const [dragItem, setDragItem] = useState<TypeDragItem>();
  const [showRules, setShowRules] = useState<boolean>(true);

  useEffect(() => {
    if (
      resultStack[14].length === 13 &&
      resultStack[15].length === 13 &&
      resultStack[16].length === 13 &&
      resultStack[17].length === 13
    ) {
      dispatch(setIsWinAction(true));
      if (gamePoints > theBestPoints) {
        dispatch(setTheBestPoints(gamePoints));
      }
    }
  }, [resultStack]);

  useEffect(() => {
    if (counter < 8) {
      getRandomCards(sortCards, gameCards, counter, dispatch);
      dispatch(setCounterAction(counter + 1));
    }
    if (counter === 8) {
      dispatch(setIsReadyAction(true));
    }
  }, [counter, isReady]);

  const dragHandler = (item: TypeCardFull, idStack: number, gameCards: TypeCardFull[][]) => {
    if (idStack === 8 || idStack >= 14) {
      setDragItem({ items: [item], idStack });
    } else {
      const index = gameCards[idStack].indexOf(item);
      const items = [...gameCards[idStack]].splice(index);
      setDragItem({ items: [...items], idStack });
    }
  };

  const results = Object.keys(resultStack);

  const drop = useCallback((id: number) => {
    return (e: React.DragEvent<Element>) => dropHandler(
      e,
      dispatch,
      dragItem,
      id,
      gameCards,
      helperCards,
      moveCounter,
      resultStack,
      gamePoints
    );
  }, [dragItem, gameCards, helperCards, moveCounter, resultStack, gamePoints]);

  const dragEnd = useCallback((id: number) => {
    return (e: React.DragEvent<Element>) => dropHandler(
      e,
      dispatch,
      dragItem,
      id,
      gameCards,
      helperCards,
      moveCounter,
      resultStack,
      gamePoints
    );
  }, [dragItem, gameCards, helperCards, moveCounter, resultStack, gamePoints])

  const doubleClick = useCallback((item: TypeCardFull, number: number) => {
    return () => putInResultStack(
      dispatch,
      item,
      number,
      resultStack,
      helperCards,
      gameCards,
      moveCounter,
      gamePoints
    );
  }, [resultStack, helperCards, gameCards, moveCounter, gamePoints]);

  const sortedCards = sortCards.map((item) => (
    <Card
      img={item.open ? item.img : shirt.src}
      name={item.nameCard}
      position="stack"
      key={item.id}
      draggable={false}
    />
  ));

  const hpCards = helperCards.map((item) => (
    <Card
      img={item.img}
      name={item.nameCard}
      position="stack"
      key={item.id}
      draggable
      onDragStart={() => dragHandler(item, 8, gameCards)}
      onDoubleClick={doubleClick(item, 8)}
      onDragEnd={dragEnd(dragOver)}
    />
  ));

  const resultsCards = results.map((el) => {
    const id = Number(el);
    return (
      <Stack
        key={uuidv4()}
        id={el}
        onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
        onDrop={drop(id)}
      >
        {resultStack[id].length > 0 &&
          resultStack[id].map((item: TypeCardFull) => (
            <Card
              img={item.img}
              name={item.nameCard}
              position="stack"
              key={item.id}
              draggable
              onDragStart={() => dragHandler(item, id, gameCards)}
              onDrop={drop(id)}
              onDragEnd={dragEnd(id)}
            />
          ))}
      </Stack>
    );
  });

  const stacksCards = stacks.map((id) => (
    <Stack
      key={uuidv4()}
      id={String(id)}
      onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
      onDrop={drop(id)}
      onDragEnd={dragEnd(id)}
    >
      {isReady &&
        gameCards[id].map((item: TypeCardFull, index: number) => (
          <Card
            first={index === 0}
            img={item.open ? item.img : shirt.src}
            name={item.nameCard}
            position="bottom"
            key={item.id}
            draggable
            onDragStart={() => dragHandler(item, id, gameCards)}
            onDragEnd={dragEnd(id)}
            onDrop={drop(id)}
            onDoubleClick={doubleClick(item, id)}
          />
        ))}
    </Stack>
  ));

  return (
    <SectionGame>
      <Header showRules={() => setShowRules(true)} />
      <BodyGame>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
        {isWin && <Win newGame={() => startNewGame(dispatch, cards)} />}
        <Stack
          id="bank"
          onClick={() =>
            changeHelperCards(dispatch, helperCards, sortCards, moveCounter, gamePoints)
          }
        >
          {isReady && sortedCards}
        </Stack>
        <Stack id="helper">
          {helperCards.length > 0 && hpCards}
        </Stack>
        {resultsCards}
      </BodyGame>
      <BodyGame>
        {stacksCards}
      </BodyGame>
    </SectionGame>
  );
};
