import { FC } from 'react';

import classes from './BoardHeader.module.scss';

interface IBoardHeaderProps {
  whichTurn: string,
  showRules: () => void,
}

const BoardHeader: FC<IBoardHeaderProps> = ({ whichTurn, showRules }) => {

  return (
    <div className={classes.BoardHeader}>
      <h3>Текущий ход {whichTurn} игрока</h3>
      <button className={classes.RulesButton} type="button" onClick={showRules}>Правила игры</button>
    </div>
  );
}

export default BoardHeader;
