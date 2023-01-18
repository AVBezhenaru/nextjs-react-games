import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CardModel from "../models/CardModel";
import { 
  openNextCard, 
  startNewGame, 
  popCardFromStack, 
  openLast, 
  moveCardToStacked, 
  canMoveToIngameStack 
} from "./decomposedActionFunctions";
import {
  cardsInGameName,
  DoubleClickPayload, 
  DragEndPayload,
  openedCardsName,
  SolitaireState,
  stackedCardsName,
} from "./types";

const initialState: SolitaireState = {
  openedCards: [],
  closedCards: [],
  cardsInGame: [],
  stackedCards: [],
  moveCounter: 0,
  bestPoints: 0,
  gamePoints: 0,
}

const solitaireReborn = createSlice({
  name: 'solitaireReborn',
  initialState,
  reducers: {
    startGame(state)  {
      startNewGame(state);
    },
    cardDoubleClick({ stackedCards, openedCards, cardsInGame }, { payload: { card, stackIndex, stackName } }: PayloadAction<DoubleClickPayload>) {
      if (!card.open) return;

      moveCardToStacked(
        card,
        stackedCards,
        openedCards,
        cardsInGame,
        stackIndex,
        stackName
      );
    },
    openCard({ closedCards, openedCards }) {
      openNextCard(closedCards, openedCards);
    },
    dragEndOnGameCards(
      { stackedCards, openedCards, cardsInGame }, 
      { payload: { 
        endStackIndex, 
        dragged: { 
          cards, 
          startStackIndex, 
          startStackName 
        }}
      }: PayloadAction<DragEndPayload>
    ) {
      if (!cards.length) return;
      const topCard = cards[0];
      let startStack;
      const endStack = cardsInGame[endStackIndex];
      if (canMoveToIngameStack(topCard, endStack)) {
        if (startStackName === cardsInGameName) {
          startStack = cardsInGame[startStackIndex];
        }

        if (startStackName === openedCardsName) {
          startStack = openedCards;
        }

        if (startStackName === stackedCardsName) {
          startStack = stackedCards[startStackIndex];
        }

        const tempArr: CardModel[] = [];
        for (let i = 0; i < cards.length; i++) {
          tempArr.unshift(popCardFromStack(startStack));
        }
        endStack.push(...tempArr);
        openLast(startStack);
      }
    },
    dragEndOnStacked(
      { cardsInGame, stackedCards, openedCards }, 
      { payload: { 
        dragged: { 
          cards, 
          startStackIndex, 
          startStackName 
        }} 
      }: PayloadAction<DragEndPayload>
    ) {
      if (cards.length !== 1) return;
      const card = cards[0];
      if (!card.open) return;

      moveCardToStacked(
        card,
        stackedCards,
        openedCards,
        cardsInGame,
        startStackIndex,
        startStackName
      );
    }
  }
});

export const {
  startGame,
  cardDoubleClick,
  openCard,
  dragEndOnGameCards,
  dragEndOnStacked,
} = solitaireReborn.actions;

export default solitaireReborn.reducer;
