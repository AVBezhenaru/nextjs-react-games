import React from 'react';

import Button from '../Button/Button';
import BombCount from '../BombCount/BombCount';
import {
  setSettingsModal,
  setSettingsModalFalse,
  setSettingsValue,
  setGameIndicator,
  getSapperState,
  setGameModalFalse,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingsValue } = useAppSelector(getSapperState);

  return (
    <div className={classes.header}>
      <Button
        text="New game"
        onClick={() => {
          dispatch(setGameIndicator('New game'));
          dispatch(setSettingsModalFalse());
          dispatch(setGameModalFalse());
          dispatch(setSettingsValue(settingsValue));
        }}
      />
      <Button
        text="Settings"
        onClick={() => {
          dispatch(setSettingsModal());
          dispatch(setGameModalFalse());
        }}
      />
      <BombCount />
    </div>
  );
};

export default Header;
