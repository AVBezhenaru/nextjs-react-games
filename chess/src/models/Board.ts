import { Cell } from './Cell';
import { Colors } from './Colors';
import { Queen } from './figures/Queen';
import { Pawn } from './figures/Pawn';
import { Bishop } from './figures/Bishop';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Rook } from './figures/Rook';
import { Figure } from './figures/Figure';

interface TransformData {
  shouldTransform: boolean;
  figure: Figure | null;
}

interface HistoryMoveData {
  figureData: Figure | null;
  moveData: string;
  // eatFigureData: string | null;
  eatFigureData: any; // временная подмена из-за линтера
  check: boolean;
}
export class Board {
  cells: Cell[][] = [];

  lostWhiteFigures: Figure[] = [];

  lostBlackFigures: Figure[] = [];

  blackKing: King | null = null;

  whiteKing: King | null = null;

  stalemate = false; // проверка на пат

  transformData: TransformData = {
    shouldTransform: false,
    figure: null,
  };

  historyMove: HistoryMoveData[] = [];

  public addFigureToLost(figure: Figure) {
    if (figure.color === Colors.WHITE) {
      this.lostWhiteFigures.push(figure);
    } else {
      this.lostBlackFigures.push(figure);
    }
  }

  public initCells() {
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

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        row[j].board = newBoard;
      }
    }
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.transformData = this.transformData;
    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;
    newBoard.stalemate = this.stalemate;
    newBoard.historyMove = this.historyMove;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  canAttackKing(kingColor: Colors) {
    const kingToCheck = kingColor === Colors.BLACK ? this.blackKing! : this.whiteKing!;
    kingToCheck.underAttackKing = false;

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = this.getCell(j, i);
        if (target.figure != null && target?.figure?.color !== kingToCheck.color) {
          // Определили вражеские фигуры
          if (target.figure?.canMove(kingToCheck.cell, true)) {
            kingToCheck.underAttackKing = true;
            break;
          }
        }
      }
    }
  }

  checkForCheckMate(kingToCheck: King) {
    let canSaveKing = false;
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = this.getCell(j, i);
        if (target.figure != null && target?.figure?.color === kingToCheck.color) {
          for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
              const checkCell = row[j];
              if (target.figure?.canMove(checkCell)) {
                canSaveKing = true;
                break;
              }
            }
          }
        }
      }
    }
    return !canSaveKing;
  }

  checkForStalemate() {
    // проверка на пат
    let counter = 0;
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = this.getCell(j, i);
        if (target.figure) {
          counter++;
          if (counter > 2) {
            return false;
          }
        }
      }
    }
    this.stalemate = true;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addKings() {
    this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
    this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
  }

  public addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
  }
}
