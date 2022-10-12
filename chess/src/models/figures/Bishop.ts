import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
// import blackLogo from "../../black-bishop.png";
// import whiteLogo from "../../white-bishop.png";

const blackLogo = require("../../assets/img/black-bishop.png");
const whiteLogo = require("../../assets/img/white-bishop.png");

export class Bishop extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }
    
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }

        if (this.cell.isEmptyDiagonal(target)) {
          return true;
        }

        return false;
    }
}