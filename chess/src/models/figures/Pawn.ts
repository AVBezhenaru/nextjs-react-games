import { Cell } from '../Cell';
import { Colors } from '../Colors';

import { Figure, FigureNames } from './Figure';

const blackLogo = require('../../assets/img/black-pawn.png');
const whiteLogo = require('../../assets/img/white-pawn.png');

export class Pawn extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  isFirstStep = true;

  validMove(target: Cell, checkKing = false): boolean {
    if (!super.validMove(target, checkKing)) {
      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep &&
          target.y === this.cell.y + firstStepDirection &&
          this.cell.board.getCell(target.x, this.cell.y + direction).isEmpty())) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
