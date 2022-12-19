/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;

  readonly y: number;

  readonly color: Colors;

  figure: Figure | null;

  board: Board;

  available: boolean;

  id: number;

  figureDeleteColor: boolean;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.figureDeleteColor = false;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  // ? движение королевы
  isEmptyDiagonal(target: Cell, figureElement: Figure | null): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false;

    if (figureElement?.color === 'white') {
      if (target.x === this.x - absX && target.y === this.y + absY) {
        const absX2 = Math.abs(target.x - this.x);
        const absY2 = Math.abs(target.y - this.y);
        if (absY2 !== absX2) return false;

        const dy2 = this.y < target.y ? 1 : -1;
        const dx2 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY2; i++) {
          if (
            !this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isFigure()?.color === 'black'
          ) {
            if (
              target.x === this.x + dx2 * i - 1 &&
              target.y === this.y + dy2 * i + 1 &&
              this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty() &&
              (this.x + dx2 * i - 2 <= 7 && this.y + dy2 * i + 2 <= 7
                ? !this?.board?.getCell(this.x + dx2 * i - 2, this.y + dy2 * i + 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx2 * i, this.y + dy2 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx2 * i - 2 <= 7 && this.y + dy2 * i + 2 <= 7
                ? !this.board.getCell(this.x + dx2 * i - 2, this.y + dy2 * i + 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx2 * i, this.y + dy2 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isFigure()?.color === 'white'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x + absX && target.y === this.y + absY) {
        const absX3 = Math.abs(target.x - this.x);
        const absY3 = Math.abs(target.y - this.y);
        if (absY3 !== absX3) return false;

        const dy3 = this.y < target.y ? 1 : -1;
        const dx3 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY3; i++) {
          if (
            !this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isFigure()?.color === 'black'
          ) {
            if (
              target.x === this.x + dx3 * i + 1 &&
              target.y === this.y + dy3 * i + 1 &&
              this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty() &&
              (this.x + dx3 * i + 2 <= 7 && this.y + dy3 * i + 2 <= 7
                ? !this?.board?.getCell(this.x + dx3 * i + 2, this.y + dy3 * i + 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx3 * i, this.y + dy3 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx3 * i + 2 <= 7 && this.y + dy3 * i + 2 <= 7
                ? !this.board.getCell(this.x + dx3 * i + 2, this.y + dy3 * i + 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty()) {
              return false;
            }
            this.board
              .getCell(this.x + dx3 * i, this.y + dy3 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isFigure()?.color === 'white'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x - absX && target.y === this.y - absY) {
        const absX4 = Math.abs(target.x - this.x);
        const absY4 = Math.abs(target.y - this.y);
        if (absY4 !== absX4) return false;

        const dy4 = this.y < target.y ? 1 : -1;
        const dx4 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY4; i++) {
          if (
            !this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isFigure()?.color === 'black'
          ) {
            if (
              target.x === this.x + dx4 * i - 1 &&
              target.y === this.y + dy4 * i - 1 &&
              this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty() &&
              (this.x + dx4 * i - 2 >= 0 && this.y + dy4 * i - 2 >= 0
                ? !this?.board?.getCell(this.x + dx4 * i - 2, this.y + dy4 * i - 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx4 * i, this.y + dy4 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx4 * i - 2 >= 0 && this.y + dy4 * i - 2 >= 0
                ? !this.board.getCell(this.x + dx4 * i - 2, this.y + dy4 * i - 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx4 * i, this.y + dy4 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isFigure()?.color === 'white'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x + absX && target.y === this.y - absY) {
        const absX5 = Math.abs(target.x - this.x);
        const absY5 = Math.abs(target.y - this.y);
        if (absY5 !== absX5) return false;

        const dy5 = this.y < target.y ? 1 : -1;
        const dx5 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY5; i++) {
          if (
            !this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isFigure()?.color === 'black'
          ) {
            if (
              target.x === this.x + dx5 * i + 1 &&
              target.y === this.y + dy5 * i - 1 &&
              this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty() &&
              (this.x + dx5 * i + 2 >= 0 && this.y + dy5 * i - 2 >= 0
                ? !this?.board?.getCell(this.x + dx5 * i + 2, this.y + dy5 * i - 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx5 * i, this.y + dy5 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx5 * i + 2 >= 0 && this.y + dy5 * i - 2 >= 0
                ? !this.board.getCell(this.x + dx5 * i + 2, this.y + dy5 * i - 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx5 * i, this.y + dy5 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isFigure()?.color === 'white'
          ) {
            return false;
          }
        }
        return true;
      }
    }
    if (figureElement?.color === 'black') {
      if (target.x === this.x - absX && target.y === this.y + absY) {
        const absX2 = Math.abs(target.x - this.x);
        const absY2 = Math.abs(target.y - this.y);
        if (absY2 !== absX2) return false;

        const dy2 = this.y < target.y ? 1 : -1;
        const dx2 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY2; i++) {
          if (
            !this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isFigure()?.color === 'white'
          ) {
            if (
              target.x === this.x + dx2 * i - 1 &&
              target.y === this.y + dy2 * i + 1 &&
              this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty() &&
              (this.x + dx2 * i - 2 <= 7 && this.y + dy2 * i + 2 <= 7
                ? !this?.board?.getCell(this.x + dx2 * i - 2, this.y + dy2 * i + 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx2 * i, this.y + dy2 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx2 * i - 2 <= 7 && this.y + dy2 * i + 2 <= 7
                ? !this.board.getCell(this.x + dx2 * i - 2, this.y + dy2 * i + 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx2 * i - 1, this.y + dy2 * i + 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx2 * i, this.y + dy2 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx2 * i, this.y + dy2 * i)?.isFigure()?.color === 'black'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x + absX && target.y === this.y + absY) {
        const absX3 = Math.abs(target.x - this.x);
        const absY3 = Math.abs(target.y - this.y);
        if (absY3 !== absX3) return false;

        const dy3 = this.y < target.y ? 1 : -1;
        const dx3 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY3; i++) {
          if (
            !this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isFigure()?.color === 'white'
          ) {
            if (
              target.x === this.x + dx3 * i + 1 &&
              target.y === this.y + dy3 * i + 1 &&
              this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty() &&
              (this.x + dx3 * i + 2 <= 7 && this.y + dy3 * i + 2 <= 7
                ? !this?.board?.getCell(this.x + dx3 * i + 2, this.y + dy3 * i + 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx3 * i, this.y + dy3 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx3 * i + 2 <= 7 && this.y + dy3 * i + 2 <= 7
                ? !this.board.getCell(this.x + dx3 * i + 2, this.y + dy3 * i + 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx3 * i + 1, this.y + dy3 * i + 1)?.isEmpty()) {
              return false;
            }
            this.board
              .getCell(this.x + dx3 * i, this.y + dy3 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx3 * i, this.y + dy3 * i)?.isFigure()?.color === 'black'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x - absX && target.y === this.y - absY) {
        const absX4 = Math.abs(target.x - this.x);
        const absY4 = Math.abs(target.y - this.y);
        if (absY4 !== absX4) return false;

        const dy4 = this.y < target.y ? 1 : -1;
        const dx4 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY4; i++) {
          if (
            !this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isFigure()?.color === 'white'
          ) {
            if (
              target.x === this.x + dx4 * i - 1 &&
              target.y === this.y + dy4 * i - 1 &&
              this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty() &&
              (this.x + dx4 * i - 2 >= 0 && this.y + dy4 * i - 2 >= 0
                ? !this?.board?.getCell(this.x + dx4 * i - 2, this.y + dy4 * i - 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx4 * i, this.y + dy4 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx4 * i - 2 >= 0 && this.y + dy4 * i - 2 >= 0
                ? !this.board.getCell(this.x + dx4 * i - 2, this.y + dy4 * i - 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx4 * i - 1, this.y + dy4 * i - 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx4 * i, this.y + dy4 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx4 * i, this.y + dy4 * i)?.isFigure()?.color === 'black'
          ) {
            return false;
          }
        }
        return true;
      }
      if (target.x === this.x + absX && target.y === this.y - absY) {
        const absX5 = Math.abs(target.x - this.x);
        const absY5 = Math.abs(target.y - this.y);
        if (absY5 !== absX5) return false;

        const dy5 = this.y < target.y ? 1 : -1;
        const dx5 = this.x < target.x ? 1 : -1;
        for (let i = 1; i < absY5; i++) {
          if (
            !this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isFigure()?.color === 'white'
          ) {
            if (
              target.x === this.x + dx5 * i + 1 &&
              target.y === this.y + dy5 * i - 1 &&
              this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty() &&
              (this.x + dx5 * i + 2 >= 0 && this.y + dy5 * i - 2 >= 0
                ? !this?.board?.getCell(this.x + dx5 * i + 2, this.y + dy5 * i - 2)?.isEmpty()
                : false)
            ) {
              this.board
                .getCell(this.x + dx5 * i, this.y + dy5 * i)
                .isFigure()!.cell.figureDeleteColor = true;
              return true;
            }
            if (
              this.x + dx5 * i + 2 >= 0 && this.y + dy5 * i - 2 >= 0
                ? !this.board.getCell(this.x + dx5 * i + 2, this.y + dy5 * i - 2)?.isEmpty() &&
                  this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty()
                : false
            ) {
              return false;
            }
            if (!this.board.getCell(this.x + dx5 * i + 1, this.y + dy5 * i - 1)?.isEmpty()) {
              return false;
            }

            this.board
              .getCell(this.x + dx5 * i, this.y + dy5 * i)
              .isFigure()!.cell.figureDeleteColor = true;
            return true;
          }
          if (
            !this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isEmpty() &&
            this.board.getCell(this.x + dx5 * i, this.y + dy5 * i)?.isFigure()?.color === 'black'
          ) {
            return false;
          }
        }
        return true;
      }
    }

    return false;
  }

  isFigure(): Figure | null {
    return this.figure;
  }

  // ? добавление удаленных фигур в массив

  addLostFigure(figure: Figure | null) {
    if (figure) {
      if (figure?.color === Colors.BLACK) this.board.lostBlackFigure.push(figure);
      else {
        this.board.lostWhiteFigure.push(figure);
      }
    }
  }

  nullFigure() {
    this.addLostFigure(this.figure);
    if (this.figure) {
      this.figure = null;
    }
  }

  deleteFigure(cellFigure: Cell, x: number, y: number) {
    const figureDeleteColorOther =
      cellFigure?.figure?.color !== this.board.getCell(x, y)?.isFigure()?.color;
    if (figureDeleteColorOther) {
      this.board.getCell(x, y)?.nullFigure();
    }
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
