import { Cell } from '../Cell';
import { Colors } from '../Colors';
import blackLogo from '../../assets/img/black-rook.png';
import whiteLogo from '../../assets/img/white-rook.png';

import { Figure, FigureNames } from './Figure';

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  validMove(target: Cell, checkKing = false): boolean {
    if (!super.validMove(target, checkKing)) {
      return false;
    }

    if (this.cell.isEmptyVertical(target)) {
      return true;
    }

    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }

    return false;
  }
}
