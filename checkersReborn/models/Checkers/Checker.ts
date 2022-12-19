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

  private canMoveWhiteChecker(target: CellModel): boolean {
    if (!target.checker) {
      // move
      if (this.cell.y + 1 === target.y) {
        if (this.cell.x + 1 === target.x || this.cell.x - 1 === target.x)
          return true;
      }

      // capturing
      if (this.cell.y + 2 === target.y || this.cell.y - 2 === target.y) {
        if (this.cell.x + 2 === target.x || this.cell.x - 2 === target.x)
          return this.cell.hasBlackBetween(target);
      }
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
      if (this.cell.y + 2 === target.y || this.cell.y - 2 === target.y) {
        if (this.cell.x + 2 === target.x || this.cell.x - 2 === target.x) 
          return this.cell.hasWhiteBetween(target);
      }
    }

    return false;
  }

  private canMoveWhiteKing(target: CellModel): boolean {

    return true;
  }

  private canMoveBlackKing(target: CellModel): boolean {
    
    return true;
  }

  private canMoveChecker(target: CellModel): boolean {
    return this.checkerColor === CheckerColor.WHITE
      ? this.canMoveWhiteChecker(target)
      : this.canMoveBlackChecker(target);
  }

  private canMoveKing(target: CellModel): boolean {
    return this.checkerColor === CheckerColor.WHITE
      ? this.canMoveWhiteKing(target)
      : this.canMoveBlackKing(target);
  }

  canMove(target: CellModel): boolean {
    if (target.checker || target.color === Colors.BLACK) return false;

    return this.checkerType === CheckerType.KING 
      ? this.canMoveKing(target)
      : this.canMoveChecker(target);
  }

  moveChecker(target: CellModel) {
    this.cell = target;
  }
}
