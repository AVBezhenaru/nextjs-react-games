import BoardModel from "./BoardModel";
import { Checker } from "./Checkers/Checker";
import { CheckerType } from "./Checkers/CheckerType";
import { Colors } from "./Color";
import { MoveDirection } from "./MoveDirection";

export default class CellModel {
  readonly color: Colors;
  readonly x: number;
  readonly y: number;

  checker: Checker | null;
  available: boolean;
  capturable: boolean;
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

  private removeChecker() {
    this.checker = null;
  }

  private checkCapturing(target: CellModel): boolean {
    const cellsToRemoveCheckerInside = this.findCheckersBetween(target);
    for (let i = 0; i < cellsToRemoveCheckerInside.length; i++) {
      cellsToRemoveCheckerInside[i].removeChecker();
    }

    return cellsToRemoveCheckerInside.length !== 0;
  }

  private defineMoveDirection(target: CellModel): MoveDirection {
    if (this.x < target.x) {
      if (this.y < target.y) return MoveDirection.RIGHT_BOTTOM;
      if (this.y > target.y) return MoveDirection.RIGHT_TOP;
    }

    if (this.x > target.x) {
      if (this.y < target.y) return MoveDirection.LEFT_BOTTOM;
      if (this.y > target.y) return MoveDirection.LEFT_TOP;
    }

    return MoveDirection.IMPOSSIBLE;
  }

  private getCellWithCheckerOnDiagonalOnPosition(x: number, y: number): CellModel | null {
    if (!this.onSameDiagonalWith(x, y)) return null;
    const cell = this.board.getCell(x, y);
    if (cell.checker) return cell;
  }
  
  private findCheckersBetween(target: CellModel): CellModel[] | null {
    const moveDirection = this.defineMoveDirection(target);
    
    const result: CellModel[] = [];
    switch (moveDirection) {
      case MoveDirection.RIGHT_TOP: {
        for (let i = this.x + 1; i < target.x; i++) {
          for (let j = this.y - 1; j > target.y; j--) {
            const cell = this.getCellWithCheckerOnDiagonalOnPosition(i, j);
            if (cell) result.push(cell);
          }
        }
        return result;
      }
      case MoveDirection.RIGHT_BOTTOM: {
        for (let i = this.x + 1; i < target.x; i++) {
          for (let j = this.y + 1; j < target.y; j++) {
            const cell = this.getCellWithCheckerOnDiagonalOnPosition(i, j);
            if (cell) result.push(cell);
          }
        }
        return result;
      }
      case MoveDirection.LEFT_BOTTOM: {
        for (let i = this.x - 1; i > target.x; i--) {
          for (let j = this.y + 1; j < target.y; j++) {
            const cell = this.getCellWithCheckerOnDiagonalOnPosition(i, j);
            if (cell) result.push(cell);
          }
        }
        return result;
      }
      case MoveDirection.LEFT_TOP: {
        for (let i = this.x - 1; i > target.x; i--) {
          for (let j = this.y - 1; j > target.y; j--) {
            const cell = this.getCellWithCheckerOnDiagonalOnPosition(i, j);
            if (cell) result.push(cell);
          }
        }
        return result;
      }
      default:
        return null;
    }
  }

  private hasOneEnemyBetweenAndCanMove(target: CellModel): boolean {
    const checkersBetween = this.findCheckersBetween(target);

    if (!checkersBetween || checkersBetween.length !== 1) return false;

    const canBeCaptured = checkersBetween[0];
    canBeCaptured.capturable = canBeCaptured.checker.checkerColor !== this.checker.checkerColor;
    return canBeCaptured.capturable;
  }

  private hasOneEnemyOrZeroBetweenAndCanMove(target: CellModel): boolean {
    const checkersBetween = this.findCheckersBetween(target);

    if (!checkersBetween || checkersBetween.length > 1) return false;
    if (checkersBetween.length === 0) {
      return !this.board.wasCapturing;
    } 

    const canBeCaptured = checkersBetween[0];
    canBeCaptured.capturable = canBeCaptured.checker.checkerColor !== this.checker.checkerColor;
    return canBeCaptured.capturable;
  }

  private canCaptureMore(): boolean {
    this.board.highlightCells(this);
    const capturable = this.board.findCapturable();
    return capturable.length !== 0;
  }

  onSameDiagonalWith(x: number, y: number): boolean {
    const absX = Math.abs(this.x - x);
    const absY = Math.abs(this.y - y);
    return absX === absY;
  }

  canMove(target: CellModel): boolean {
    switch (this.checker.checkerType) {
      case CheckerType.CHECKER:
        return this.hasOneEnemyBetweenAndCanMove(target);
      case CheckerType.KING:
        return this.hasOneEnemyOrZeroBetweenAndCanMove(target);
      default:
        return false;
    }
  }

  moveChecker(target: CellModel): CellModel | null {
    if (this.checker && this.checker.canMove(target)) {
      const captured = this.checkCapturing(target);
      this.checker.moveChecker(target);

      target.checker = this.checker;
      this.checker = null;

      if (!captured) {
        this.board.changeTurn();
        return null;
      }
      else {
        this.board.wasCapturing = true;
        if (target.canCaptureMore()) return target;

        this.board.changeTurn();
        return null;
      }
    }
  }
}
