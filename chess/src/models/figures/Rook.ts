import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const blackLogo = require("../../assets/img/black-rook.png");
const whiteLogo = require("../../assets/img/white-rook.png");

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }

  validMove(target: Cell, checkKing: boolean = false): boolean {
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
