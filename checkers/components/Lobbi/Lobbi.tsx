import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import Link from 'next/link';

import { setPlayWithBoot, setUserSelectedId } from '../../store/checkersReducer';
import { RootState } from '../../../store';

interface PlayConditional {
  colorCheckers: string;

  bid: number;
}
interface UserProps {
  id: number;
  name?: string;
  playConditional: PlayConditional;
}

const Lobbi: FC<UserProps> = (props) => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.checkers.idForPlayersOnline);
  console.log(count);

  return (
    <li className="lobbi-span">
      {props.name} {props.playConditional?.bid} {props.playConditional?.colorCheckers}{' '}
      {dispatch(setPlayWithBoot(false)) && (
        <Link href="../../../checkers/Play">
          <button
            type="button"
            className="lobbi-btn"
            onClick={() => dispatch(setUserSelectedId(props.id))}
          >
            Присоединиться
          </button>
        </Link>
      )}
    </li>
  );
};
export default Lobbi;
