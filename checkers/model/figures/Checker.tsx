import { Cell } from '../Cell';
import { Colors } from '../Colors';
import blackUp from '../../images/blackUp.png';
import whiteUp from '../../images/whiteUp.png';

import { Figure, FigureNames } from './Figure';

export class Checker extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.image = color === Colors.BLACK ? blackUp : whiteUp;
    this.name = color !== 'black' ? FigureNames.WhiteСhecker : FigureNames.BlackСhecker;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const directionEmpty = this.cell.figure?.color === Colors.BLACK ? -1 : 1;
    const twoStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;
    const twoStepDirectionEmpty = this.cell.figure?.color === Colors.BLACK ? -2 : 2;

    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x + 1 &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x - 1 &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      target.y === this.cell.y + twoStepDirection &&
      target.x === this.cell.x + 2 &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      !this.cell.board.getCell(target.x - 1, target.y + directionEmpty)?.isEmpty() &&
      this.cell.board.getCell(target.x - 1, target.y + directionEmpty)?.isFigure()?.color !== this.cell.figure?.color
    ) {
      this.cell.board.getCell(target.x - 1, target.y + directionEmpty).figureDeleteColor = true;
      return true;
    }
    if (
      target.y === this.cell.y + twoStepDirectionEmpty &&
      target.x === this.cell.x + 2 &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      !this.cell.board.getCell(target.x - 1, target.y + direction)?.isEmpty() &&
      this.cell.board.getCell(target.x - 1, target.y + direction)?.isFigure()?.color !== this.cell.figure?.color
    ) {
      this.cell.board.getCell(target.x - 1, target.y + direction).figureDeleteColor = true;
      return true;
    }
    if (
      target.y === this.cell.y + twoStepDirection &&
      target.x === this.cell.x - 2 &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      !this.cell.board.getCell(target.x + 1, target.y + directionEmpty)?.isEmpty() &&
      this.cell.board.getCell(target.x + 1, target.y + directionEmpty)?.isFigure()?.color !== this.cell.figure?.color
    ) {
      this.cell.board.getCell(target.x + 1, target.y + directionEmpty).figureDeleteColor = true;
      return true;
    }
    if (
      target.y === this.cell.y + twoStepDirectionEmpty &&
      target.x === this.cell.x - 2 &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      !this.cell.board.getCell(target.x + 1, target.y + direction)?.isEmpty() &&
      this.cell.board.getCell(target.x + 1, target.y + direction)?.isFigure()?.color !== this.cell.figure?.color
    ) {
      this.cell.board.getCell(target.x + 1, target.y + direction).figureDeleteColor = true;
      return true;
    }

    return false;
  }
}
