import React, { FC } from 'react';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { startNewGame } from '../../../helpers/setGameCards';

import { HeaderGame } from './HeaderStyle';

interface IHeaderProps {
  showRules: () => void;
}

export const Header: FC<IHeaderProps> = ({ showRules }) => {
  const { moveCounter, gamePoints, theBestPoints, cards } = useAppSelector(
    (state) => state.solitaire,
  );
  const dispatch = useAppDispatch();
  return (
    <HeaderGame>
      <button type="button" onClick={showRules}>
        Правила
      </button>
      <button type="button" onClick={() => startNewGame(dispatch, cards)}>
        Новая игра
      </button>
      <span>
        Лучший счет<span>{theBestPoints}</span>
      </span>
      <span>
        Текущий счет<span>{gamePoints}</span>
      </span>
      <span>
        Сделано ходов<span>{moveCounter}</span>
      </span>
    </HeaderGame>
  );
};
