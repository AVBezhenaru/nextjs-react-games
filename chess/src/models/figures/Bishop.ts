import { Cell } from '../Cell';
import { Colors } from '../Colors';

import { Figure, FigureNames } from './Figure';

const blackLogo = require('../../assets/img/black-bishop.png');
const whiteLogo = require('../../assets/img/white-bishop.png');

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  validMove(target: Cell, checkKing = false): boolean {
    if (!super.validMove(target, checkKing)) {
      return false;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}
