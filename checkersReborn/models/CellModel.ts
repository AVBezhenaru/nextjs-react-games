import BoardModel from "./BoardModel";
import { Checker } from "./Checkers/Checker";
import { CheckerColor } from "./Checkers/CheckerColor";
import { Colors } from "./Color";

export default class CellModel {
  readonly color: Colors;
  readonly x: number;
  readonly y: number;

  checker: Checker | null;
  available: boolean;
  board: BoardModel;

  constructor(
    x: number,
    y: number,
    color: Colors,
    checker: Checker,
    board: BoardModel
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.checker = checker;
    this.board = board;
  }

  canBeCaptured(): boolean {
    return true;
  }

  hasBlackBetween(target: CellModel): boolean {
    const x = (this.x + target.x) / 2;
    const y = (this.y + target.y) / 2;

    const cell = this.board.getCell(x, y);
    if (cell.checker?.checkerColor === CheckerColor.BLACK) return true;
    return false;
  }

  hasWhiteBetween(target: CellModel): boolean {
    const x = (this.x + target.x) / 2;
    const y = (this.y + target.y) / 2;

    const cell = this.board.getCell(x, y);
    if (cell.checker?.checkerColor === CheckerColor.WHITE) return true;
    return false;
  }

  moveChecker(target: CellModel) {
    if (this.checker && this.checker.canMove(target)) {
      this.checker.moveChecker(target);
      target.checker = this.checker;
      this.checker = null;
    }
  }
}