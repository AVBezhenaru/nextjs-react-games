import { Cell } from '../Cell';
import { Colors } from '../Colors';
import blackLogo from '../../assets/img/black-bishop.png';
import whiteLogo from '../../assets/img/white-bishop.png';

import { Figure, FigureNames } from './Figure';

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
