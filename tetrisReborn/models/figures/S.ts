import CellModel from "../CellModel";
import Figure from "./Figure";
import { Rotate } from "./Rotate";

export default class S extends Figure {
  constructor(cells?: CellModel[], displacementX?: number, displacementY?: number, rotate?: Rotate) {
    super(displacementX, displacementY, rotate);
    
    if (!cells) {
      this.cells.push(new CellModel(1, 0, true)); //  oo
      this.cells.push(new CellModel(2, 0, true)); // oo
      this.cells.push(new CellModel(1, 1, true));
      this.cells.push(new CellModel(0, 1, true));
    } else {
      this.cells = cells;
    }
  }

  nextRotate(): Figure {
    switch (this.rotate) {
      case Rotate.ZERO_DEG:
      case Rotate.ONE_HUNDRED_EIGHTY_DEG:
        return new S(
          [
            new CellModel(0, 0, true), // o
            new CellModel(1, 1, true), // oo
            new CellModel(0, 1, true), //  o
            new CellModel(1, 2, true), 
          ],
          this.displacementX,
          this.displacementY,
          Rotate.NINETY_DEG
        );
      case Rotate.NINETY_DEG:
      case Rotate.TWO_HUNDRED_SEVENTY_DEG:
        return new S(null, this.displacementX, this.displacementY, Rotate.ZERO_DEG);
      default:
        return this;
    }
  }
}
