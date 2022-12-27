import { DragEventHandler, MouseEventHandler } from 'react';

export type TypeCard = {
  style?: object;
  img: string;
  name: number;
  position: string;
  draggable: boolean;
  onDragStart?: DragEventHandler;
  onDragLeave?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onDoubleClick?: MouseEventHandler;
};

export interface TypeCardFull {
  id: number;
  nameCard: number;
  suit: string;
  img: string;
  open: boolean;
  color: string;
}

export interface TypeDataCardsState {
  cards: TypeCardFull[];
  sortCards: TypeCardFull[];
}

export enum CardsActionTypes {
  CHANGE_IS_OPEN = 'CHANGE_IS_OPEN',
  SORT_CARDS = 'SORT_CARDS',
}

interface TypeActionCardsIsOpen {
  type: CardsActionTypes.CHANGE_IS_OPEN;
  payload: boolean;
}

interface TypeSortCards {
  type: CardsActionTypes.SORT_CARDS;
  payload?: TypeCardFull[];
}

export type TypeActions = TypeActionCardsIsOpen | TypeSortCards;
