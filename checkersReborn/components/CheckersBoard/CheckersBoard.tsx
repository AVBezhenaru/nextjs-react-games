import { FC, useEffect, useState } from "react";
import BoardModel from "../../models/BoardModel";
import GameRules from "../GameRules/GameRules";
import Modal from "../Modal/Modal";
import Board from "./Board/Board";
import BoardHeader from "./BoardHeader/BoardHeader";

import classes from "./CheckersBoard.module.scss";
import Score from "./Score/Score";

interface IBoardProps {
  online: boolean,
}

const CheckersBoard: FC<IBoardProps> = () => {
  const [showRules, setShowRules] = useState(true);
  const [board, setBoard] = useState(new BoardModel());

  const whiteTurn = true;
  
  const restartGame = () => {
    const newBoard = new BoardModel();
    newBoard.initGame();
    setBoard(newBoard);
  }

  useEffect(() => {
    board.initGame();
  }, []);

  return (
    <div className={classes.CheckersBoard}>
      {showRules && 
        <div className={classes.ModalContainer}>
          <Modal title="Правила игры" onClose={() => setShowRules(false)}>
            <GameRules />
          </Modal>
        </div>
      }
      {!showRules &&
        <div className={classes.GameBoard}>
          <BoardHeader whiteTurn={whiteTurn} showRules={() => setShowRules(true)} />
          <div className={classes.ScoreAndGameContainer}>
            <Score white score={board.getWhiteScore()} />
            <div className={classes.GameBoardContainer}>
              <ul className={classes.TopLetters}>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
              </ul>
              <div className={classes.HorizontalContainer}>
                <ul className={classes.LeftNumbers}>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                </ul>
                <Board board={board} setBoard={setBoard} />
                <ul className={classes.RightNumbers}>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                </ul>
              </div>
              <ul className={classes.BottomLetters}>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
              </ul>
            </div>
            <Score white={false} score={board.getBlackScore()} />
          </div>
        </div>
      }
    </div>
  );
}

export default CheckersBoard;