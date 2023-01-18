import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mixCards } from "../helpers/mixCards";
import { cards } from "./cardsData";
import { cardsInGameName, DoubleClickPayload, DragEndPayload, openedCardsName, SolitaireState, stackedCardsName } from "./types";

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
    startGame(state) {
      state.moveCounter = 0;
      state.bestPoints = state.bestPoints > state.gamePoints ? state.bestPoints : state.gamePoints;
      state.gamePoints = 0;
      state.openedCards = [];
      state.stackedCards = [ [], [], [], [] ];
      const mixedCards = mixCards(JSON.parse(JSON.stringify(cards)));

      let deckPointer = 0;
      for (let i = 0; i < 7; i++) {
        state.cardsInGame[i] = [];
        for (let j = 0; j <= i; j++, deckPointer++) {
          const card = mixedCards[deckPointer];
          card.open = j === i;
          state.cardsInGame[i].push(card);
        }
      }
      state.closedCards = [];
      for (let i = deckPointer; i < 52; i++) {
        state.closedCards.push(mixedCards[i]);
      }
    },
    cardDoubleClick({ stackedCards, openedCards, cardsInGame }, { payload: { card } }: PayloadAction<DoubleClickPayload>) {
      if (!card.open) return;
      
      const popCard = () => {
        const openedCardsLength = openedCards.length;
        if (openedCardsLength && openedCards[openedCards.length - 1].id === card.id) {
          openedCards.pop();
        }

        for (let i = 0; i < cardsInGame.length; i++) {
          const ingameStack = cardsInGame[i]
          const ingameStackLength = ingameStack.length;
          if (ingameStackLength && ingameStack[ingameStackLength - 1].id === card.id) {
            ingameStack.pop();
            if (ingameStackLength - 2 >= 0) {
              ingameStack[ingameStackLength - 2].open = true;
            }
            break;
          }
        }
      }

      if (card.name === 1) { //Ace
        for (let i = 0; i < stackedCards.length; i++) {
          const stack = stackedCards[i];
          if (!stack.length) {
            stack.push(card);
            popCard();
            return;
          }
        }
      }

      for (let i = 0; i < stackedCards.length; i++) {
        const stack = stackedCards[i];
        if (!stack.length) continue;

        const stackLastCard = stack[stack.length - 1]
        if (stackLastCard.suit === card.suit && stackLastCard.name === card.name - 1) {
          stack.push(card);
          popCard();
          return;
        }
      }
    },
    openCard(state) {
      if (!state.closedCards.length) {
        for (let i = 0; i < state.openedCards.length; i++) {
          state.openedCards[i].open = false;
        }

        state.closedCards = [...state.openedCards.reverse()];
        state.openedCards = [];
        return;
      }

      const card = state.closedCards.pop();
      card.open = true;
      state.openedCards.push(card);
    },
    dragEndOnGameCards(state, { payload: { endStackIndex, dragged: { cards, startStackIndex, startStackName } } }: PayloadAction<DragEndPayload>) {

    },
    dragEndOnStacked(state, { payload: {  endStackIndex, dragged: { cards, startStackIndex, startStackName } } }: PayloadAction<DragEndPayload>) {
      if (cards.length !== 1) return;
      const draggedCard = cards[0];

      const dropCard = () => {
        state.stackedCards[endStackIndex].push(draggedCard);
        switch (startStackName) {
          case openedCardsName:
            state.openedCards = state.openedCards.filter((c) => c.id !== draggedCard.id);
            break;
          case cardsInGameName:
            state.cardsInGame[startStackIndex] = state.cardsInGame[startStackIndex].filter((c) => c.id !== draggedCard.id);
            state.cardsInGame[startStackIndex][state.cardsInGame[startStackIndex].length - 1].open = true;
            break;
          case stackedCardsName:
            state.stackedCards[startStackIndex] = state.stackedCards[startStackIndex].filter((c) => c.id !== draggedCard.id);
            break;
        }
      }

      if (state.stackedCards[endStackIndex].length === 0) {
        if (draggedCard.name === 1) { //Ace
          dropCard();
        }
        return;
      }

      const lastStackCard = state.stackedCards[endStackIndex][state.stackedCards[endStackIndex].length - 1];
      if (lastStackCard.suit === draggedCard.suit && lastStackCard.name === draggedCard.name - 1) {
        dropCard();
      }
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
