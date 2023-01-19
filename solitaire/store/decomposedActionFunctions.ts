import { WritableDraft } from "immer/dist/internal";
import { cardsInGameName, openedCardsName, SolitaireState } from "./types";
import { cards } from "./cardsData";
import { mixCards } from "../helpers/mixCards";
import CardModel from "../models/CardModel";

const closeOpenedCards = (
  closedCards: WritableDraft<CardModel>[], 
  openedCards: WritableDraft<CardModel>[]
) => {
  const iterations = openedCards.length;
  for (let i = 0; i < iterations; i++) {
    const card = openedCards.shift();
    card.open = false;
    closedCards.unshift(card);
  }
}

export const popCardFromStack = (stack: WritableDraft<CardModel>[]) => stack.pop();

export const openLast = (stack: WritableDraft<CardModel>[]) => {
  if (stack.length) stack[stack.length - 1].open = true;
}

export const startNewGame = (state: WritableDraft<SolitaireState>) => {
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
}

export const canMoveToStack = (card: CardModel, stackedCards: WritableDraft<CardModel>[][]): number | undefined => {
  for (let i = 0; i < stackedCards.length; i++) {
    const stack = stackedCards[i];
    if (!stack.length) {
      if (card.name === 1) { // Ace
        return i;
      }
    } else {
      const stackLastCard = stack[stack.length - 1];
      if (stackLastCard.suit === card.suit && stackLastCard.name === card.name - 1) {
        return i;
      }
    }
  }

  return undefined;
}

export const canMoveToIngameStack = (card: CardModel, cardsInGame: WritableDraft<CardModel>[]): boolean => {
  if (cardsInGame.length === 0) {
    return card.name === 13;
  }

  const lastStackCard = cardsInGame[cardsInGame.length - 1];
  return lastStackCard.color !== card.color && lastStackCard.name === card.name + 1;
}

export const openNextCard = (closedCards: WritableDraft<CardModel>[], openedCards: WritableDraft<CardModel>[]) => {
  if (!closedCards.length) {
    closeOpenedCards(closedCards, openedCards);
    return;
  }

  const card = closedCards.pop();
  card.open = true;
  openedCards.push(card);
}

export const moveCardToStacked = (
  card: CardModel,
  stackedCards: WritableDraft<CardModel>[][],
  openedCards: WritableDraft<CardModel>[],
  cardsInGame: WritableDraft<CardModel>[][],
  startStackIndex: number,
  startStackName: string,
): boolean => {
  const stack = canMoveToStack(card, stackedCards);
  if (stack === undefined) return false;

  if (startStackName === openedCardsName) {
    stackedCards[stack].push(popCardFromStack(openedCards));
  }

  if (startStackName === cardsInGameName) {
    stackedCards[stack].push(popCardFromStack(cardsInGame[startStackIndex]));
    openLast(cardsInGame[startStackIndex]);
  }

  return true;
}
