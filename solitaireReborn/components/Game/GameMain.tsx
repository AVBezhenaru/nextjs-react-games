import React, { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';

import { Win } from './Win/Win';
import { Header } from './Header/Header';
import { SectionGame, BodyGame, Stack } from './GameMainStyle';
import { cardDoubleClick, dragEndOnGameCards, dragEndOnStacked, openCard, startGame } from '../../store/solitaireSlice';
import { Card } from './Card/Card';
import { cardsInGameName, Dragged, DragOverItem, openedCardsName, stackedCardsName } from '../../store/types';
import CardModel from '../../models/CardModel';

export const GameMain: FC = () => {
  const {
    closedCards,
    cardsInGame,
    openedCards,
    stackedCards,
  } = useAppSelector((state) => state.solitaireReborn);

  const dispatch = useAppDispatch();

  const [showRules, setShowRules] = useState<boolean>(true);
  const [win, setWin] = useState(false);

  const startNewGame = () => {
    setWin(false);
    dispatch(startGame());
  }

  useEffect(() => {
    dispatch(startGame())
  }, []);

  const dragOverItem = useRef<DragOverItem>();
  const dragged = useRef<Dragged>();

  const dragStart = (cards: CardModel[], index: number, name: string) => {
    dragged.current = { cards, startStackIndex: index, startStackName: name };
  }

  const dragOver = (index: number, name: string) => {
    if (
      !dragOverItem.current 
      || dragOverItem.current.index !== index 
      || dragOverItem.current.name !== name
    ) {
      dragOverItem.current = { index, name };
    }
  }

  const dragEnd = () => {
    if (!dragOverItem.current) return;
    
    switch (dragOverItem.current.name) {
      case cardsInGameName: {
        dispatch(dragEndOnGameCards({ endStackIndex: dragOverItem.current.index, dragged: dragged.current }));
        break;
      } 
      case stackedCardsName: {
        dispatch(dragEndOnStacked({ dragged: dragged.current }));
        break;
      }
    }

    dragOverItem.current = null;
    dragged.current = null;
  }

  const closedCardsList = closedCards.map((item) => (
    <Card
      img={shirt.src}
      name={item.name}
      stacked
      key={item.id}
      draggable={false}
    />
  ));

  const openedCardsList = openedCards.map((item) => (
    <Card
      img={item.img}
      name={item.name}
      stacked
      key={item.id}
      draggable
      onDragStart={() => dragStart([item], 0, openedCardsName)}
      onDragEnd={dragEnd}
      onDoubleClick={() => dispatch(cardDoubleClick({ card: item, stackName: openedCardsName }))}
    />
  ));
  
  const stackedCardsList = stackedCards.map((stack, index) => {
    const stackCards = stack.map((item) => (
      <Card
        img={item.img}
        name={item.name}
        stacked
        key={item.id}
        draggable
        onDragStart={() => dragStart([item], index, stackedCardsName)}
        onDragEnd={dragEnd}
      />
    ));

    return (
      <Stack
        key={uuid()}
        id={String(index)}
        onDragOver={() => dragOver(index, stackedCardsName)}
      >
        {stackCards}
      </Stack>
    );
  });

  const cardsInGameList = cardsInGame.map((stack, index) => {
    const stackCards = stack.map((item, cardIndex) => (
      <Card
        img={item.open ? item.img : shirt.src}
        name={item.name}
        stacked={false}
        key={item.id}
        draggable={item.open}
        onDragStart={() => dragStart(stack.slice(cardIndex, stack.length), index, cardsInGameName)}
        onDragEnd={dragEnd}
        onDoubleClick={() => dispatch(cardDoubleClick({ card: item, stackName: cardsInGameName, stackIndex: index }))}
      />
    ));

    return (
      <Stack
        key={uuid()}
        id={String(index)}
        onDragOver={() => dragOver(index, cardsInGameName)}
      >
        {stackCards}
      </Stack>
    );
  });

  return (
    <SectionGame>
      <Header showRules={() => setShowRules(true)} />
      <BodyGame>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
        {win && <Win newGame={startNewGame} />}
        <Stack
          id="bank"
          onClick={() => dispatch(openCard())}
        >
          {closedCardsList}
        </Stack>
        <Stack id="helper">
          {openedCardsList}
        </Stack>
        {stackedCardsList}
      </BodyGame>
      <BodyGame>
        {cardsInGameList}
      </BodyGame>
    </SectionGame>
  );
};
