import Link from "next/link";
import { FC, useEffect, useState } from "react";
import BoardModel from "../../models/BoardModel";
import { Player } from "../../models/Player";
import GameRules from "../GameRules/GameRules";
import Modal from "../Modal/Modal";
import Board from "./Board/Board";
import BoardHeader from "./BoardHeader/BoardHeader";

import classes from "./CheckersBoard.module.scss";
import Score from "./Score/Score";

interface IBoardProps {
  online: boolean,
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

const CheckersBoard: FC<IBoardProps> = () => {
  const [showRules, setShowRules] = useState(true);
  const [board, setBoard] = useState(new BoardModel());

  const { turnBy, getWhiteScore, getBlackScore, winner } = board;

  const whiteScore = getWhiteScore();
  const blackScore = getBlackScore();

  const restartGame = () => {
    const newBoard = new BoardModel();
    newBoard.initGame();
    newBoard.turnBy = Player.WHITE;

    setBoard(newBoard);
  }

  const getWinnerName = () => {
    if (winner === Player.BLACK) return 'чёрного';
    if (winner === Player.WHITE) return 'белого';
    return '';
  }

  const getNameByTurn = () => {
    if (turnBy === Player.BLACK) return 'чёрного';
    if (turnBy === Player.WHITE) return 'белого';
    return '';
  }

  useEffect(() => {
    board.initGame();
    board.turnBy = Player.WHITE;
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
      {!showRules && !winner &&
        <div className={classes.GameBoard}>
          <BoardHeader whichTurn={getNameByTurn()} showRules={() => setShowRules(true)} />
          <div className={classes.ScoreAndGameContainer}>
            <Score white score={whiteScore} />
            <div className={classes.GameBoardContainer}>
              <ul className={classes.TopLetters}>
                {letters.map((l) => (<li key={l}>{l}</li>))}
              </ul>
              <div className={classes.HorizontalContainer}>
                <ul className={classes.LeftNumbers}>
                  {numbers.map((n) => (<li key={n}>{n}</li>))}
                </ul>
                <Board board={board} setBoard={setBoard} />
                <ul className={classes.RightNumbers}>
                  {numbers.map((n) => (<li key={n}>{n}</li>))}
                </ul>
              </div>
              <ul className={classes.BottomLetters}>
                {letters.map((l) => (<li key={l}>{l}</li>))}
              </ul>
            </div>
            <Score white={false} score={blackScore} />
          </div>
        </div>
      }
      {!showRules && winner &&
        <div className={classes.WinnerContainer}>
          <h3 className={classes.WinnerHeader}>Поздравляем {getWinnerName()} игрока с победой!</h3>
          <div className={classes.ButtonsContainer}>
            <button className={classes.GameOverButton} onClick={() => restartGame()}>Продолжить игру</button>
            <button className={classes.GameOverButton}>
              <Link href="/">Выйти на главную</Link>
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default CheckersBoard;
