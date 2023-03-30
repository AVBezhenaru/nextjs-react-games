import React from 'react';

import Button from '../Button/Button';
import {
  setSettingsModal,
  setSettingsModalFalse,
  setSettingsValue,
  getSapperState,
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
          dispatch(setSettingsModalFalse());
          dispatch(setSettingsValue(settingsValue));
        }}
      />
      <Button
        text="Settings"
        onClick={() => {
          dispatch(setSettingsModal());
        }}
      />
    </div>
  );
};

export default Header;
