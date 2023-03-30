import React from 'react';

import Board from '../Board/Board';
import Header from '../Header/Header';
import SetingsModal from '../SettingsModal/SettingsModal';
import { useAppSelector } from '../../../hooks';
import { getSapperState } from '../../store/sapperSlice';

import classes from './Game.module.scss';

const Game: React.FC = () => {
  const { settingsModal } = useAppSelector(getSapperState);
  return (
    <div className={classes.mainPage}>
      <Header />
      {!settingsModal ? null : <SetingsModal />}
      <div className={classes.interface}>
        <Board />
      </div>
    </div>
  );
};

export default Game;
