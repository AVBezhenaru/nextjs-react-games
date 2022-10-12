import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
// import blackLogo from "../../public/black-queen.png";
// import whiteLogo from "../../public/white-queen.png";

const blackLogo = require("../../assets/img/black-queen.png");
const whiteLogo = require("../../assets/img/white-queen.png");

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    if (this.cell.isEmptyVertical(target)) {
      return true;
    }

    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    } 
    
    return false;
  }
}
