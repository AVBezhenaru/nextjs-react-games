import React from 'react';

import Button from '../Button/Button';
import BombCount from '../BombCount/BombCount';
import TimerGame from '../TimerGame/TimerGame';
import {
  setSettingsModal,
  setSettingsModalFalse,
  setSettingsValue,
  setGameIndicator,
  getSapperState,
  setGameModalFalse,
  setTimerIndicator,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingsValue } = useAppSelector(getSapperState);

  const onClickNewGame = () => {
    dispatch(setGameIndicator('New game'));
    dispatch(setSettingsModalFalse());
    dispatch(setGameModalFalse());
    dispatch(setSettingsValue(settingsValue));
    dispatch(setTimerIndicator(false));
  };
  const onClickSettings = () => {
    dispatch(setSettingsModal());
    dispatch(setGameModalFalse());
  };

  return (
    <div className={classes.header}>
      <TimerGame />
      <Button text="New game" onClick={onClickNewGame} />
      <Button text="Settings" onClick={onClickSettings} />
      <BombCount />
    </div>
  );
};

export default Header;
