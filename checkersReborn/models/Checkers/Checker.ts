import BoardModel from "../BoardModel";
import CellModel from "../CellModel";
import { CheckerColor } from "./CheckerColor";
import { CheckerType } from "./CheckerType";

export class Checker {
  checkerType: CheckerType;
  checkerColor: CheckerColor;

  board: BoardModel;

  constructor(board: BoardModel, checkerType: CheckerType, checkerColor: CheckerColor) {
    this.board = board;
    this.checkerType = checkerType;
    this.checkerColor = checkerColor;
  }

  canMove(cell: CellModel) {
    if (cell.checker?.checkerType)
    return true;
  }

  moveChecker(target: CellModel) {

  }
}
