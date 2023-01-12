import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';
import { changeHelperCards, getRandomCards, startNewGame } from '../../helpers/setGameCards';
import {
  setIsReadyAction,
  setOnRulesAction,
  setCounterAction,
  setIsWinAction,
  setTheBestPoints,
} from '../../store/actions/cards';
import { dragOverHandler, dropHandler } from '../../helpers/dragAndDropHandlers';
import { putInResultStack } from '../../helpers/doubleClickFunction';
import { TypeCardFull, TypeDragItem } from '../../types';

import { Win } from './Win/Win';
import { Header } from './Header/Header';
import { Kard } from './Kard/Kard';
import { SectionGame, BodyGame, Stack } from './GameMainStyle';

export const GameMain = () => {
  const dispatch = useAppDispatch();
  const {
    sortCards,
    cards,
    gameCards,
    helperCards,
    isReady,
    onRules,
    resultStack,
    counter,
    moveCounter,
    isWin,
    dragOver,
    gamePoints,
    theBestPoints,
  } = useAppSelector((state) => state.solitaire);

  const [dragItem, setDragItem] = useState<TypeDragItem>();

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
  const stacks = [0, 1, 2, 3, 4, 5, 6];

  return (
    <SectionGame>
      <Header />
      <BodyGame>
        {onRules && <Rules fn={() => dispatch(setOnRulesAction(false))} />}
        {isWin && <Win newGame={() => startNewGame(dispatch, cards)} />}
        <Stack
          id="bank"
          onClick={() =>
            changeHelperCards(dispatch, helperCards, sortCards, moveCounter, gamePoints)
          }
        >
          {isReady &&
            sortCards.map((item) => (
              <Kard
                img={item.open ? item.img : shirt.src}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable={false}
              />
            ))}
        </Stack>
        <Stack id="helper">
          {helperCards.length > 0 &&
            helperCards.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={() => dragHandler(item, 8, gameCards)}
                onDoubleClick={() =>
                  putInResultStack(
                    dispatch,
                    item,
                    8,
                    resultStack,
                    helperCards,
                    gameCards,
                    moveCounter,
                    gamePoints,
                  )
                }
                onDragEnd={(e) =>
                  dropHandler(
                    e,
                    dispatch,
                    dragItem,
                    dragOver,
                    gameCards,
                    helperCards,
                    moveCounter,
                    resultStack,
                    gamePoints,
                  )
                }
              />
            ))}
        </Stack>
        {results.map((el) => {
          const id = Number(el);
          return (
            <Stack
              key={uuidv4()}
              id={el}
              onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
              onDrop={(e) =>
                dropHandler(
                  e,
                  dispatch,
                  dragItem,
                  id,
                  gameCards,
                  helperCards,
                  moveCounter,
                  resultStack,
                  gamePoints,
                )
              }
            >
              {resultStack[id].length > 0 &&
                resultStack[id].map((item: TypeCardFull) => (
                  <Kard
                    img={item.img}
                    name={item.nameCard}
                    position="stack"
                    key={item.id}
                    draggable
                    onDragStart={() => dragHandler(item, id, gameCards)}
                    onDrop={(e) =>
                      dropHandler(
                        e,
                        dispatch,
                        dragItem,
                        id,
                        gameCards,
                        helperCards,
                        moveCounter,
                        resultStack,
                        gamePoints,
                      )
                    }
                    onDragEnd={(e) =>
                      dropHandler(
                        e,
                        dispatch,
                        dragItem,
                        id,
                        gameCards,
                        helperCards,
                        moveCounter,
                        resultStack,
                        gamePoints,
                      )
                    }
                  />
                ))}
            </Stack>
          );
        })}
      </BodyGame>

      <BodyGame>
        {stacks.map((id) => (
          <Stack
            key={uuidv4()}
            id={String(id)}
            onDragOver={(e) => dragOverHandler(e, dispatch, id, dragOver)}
            onDrop={(e) =>
              dropHandler(
                e,
                dispatch,
                dragItem,
                id,
                gameCards,
                helperCards,
                moveCounter,
                resultStack,
                gamePoints,
              )
            }
            onDragEnd={(e) =>
              dropHandler(
                e,
                dispatch,
                dragItem,
                id,
                gameCards,
                helperCards,
                moveCounter,
                resultStack,
                gamePoints,
              )
            }
          >
            {isReady &&
              gameCards[id].map((item: TypeCardFull, index: number) => (
                <Kard
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={() => dragHandler(item, id, gameCards)}
                  onDragEnd={(e) =>
                    dropHandler(
                      e,
                      dispatch,
                      dragItem,
                      id,
                      gameCards,
                      helperCards,
                      moveCounter,
                      resultStack,
                      gamePoints,
                    )
                  }
                  onDrop={(e) =>
                    dropHandler(
                      e,
                      dispatch,
                      dragItem,
                      id,
                      gameCards,
                      helperCards,
                      moveCounter,
                      resultStack,
                      gamePoints,
                    )
                  }
                  onDoubleClick={() =>
                    putInResultStack(
                      dispatch,
                      item,
                      id,
                      resultStack,
                      helperCards,
                      gameCards,
                      moveCounter,
                      gamePoints,
                    )
                  }
                />
              ))}
          </Stack>
        ))}
      </BodyGame>
    </SectionGame>
  );
};
