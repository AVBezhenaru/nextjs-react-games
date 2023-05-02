import CardModel from '../models/CardModel';

export const stackedCardsName = 'stacked';
export const cardsInGameName = 'in-game';
export const openedCardsName = 'opened';

export type SolitaireState = {
  openedCards: CardModel[];
  closedCards: CardModel[];
  cardsInGame: CardModel[][];
  stackedCards: CardModel[][];
  moveCounter: number;
  bestPoints: number;
  gamePoints: number;
};

export type DoubleClickPayload = {
  card: CardModel;
  stackIndex?: number;
  stackName: string;
};

export type DragEndPayload = {
  endStackIndex?: number;
  dragged: Dragged;
};

export type DragOverItem = {
  index: number;
  name: string;
};

export type Dragged = {
  cards: CardModel[];
  startStackIndex: number;
  startStackName: string;
};
