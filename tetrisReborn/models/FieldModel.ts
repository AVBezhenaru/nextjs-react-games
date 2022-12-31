import CellModel from "./CellModel";
import FigureGenerator from "./FigureGenerator";
import Figure from "./figures/Figure";
import { MoveDirection } from "./figures/MoveDirection";
import { Level, needToLevelUp } from "./Level";
import { fieldHeight, fieldWidth } from "./static-data";

export default class FieldModel {
  private figGenerator = new FigureGenerator();

  cells: CellModel[] = [];
  nextFigure: Figure | null = null;
  currentFigure: Figure | null = null;

  gameOver: boolean = false;
  level: Level = Level.SUPER_EASY;
  score: number = 0;
  gameId: number = 0;

  private createRandomFigure(): Figure {
    return this.figGenerator.next();
  }

  private getCopy(): FieldModel {
    const newField = new FieldModel();
    newField.cells = this.cells;
    newField.currentFigure = this.currentFigure;
    newField.nextFigure = this.nextFigure;
    newField.gameOver = this.gameOver;
    newField.level = this.level;
    newField.score = this.score;
    newField.gameId = this.gameId;
    return newField;
  }

  private checkGameOver() {
    const nextFigureCellsArr = this.nextFigure.getCellsArray();

    for (let i = 0; i < nextFigureCellsArr.length; i++) {
      const figureCell = nextFigureCellsArr[i];
      const cellToCheck = this.cells.find((c) => c.x === figureCell.x && c.y === figureCell.y);
      if (cellToCheck?.filled) {
        this.gameOver = true;
        return;
      }
    }
  }

  private clearRow(row: CellModel[]) {
    for (let i = 0; i < row.length; i++) {
      row[i].filled = false;
    }
  }

  private findFilledRows(filledRows: Set<number>): Set<number> {
    let rowsToDistruction = new Set<number>();
    filledRows.forEach((y) => {
      const row = this.cells.filter((c) => c.y === y && c.filled);
      if (row.length < fieldWidth) return;
      this.clearRow(row);
      rowsToDistruction.add(y);
    });

    return rowsToDistruction;
  }

  private raiseScore(destructedRowsCount: number) {
    this.score += destructedRowsCount * (this.level as number) * fieldWidth;
    const nextLevel = needToLevelUp(this.score, this.level);
    if (nextLevel) this.level = nextLevel;
  }

  private checkRowDestruction(filledRows: Set<number>) {
    let destructedRows = this.findFilledRows(filledRows);
    const destructuredCount = destructedRows.size;
    if (!destructuredCount) return;

    this.raiseScore(destructuredCount);

    let movedCells = 0; // need for calc offset by Y
    for (let i = this.cells.length - 1; i >= 0; i--) {
      const cell = this.cells[i];
      if (destructedRows.has(cell.y)) {
        cell.y = 0;
        cell.y += Math.floor(movedCells / fieldWidth);
        movedCells++;
      } else {
        cell.y += Math.floor(movedCells / fieldWidth);
      }
    }

    this.cells.sort((a, b) => {
      return a.y - b.y || a.x - b.x;
    });
  }

  private spawnNextFigure() {
    const figureCells = this.currentFigure.getCellsArray();
    for (let i = 0; i < figureCells.length; i++) {
      const { x, y } = figureCells[i];
      const cellToFill = this.cells.find((c) => c.x === x && c.y === y);
      if (cellToFill) cellToFill.filled = true;
    }

    this.checkGameOver();
    // pass the set of sorted Y's (numbers of row, which cells was filled)
    this.checkRowDestruction(new Set<number>(figureCells.map((c) => c.y).sort((a, b) => b - a)));

    this.currentFigure = this.nextFigure;
    this.nextFigure = this.createRandomFigure();
  }

  private horizontalMove(direction: MoveDirection): boolean {
    const figureCellsArr = this.currentFigure.getCellsArray();
    
    for (let i = 0; i < figureCellsArr.length; i++) {
      const figureCell = figureCellsArr[i];
      const leftCell = this.cells.find((c) => c.x === figureCell.x + (direction as number) && c.y === figureCell.y)
      if (!leftCell || leftCell.filled) return false;
    }

    this.currentFigure.move(direction);
    return true;
  }

  private moveBottom(): boolean {
    const figureCellsArr = this.currentFigure.getCellsArray();

    for (let i = 0; i < figureCellsArr.length; i++) {
      const { x, y } = figureCellsArr[i];
      const bottomCell = this.cells.find((c) => c.x === x && c.y === y + 1);
      if (!bottomCell || bottomCell.filled) {
        this.spawnNextFigure();
        return false;
      }
    }

    this.currentFigure.move(MoveDirection.BOTTOM);
    return true;
  }

  private possibleRotation(rotated: Figure): boolean {
    const rotatedFigureCells = rotated.getCellsArray();
    for (let i = 0; i < rotatedFigureCells.length; i++) {
      const { x, y } = rotatedFigureCells[i];
      const potentialCell = this.cells.find((c) => c.x === x && c.y === y && !c.filled);
      if (!potentialCell) return false;
    }

    return true;
  }

  initGame(): FieldModel {
    for (let i = 0; i < fieldHeight; i++) {
      for (let j = 0; j < fieldWidth; j++) {
        this.cells.push(new CellModel(j, i));
      }
    }

    this.nextFigure = this.createRandomFigure();
    this.currentFigure = this.createRandomFigure();
    return this.update();
  }

  restartGame(): FieldModel {
    this.cells = [];
    
    this.nextFigure = null;
    this.currentFigure = null;
    this.gameOver = false;
    this.level = Level.SUPER_EASY;
    this.score = 0;
    this.gameId++;
    return this.initGame();
  }

  moveCurrentFigure(direction: MoveDirection): boolean {
    switch (direction) {
      case MoveDirection.BOTTOM:
        return this.moveBottom();
      case MoveDirection.LEFT:
      case MoveDirection.RIGHT:
        return this.horizontalMove(direction);
      default:
        return false;
    }
  }

  rotateCurrentFigure(): boolean {
    const rotated = this.currentFigure.nextRotate();
    if (rotated === this.currentFigure) return false;

    const isRotationPossible = this.possibleRotation(rotated);
    if (isRotationPossible) {
      this.currentFigure = rotated;
    }

    return isRotationPossible;
  }

  update(): FieldModel {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (!cell.filled) cell.hasFigure = this.currentFigure.onCell(cell);
    }

    return this.getCopy();
  }
}
