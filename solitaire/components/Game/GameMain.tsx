import React, { FC, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';
import { changeHelperCards, getRandomCards, startNewGame } from '../../helpers/setGameCards';
import {
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

  console.log(resultStack, 'result stack');
  console.log(gameCards, 'game cards');
  console.log(helperCards, 'helper cards');

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
  }, [counter]);

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
      stacked
      key={item.id}
      draggable={false}
    />
  ));

  const hpCards = helperCards.map((item) => (
    <Card
      img={item.img}
      name={item.nameCard}
      stacked
      key={item.id}
      draggable
      onDragStart={() => dragHandler(item, 8, gameCards)}
      onDoubleClick={doubleClick(item, 8)}
      onDragEnd={dragEnd(dragOver)}
    />
  ));

  const resultsCards = results.map((el) => {
    const id = Number(el);
    const stackCards = resultStack[id].map((item: TypeCardFull) => (
      <Card
        img={item.img}
        name={item.nameCard}
        stacked
        key={item.id}
        draggable
        onDragStart={() => dragHandler(item, id, gameCards)}
        onDrop={drop(id)}
        onDragEnd={dragEnd(id)}
      />
    ));

    return (
      <Stack
        key={uuid()}
        id={el}
        onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
        onDrop={drop(id)}
      >
        {stackCards}
      </Stack>
    );
  });

  const stacksCards: any = stacks.map((id) => (
    <Stack
      key={uuid()}
      id={String(id)}
      onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
      onDrop={drop(id)}
      onDragEnd={dragEnd(id)}
    >
      {gameCards[id] &&
        gameCards[id].map((item) => (
          <Card
            img={item.open ? item.img : shirt.src}
            name={item.nameCard}
            stacked={false}
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
          {sortedCards}
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
