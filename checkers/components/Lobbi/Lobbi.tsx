import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';

import { setPlayWithBoot, setUserSelectedId } from '../../store/checkersReducer';
import { RootState } from '../../../store';

import { players, player } from './PlayersForOnlinePlay';

interface PlayConditional {
  colorCheckers: string;

  bid: number;
}
export interface UserProps {
  id: number;
  name?: string;
  playConditional: PlayConditional;
}

const Lobbi: FC<UserProps> = (props) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const color = useSelector((state: RootState) => state.checkers.color);

  const colorSelectedUser = players.find((el) => el.id === props.id).playConditional.colorCheckers;
  console.log(colorSelectedUser);

  return (
    <li className="lobbi-span" key={props.id}>
      {props.name} {props.playConditional?.bid} {props.playConditional?.colorCheckers}{' '}
      {dispatch(setPlayWithBoot(false)) && (
        <button
          type="button"
          className="lobbi-btn"
          onClick={() => {
            dispatch(setUserSelectedId(props.id));

            const colorSelectedUser = players.find((el) => el.id === props.id).playConditional
              .colorCheckers;

            const disable = color !== colorSelectedUser;
            return disable
              ? route.push('../../../checkers/Play')
              : route.push('../../../checkers/ChoosePlayer');
          }}
        >
          Присоединиться
        </button>
      )}
    </li>
  );
};
export default Lobbi;
