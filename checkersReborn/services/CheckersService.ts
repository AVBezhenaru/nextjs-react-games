import BoardModel from "../models/BoardModel";

export default class CheckersService {
  board: BoardModel;

  constructor() {
    this.board = new BoardModel();
  }

  initNewGame = () => {
    this.board = new BoardModel();
  }
}
