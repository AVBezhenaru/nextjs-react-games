import { Cell } from '../Cell';
import { Colors } from '../Colors';
import blackLogo from '../../assets/img/black-king.png';
import whiteLogo from '../../assets/img/white-king.png';

import { Figure, FigureNames } from './Figure';

export class King extends Figure {
  underAttackKing: boolean;

  chekAndMateFlag: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
    this.underAttackKing = false;
    this.chekAndMateFlag = false;
  }

  validMove(target: Cell, checkKing = false): boolean {
    if (!super.validMove(target, checkKing)) {
      return false;
    }

    if (
      (target.x === this.cell.x && target.y === this.cell.y - 1) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y) ||
      (target.x === this.cell.x - 1 && target.y === this.cell.y - 1) ||
      (target.x - 1 === this.cell.x && target.y === this.cell.y) ||
      (target.x === this.cell.x && target.y - 1 === this.cell.y) ||
      (target.x - 1 === this.cell.x && target.y - 1 === this.cell.y) ||
      (target.x + 1 === this.cell.x && target.y - 1 === this.cell.y) ||
      (target.x === this.cell.x + 1 && target.y === this.cell.y - 1)
    ) {
      return true;
    }

    return false;
  }
}
