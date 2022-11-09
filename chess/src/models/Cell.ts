import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { Board } from "./Board";
import { King } from "./figures/King";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;   // highlight cell if there is figure and this figure is our
  underAttack: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false; // свойство у ячейки будет true если выбранная фигура может походить на эту ячейку, false - не может
    this.underAttack = false
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isLastCell(figure: Figure) {
    if (figure.name === FigureNames.PAWN && (figure.cell.y === 0 || figure.cell.y === 7)) {
      this.board.transformData.shouldTransform = true
      this.board.transformData.figure = figure
    }
  }


  setHistoryMove(startCell: Cell, endCell: Cell, eatFigure: Figure | null) {
    const figure = endCell.figure
    const startX = startCell.x
    const startY = startCell.y
    const endX = endCell.x
    const endY = endCell.y
    const column = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const row = ['0', '1', '2', '3', '4', '5', '6', '7']
    const step = `${column[startX]}${Math.abs(Number(row[startY]) - 8)} - ${column[endX]}${Math.abs(Number(row[endY]) - 8)}`
    const check = this.board.whiteKing?.underAttackKing || this.board.blackKing?.underAttackKing ? true : false
    this.board.historyMove.push({ figureData: figure, moveData: step, eatFigureData: eatFigure?.logo, check })
  }



  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    let eatFigureFlag = false
    let eatFigure = null
    let figure = this.figure // фигура внутри ячейки
    if (figure && figure?.canMove(target)) {
      figure.moveFigure(target);
      if (target.figure) {
        this.board.addFigureToLost(target.figure);
        eatFigureFlag = true
        eatFigure = target.figure
      }
      target.setFigure(figure);
      this.figure = null;

      if (eatFigureFlag) this.board.checkForStalemate() //проверка патовой ситуации

      this.isLastCell(figure)

      this.board.canAttackKing(Colors.BLACK)
      this.board.canAttackKing(Colors.WHITE)
      this.setHistoryMove(this, target, eatFigure)
      const opponentKing = figure.color === Colors.WHITE ? this.board.blackKing : this.board.whiteKing
      if (opponentKing?.underAttackKing) {
        opponentKing.chekAndMateFlag = !!this.board.checkForCheckMate(opponentKing) //проверка на шах и мат
      }

    }
  }
}