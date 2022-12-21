import CellModel from "./CellModel";
import { Checker } from "./Checkers/Checker";
import { CheckerColor } from "./Checkers/CheckerColor";
import { CheckerType } from "./Checkers/CheckerType";
import { Colors } from "./Color";
import { Player } from "./Player";

export default class BoardModel {
  cells: CellModel[] = [];
  turnBy: Player | null = null;
  wasCapturing: boolean = false;
  winner: Player | null = null;

  private uncheckCapturable() {
    const capturableCells = this.findCapturable();
    for (let i = 0; i < capturableCells.length; i++) {
      capturableCells[i].capturable = false;
    }
  }

  private checkWinner() {
    if (this.turnBy === Player.BLACK) {
      for (let i = 0; i < this.cells.length; i++) {
        const checker = this.cells[i].checker;
        if (checker && checker.checkerColor === CheckerColor.BLACK && checker.canMoveSomewhere()) return;
      }

      this.winner = Player.WHITE;
    } 

    if (this.turnBy === Player.WHITE) {
      for (let i = 0; i < this.cells.length; i++) {
        const checker = this.cells[i].checker;
        if (checker && checker.checkerColor === CheckerColor.WHITE && checker.canMoveSomewhere()) return;
      }

      this.winner = Player.BLACK;
    }
  }

  findCapturable() {
    return this.cells.filter((c) => c.capturable);
  }

  initGame() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const isEvenRow = i % 2 !== 0;
        const isBlack = isEvenRow 
          ? j % 2 !== 0
          : j % 2 === 0;
        
        const cell = isBlack 
          ? new CellModel(j, i, Colors.BLACK, null, this) 
          : new CellModel(j, i, Colors.WHITE, null, this);

        const hasWhiteChecker = !isBlack && i * 8 + j < 24;
        const hasBlackChecker = !isBlack && i * 8 + j > 39;

        let checker;
        if (hasWhiteChecker) checker = new Checker(cell, CheckerType.CHECKER, CheckerColor.WHITE);
        else if (hasBlackChecker) checker = new Checker(cell, CheckerType.CHECKER, CheckerColor.BLACK);
        else checker = null;

        cell.checker = checker;

        this.cells.push(cell);
      }
    }
  }

  changeTurn() {
    this.turnBy = this.turnBy === Player.WHITE ? Player.BLACK : Player.WHITE;
    this.wasCapturing = false;
    this.checkWinner();
  }
  
  highlightCells(selectedCell: CellModel | null) {
    this.uncheckCapturable();
    for (let i = 0; i < this.cells.length; i++) {
      const target = this.cells[i];
      target.available = selectedCell?.checker?.canMove(target);
    }
  }

  getCopy(): BoardModel {
    const newBoard = new BoardModel();
    newBoard.cells = this.cells;
    for (let i = 0; i < newBoard.cells.length; i++) {
      newBoard.cells[i].board = newBoard;
    }
    newBoard.turnBy = this.turnBy;
    newBoard.wasCapturing = this.wasCapturing;
    newBoard.winner = this.winner;
    return newBoard;
  }

  getCell = (x: number, y: number): CellModel => 
    this.cells.find((c) => c.x === x && c.y === y);

  getWhiteScore = (): number => 
    12 - this.cells.filter((c) => c.checker?.checkerColor === CheckerColor.WHITE).length;
  
  getBlackScore = (): number =>
    12 - this.cells.filter((c) => c.checker?.checkerColor === CheckerColor.BLACK).length;
}
