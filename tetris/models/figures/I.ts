import CellModel from "../CellModel";
import { fieldWidth } from "../static-data";
import Figure from "./Figure";
import { Rotate } from "./Rotate";

export default class I extends Figure {
  constructor(cells?: CellModel[], displacementX?: number, displacementY?: number, rotate?: Rotate) {
    const dspX = displacementX === undefined ? Math.floor(fieldWidth / 2) - 2 : displacementX;
    super(dspX, displacementY, rotate);
    
    if (!cells) {
      for (let i = 0; i < 4; i++) {
        this.cells.push(new CellModel(i, 0, true));
      }
    } else {
      this.cells = cells;
    }
  }

  nextRotate(): Figure {
    switch (this.rotate) {
      case Rotate.ZERO_DEG:
      case Rotate.ONE_HUNDRED_EIGHTY_DEG:
        return new I(
          [
            new CellModel(0, 0, true),
            new CellModel(0, 1, true),
            new CellModel(0, 2, true),
            new CellModel(0, 3, true),
          ],
          this.displacementX + 1,
          // only for spawn vertical I
          this.displacementY ? this.displacementY - 1 : this.displacementY,
          Rotate.NINETY_DEG
        );
      case Rotate.NINETY_DEG:
      case Rotate.TWO_HUNDRED_SEVENTY_DEG:
        return new I(null, this.displacementX - 1, this.displacementY + 1, Rotate.ZERO_DEG)
      default:
        return this;
    }
  }
}
