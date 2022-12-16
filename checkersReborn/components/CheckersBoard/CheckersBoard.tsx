import { FC, useState } from "react";
import GameRules from "../GameRules/GameRules";
import Modal from "../Modal/Modal";

import classes from "./CheckersBoard.module.scss";

interface IBoardProps {
  online: boolean,
}

const CheckersBoard: FC<IBoardProps> = () => {
  const [showRules, setShowRules] = useState(true);

  return (
    <div className={classes.CheckersBoard}>
      {
        showRules && 
        <div className={classes.ModalContainer}>
          <Modal title="Правила игры" onClose={() => setShowRules(false)}>
            <GameRules />
          </Modal>
        </div>
      }
    </div>
  );
}

export default CheckersBoard;