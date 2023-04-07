export interface BlockInterface {
  type: string;
  posX: number;
  posY: number;
}

export interface ActionInterface {
  type: string;
  payload?: never;
}
