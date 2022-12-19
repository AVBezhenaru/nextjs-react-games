import { FC } from 'react';

import classes from './BoardHeader.module.scss';

interface IBoardHeaderProps {
  whiteTurn: boolean,
  showRules: () => void,
}

const BoardHeader: FC<IBoardHeaderProps> = ({ whiteTurn, showRules }) => {

  return (
    <div className={classes.BoardHeader}>
      <h3>Текущий ход {whiteTurn ? 'белого игрока' : 'черного игрока'}</h3>
      <button className={classes.RulesButton} type="button" onClick={showRules}>Правила игры</button>
    </div>
  );
}

export default BoardHeader;
