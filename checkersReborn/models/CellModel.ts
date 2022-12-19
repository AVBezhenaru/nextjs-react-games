import { Checker } from "./Checkers/Checker";
import { Colors } from "./Color";

export default class CellModel {
  readonly color: Colors;
  readonly x: number;
  readonly y: number;

  checker: Checker | null;
  available: boolean;

  constructor(
    x: number,
    y: number,
    color: Colors,
    checker: Checker
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.checker = checker;
  }

  moveChecker(target: CellModel) {
    if (this.checker && this.checker.canMove(target)) {
      this.checker.moveChecker(target);
      target.checker = this.checker;
      this.checker = null;
    }
  }
}