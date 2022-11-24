import { useDispatch, useSelector } from 'react-redux';

import React, { FC } from 'react';
import Link from 'next/link';

import { setPlayWithBoot, setUserSelectedId } from '../../store/checkersReducer';
import { RootState } from '../../../store';

import { players } from './PlayersForOnlinePlay';

interface PlayConditional {
  colorCheckers: string;

  bid: number;
}
interface UserProps {
  id: number;
  name?: string;
  playConditional: PlayConditional;
}

const Lobbi: FC<UserProps> = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.checkers.idForPlayersOnline);
  console.log(count);

  return (
    <ul className="lobbi-container">
      {players.map((el) => (
        <li className="lobbi-span" key={el.id}>
          {el.name} {el.playConditional?.bid} {el.playConditional?.colorCheckers}{' '}
          {dispatch(setPlayWithBoot(false)) && (
            <Link href="../../../checkers/Play">
              <button
                type="button"
                className="lobbi-btn"
                onClick={() => dispatch(setUserSelectedId(el.id))}
              >
                Присоединиться
              </button>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
export default Lobbi;
