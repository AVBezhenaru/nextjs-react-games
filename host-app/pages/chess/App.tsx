import React, { useState, useEffect } from "react";
import { App } from "../../styles/chess.style";
import BoardComponent from "../../components/Chess/BoardComponent";
import RulesModal from "../../components/Chess/RulesModal";
import { Board } from "../../models/Board";

const Chess = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restart();
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  return (
    <App>
      <RulesModal />
      <BoardComponent board={board} setBoard={setBoard} />
    </App>
  );
};

export default Chess;
