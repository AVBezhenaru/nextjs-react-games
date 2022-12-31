import CellModel from "../CellModel";
import Figure from "./Figure";

export default class O extends Figure {
  constructor() {
    super();

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.cells.push(new CellModel(i, j, true));
      }
    }
  }
  
  nextRotate(): Figure {
    return this;
  }
}
