import CellModel from "./CellModel";
import { Checker } from "./Checkers/Checker";
import { CheckerColor } from "./Checkers/CheckerColor";
import { CheckerType } from "./Checkers/CheckerType";
import { Colors } from "./Color";

export default class BoardModel {
  cells: CellModel[] = [];

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
  
  highlightCells(selectedCell: CellModel | null) {
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
    return newBoard;
  }

  getCell = (x: number, y: number): CellModel => 
    this.cells.find((c) => c.x === x && c.y === y);

  getWhiteScore = (): number => 
    12 - this.cells.filter((c) => c.checker?.checkerColor === CheckerColor.WHITE).length;
  
  getBlackScore = (): number =>
    12 - this.cells.filter((c) => c.checker?.checkerColor === CheckerColor.BLACK).length;
}
