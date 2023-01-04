import React from 'react';

import { HeaderGame } from './HeaderStyle';

type TypeHeaderProps = {
  rules: () => void;
  newGame: () => void;
  moveCounter: number;
};

export const Header: React.FC<TypeHeaderProps> = ({ rules, newGame, moveCounter }) => (
  <HeaderGame>
    <button type="button" onClick={rules}>
      Правила
    </button>
    <button type="button" onClick={newGame}>
      Новая игра
    </button>
    <span>
      Лучший счет<span>0</span>
    </span>
    <span>
      Текущий счет<span>0</span>
    </span>
    <span>
      Сделано ходов<span>{moveCounter}</span>
    </span>
  </HeaderGame>
);
