export interface Fruit {
  id: string;
  type: string;
  x: number;
  y: number;
  isSliced: boolean;
  speed?: number;
}

export interface GameProps {
  onFruitSliced?: () => void;
  score: number;
}

export interface BoardProps {
  type: string;
  x: number;
  y: number;
  isSliced: boolean;
  onMouseMove: () => void;
  score: number;
}
