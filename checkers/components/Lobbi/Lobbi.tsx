import React, { FC } from 'react';
import Link from 'next/link';

import { players } from './PlayersForOnlinePlay';

interface PlayConditional {
  colorCheckers?: string;

  bid?: number;
}
interface UserProps {
  name?: string;
  playConditional?: PlayConditional;
}

const Lobbi: FC<UserProps> = () => (
  <ul className="lobbi-container">
    {players.map((el, index) => (
      <li className="lobbi-span" key={index}>
        {el.name} {el.playConditional?.bid} {el.playConditional?.colorCheckers}{' '}
        <Link href="../../../checkers/Play">
          <button type="button" className="lobbi-btn">
            Присоединиться
          </button>
        </Link>
      </li>
    ))}
  </ul>
);
export default Lobbi;
