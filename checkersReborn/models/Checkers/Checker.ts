import { Colors } from "../../../checkers/model/Colors";
import CellModel from "../CellModel";
import { CheckerColor } from "./CheckerColor";
import { CheckerType } from "./CheckerType";

export class Checker {
  checkerType: CheckerType;
  checkerColor: CheckerColor;

  cell: CellModel;

  constructor(cell: CellModel, checkerType: CheckerType, checkerColor: CheckerColor) {
    this.cell = cell;
    this.checkerType = checkerType;
    this.checkerColor = checkerColor;
  }

  private canJumpWithCapturing(target: CellModel): boolean {
    if (this.cell.y + 2 === target.y || this.cell.y - 2 === target.y) 
      if (this.cell.x + 2 === target.x || this.cell.x - 2 === target.x)
        return this.cell.canMove(target);
  }

  private canMoveWhiteChecker(target: CellModel): boolean {
    if (!target.checker) {
      // move
      if (this.cell.y + 1 === target.y) {
        if (this.cell.x + 1 === target.x || this.cell.x - 1 === target.x)
          return true;
      }

      // capturing
      return this.canJumpWithCapturing(target);
    }

    return false;
  }

  private canMoveBlackChecker(target: CellModel): boolean {
    if (!target.checker) {
      // move
      if (this.cell.y - 1 === target.y) {
        if (this.cell.x + 1 === target.x || this.cell.x - 1 === target.x)
          return true;
      }

      // capturing 
      return this.canJumpWithCapturing(target);
    }

    return false;
  }

  private canMoveKing(target: CellModel): boolean {
    if (!target.checker && this.cell.onSameDiagonalWith(target.x, target.y))
      return this.cell.canMove(target);

    return false;
  }

  private canMoveChecker(target: CellModel): boolean {
    return this.checkerColor === CheckerColor.WHITE
      ? this.canMoveWhiteChecker(target)
      : this.canMoveBlackChecker(target);
  }

  private makeKing() {
    this.checkerType = CheckerType.KING;
  }

  canMove(target: CellModel): boolean {
    if (target.checker || target.color === Colors.BLACK) return false;

    return this.checkerType === CheckerType.KING 
      ? this.canMoveKing(target)
      : this.canMoveChecker(target);
  }

  moveChecker(target: CellModel) {
    this.cell = target;

    if (this.checkerType === CheckerType.KING) return;
    if (this.checkerColor === CheckerColor.BLACK && target.y === 0) this.makeKing();
    if (this.checkerColor === CheckerColor.WHITE && target.y === 7) this.makeKing();
  }
}
