import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackUp from "../../images/blackDown.png";
import whiteUp from "../../images/whiteDown.png";


export class CheckerQueen extends Figure{

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.image = color === Colors.BLACK ? blackUp : whiteUp;
    this.name = color !== "black" ? FigureNames.QueenWhite : FigureNames.QueenBlack;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) return false;    

    if(this.cell.isEmptyDiagonal(target, this.cell.figure)){
      return true;
    }

    return false;
  }

}