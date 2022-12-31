export default class CellModel {
  x: number;
  y: number;
  hasFigure: boolean;
  filled: boolean;

  constructor(x: number, y: number, hasFigure = false) {
    this.x = x;
    this.y = y;
    this.hasFigure = hasFigure;
  }

}