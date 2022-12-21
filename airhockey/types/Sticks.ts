export interface IStick {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  dx: number;
  dy: number;
  score: number;
}

export interface IStickParams {
  clickDown?: boolean;
  clickUp?: boolean;
  speed: number;
}
