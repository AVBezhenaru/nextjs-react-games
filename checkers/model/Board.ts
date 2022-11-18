import { Cell } from './Cell';
import { Colors } from './Colors';
import { Checker } from './figures/Checker';
import { CheckerQueen } from './figures/CheckerQueen';
import { Figure } from './figures/Figure';

export class Board {
  cells: Cell[][] = [];

  lostBlackFigure: Figure[] = [];

  lostWhiteFigure: Figure[] = [];

  initBoard() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigure = this.lostWhiteFigure;
    newBoard.lostBlackFigure = this.lostBlackFigure;
    return newBoard;
  }

  highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  highlightCellsColor() {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.figureDeleteColor = false;
      }
    }
  }

  getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  addChecker() {
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        new Checker(Colors.BLACK, this.getCell(i, 0));
        new Checker(Colors.WHITE, this.getCell(i, 6));
        new Checker(Colors.BLACK, this.getCell(i, 2));
      } else {
        new Checker(Colors.WHITE, this.getCell(i, 5));
        new Checker(Colors.BLACK, this.getCell(i, 1));
        new Checker(Colors.WHITE, this.getCell(i, 7));
      }
    }
  }

  addCheckerQueenWhite(i: number) {
    new CheckerQueen(Colors.WHITE, this.getCell(i, 0));
  }

  addCheckerQueenBlack(i: number) {
    new CheckerQueen(Colors.BLACK, this.getCell(i, 7));
  }

  addFigures() {
    this.addChecker();
  }
}
