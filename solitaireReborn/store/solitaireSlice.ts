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

const calcGamePoints = (points: number, pointsToAdd: number, condition?: boolean): number => {
  if (condition) return points + pointsToAdd;
  
  return points > 0 ? points - 5 : 0;
}

const solitaireReborn = createSlice({
  name: 'solitaireReborn',
  initialState,
  reducers: {
    startGame(state)  {
      startNewGame(state);
    },
    cardDoubleClick(state, { payload: { card, stackIndex, stackName } }: PayloadAction<DoubleClickPayload>) {
      if (!card.open) return;

      state.moveCounter += 1;
      const moved = moveCardToStacked(
        card,
        state.stackedCards,
        state.openedCards,
        state.cardsInGame,
        stackIndex,
        stackName
      );

      state.gamePoints = calcGamePoints(state.gamePoints, 60, moved);
    },
    openCard(state) {
      state.moveCounter += 1;
      openNextCard(state.closedCards, state.openedCards);
      state.gamePoints = calcGamePoints(state.gamePoints, 0);
    },
    dragEndOnGameCards(
      state, 
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
      const endStack = state.cardsInGame[endStackIndex];
      const canMove = canMoveToIngameStack(topCard, endStack);
      if (canMove) {
        if (startStackName === cardsInGameName) {
          startStack = state.cardsInGame[startStackIndex];
        }

        if (startStackName === openedCardsName) {
          startStack = state.openedCards;
        }

        if (startStackName === stackedCardsName) {
          startStack = state.stackedCards[startStackIndex];
        }

        const tempArr: CardModel[] = [];
        for (let i = 0; i < cards.length; i++) {
          tempArr.unshift(popCardFromStack(startStack));
        }
        endStack.push(...tempArr);
        openLast(startStack);
      }
      state.gamePoints = calcGamePoints(state.gamePoints, 15, canMove);
    },
    dragEndOnStacked(
      state, 
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

      const moved = moveCardToStacked(
        card,
        state.stackedCards,
        state.openedCards,
        state.cardsInGame,
        startStackIndex,
        startStackName
      );

      state.gamePoints = calcGamePoints(state.gamePoints, 60, moved);
    },
    gameOverWithWin(state) {
      state.bestPoints = state.bestPoints > state.gamePoints ? state.bestPoints : state.gamePoints;
    }
  }
});

export const {
  startGame,
  cardDoubleClick,
  openCard,
  dragEndOnGameCards,
  dragEndOnStacked,
  gameOverWithWin,
} = solitaireReborn.actions;

export default solitaireReborn.reducer;
