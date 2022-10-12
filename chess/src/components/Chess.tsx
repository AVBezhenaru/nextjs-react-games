import React, { useState, useEffect } from "react";
import { App } from "../styles/chess.style";
import BoardComponent from "./BoardComponent";
import RulesModal from "./RulesModal";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import LostFigures from "./LostFigures";
import { StyledLostFigures } from "../styles/chess.style";

const Chess = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const changePlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  return (
    <App>
      <RulesModal />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
      <StyledLostFigures>
        <div>Фигуры выбывшие из игры:</div>
        <div>
          <LostFigures
            title="Чёрные:"
            figures={board.lostBlackFigures}
          ></LostFigures>
          <LostFigures
            title="Белые:"
            figures={board.lostWhiteFigures}
          ></LostFigures>
        </div>
      </StyledLostFigures>
    </App>
  );
};

export default Chess;
