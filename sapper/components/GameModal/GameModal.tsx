import React from 'react';

import {
  setSettingsValue,
  setGameIndicator,
  getSapperState,
  setGameModal,
  setGameModalFalse,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './GameModal.module.scss';

interface IGameModalProps {
  title: string;
}

const GameModal: React.FC<IGameModalProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const { settingsValue, finishTime } = useAppSelector(getSapperState);
  const onClickNewGame = () => {
    dispatch(setGameIndicator('New game'));
    dispatch(setGameModalFalse());
    dispatch(setSettingsValue(settingsValue));
  };
  const onClickX = () => {
    dispatch(setGameModal());
  };

  return (
    <div className={classes.gameModal}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.statistics}>Time: {finishTime} sec</p>
      <button type="button" className={classes['gameModal-btn']} onClick={onClickNewGame}>
        New game
      </button>
      <button type="button" className={classes['gameModal-btn-close']} onClick={onClickX}>
        X
      </button>
    </div>
  );
};

export default GameModal;
