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

const CheckersBoard: FC<IBoardProps> = () => {
  const [showRules, setShowRules] = useState(true);
  const [board, setBoard] = useState(new BoardModel());
  const [winner, setWinner] = useState<Player | null>(null);
  const [turnBy, setTurnBy] = useState<Player | null>(null);

  const whiteScore = board.getWhiteScore();
  const blackScore = board.getBlackScore();

  const restartGame = () => {
    const newBoard = new BoardModel();
    newBoard.initGame();

    setBoard(newBoard);
    setWinner(null);
    setTurnBy(Player.WHITE);
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
    setTurnBy(Player.WHITE);
  }, []);

  useEffect(() => {
    if (turnBy && whiteScore === 12) setWinner(Player.BLACK);
  }, [whiteScore]);

  useEffect(() => {
    if (turnBy && blackScore === 12) setWinner(Player.WHITE);
  }, [blackScore]);

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
