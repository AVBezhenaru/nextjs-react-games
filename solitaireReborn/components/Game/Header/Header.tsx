import React, { FC } from 'react';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { startGame } from '../../../store/solitaireSlice';

import { HeaderGame } from './HeaderStyle';

interface IHeaderProps {
  showRules: () => void;
}

export const Header: FC<IHeaderProps> = ({ showRules }) => {
  const dispatch = useAppDispatch();
  const {
    moveCounter,
    bestPoints,
    gamePoints
  } = useAppSelector((state) => state.solitaireReborn);

  return (
    <HeaderGame>
      <button type="button" onClick={showRules}>
        Правила
      </button>
      <button type="button" onClick={() => dispatch(startGame())}>
        Новая игра
      </button>
      <span>
        Лучший счет<span>{bestPoints}</span>
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
