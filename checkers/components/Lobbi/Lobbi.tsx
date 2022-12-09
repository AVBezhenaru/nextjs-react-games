import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { UserProps } from '../../interfaces/Interfaces';
import { setPlayWithBoot, setUserSelectedId, setShow } from '../../store/checkersReducer';
import { RootState } from '../../../store';

const Lobbi: FC<UserProps> = (props) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { playerForgameMe } = useSelector((state: RootState) => state.checkers);

  const buttonSelection = () => {
    if (props.name === playerForgameMe?.name) {
      dispatch(setShow(true));
    } else {
      dispatch(setUserSelectedId(props.id));
      return route.push('../../../checkers/Play');
    }
  };

  return (
    <li className="lobbi-span">
      {props.name} {props.playConditional?.bid} {props.playConditional?.colorCheckers}{' '}
      {dispatch(setPlayWithBoot(false)) && (
        <button
          type="button"
          className="lobbi-btn"
          onClick={() => {
            buttonSelection();
          }}
        >
          {props.name === playerForgameMe?.name ? 'Настройки' : 'Присоединиться'}
        </button>
      )}
    </li>
  );
};
export default Lobbi;
