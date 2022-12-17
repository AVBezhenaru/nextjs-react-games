import { FC, useState } from "react";
import GameRules from "../GameRules/GameRules";
import Modal from "../Modal/Modal";
import Board from "./Board/Board";
import BoardHeader from "./BoardHeader/BoardHeader";

import classes from "./CheckersBoard.module.scss";

interface IBoardProps {
  online: boolean,
}

const CheckersBoard: FC<IBoardProps> = () => {
  const [showRules, setShowRules] = useState(true);
  const [whiteTurn, setWhiteTurn] = useState(true);

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
          <Board />
        </div>
      }
    </div>
  );
}

export default CheckersBoard;