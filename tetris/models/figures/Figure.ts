import CellModel from "../CellModel";
import { fieldWidth } from "../static-data";
import { MoveDirection } from "./MoveDirection";
import { Rotate } from "./Rotate";

export default abstract class Figure {
  protected cells: CellModel[] = [];
  protected rotate: Rotate = Rotate.ZERO_DEG;
  protected displacementX: number;
  protected displacementY: number;

  abstract nextRotate(): Figure;

  constructor(displacementX?: number, displacementY?: number, rotate?: Rotate) {
    this.displacementX = displacementX === undefined 
      ? (Math.floor(fieldWidth / 2) - 1)
      : displacementX;

    this.displacementY = displacementY === undefined 
      ? 0 
      : displacementY;
    this.rotate = rotate ? rotate : Rotate.ZERO_DEG;
  }

  getCellsArrayForNextFigure(): CellModel[] {
    const result: CellModel[] = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.cells.find((c) => c.x === j - 1 && c.y === i - 1)) 
          result.push(new CellModel(j + 1, i + 1, true));
        else
          result.push(new CellModel(j + 1, i + 1));
      }
    }

    return result;
  }
  
  getCellsArray(): CellModel[] {
    return this.cells.map((c) => new CellModel(c.x + this.displacementX, c.y + this.displacementY, true));
  }

  onCell({ x, y }: CellModel): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      const figureCell = this.cells[i];
      if (figureCell.x + this.displacementX === x && figureCell.y + this.displacementY === y) return true;
    }
  }

  move(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.LEFT:
        if (this.displacementX) this.displacementX--;
        break;
      case MoveDirection.RIGHT:
        if (this.displacementX < fieldWidth) this.displacementX++;
        break;
      case MoveDirection.BOTTOM:
        this.displacementY++;
      default:
        break;
    }
  }
}
