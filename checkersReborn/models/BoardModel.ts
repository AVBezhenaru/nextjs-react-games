import CellModel from "./CellModel";

export default class BoardModel {
  cells: CellModel[];

  constructor() {
    this.cells = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const isEvenRow = i % 2 !== 0;
        const isBlack = isEvenRow 
          ? j % 2 !== 0
          : j % 2 === 0;

        const hasWhiteChecker = !isBlack && i * 8 + j < 24;
        const hasBlackChecker = !isBlack && i * 8 + j > 39;

        const cell = new CellModel(isBlack, hasBlackChecker, hasWhiteChecker);
        this.cells.push(cell);
      }
    }
  }
}