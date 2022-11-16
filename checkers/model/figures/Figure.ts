import image from '../../images/blackUp.png';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export enum FigureNames {
  FIGURE = 'Фигура',
  BlackСhecker = 'черная шашка',
  WhiteСhecker = 'белая шашка',
  QueenBlack = 'королева черная шашка',
  QueenWhite = 'королева белая шашка',
}

export class Figure {
  [x: string]: any;

  color: Colors;

  image: typeof image | null;

  cell: Cell;

  name: FigureNames;

  id: number;

  blocked: boolean;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.image = null;
    this.blocked = false;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.image) return false;
    return true;
  }

  // moveFigure(target: Cell) {}
}
