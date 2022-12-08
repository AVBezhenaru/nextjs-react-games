import React, { FC } from 'react';

import GameSettings from '../gameSettings/GameSettings';
import { Colors } from '../../models/Colors';
import ListPlayers from '../listPlayers/ListPlayers';
import { useAppSelector } from '../../../hooks';

import styles from './Lobby.module.scss';

interface LobbyProps {
  setGameTime: (time: string | null) => void;
  setGainTime: (time: string | null) => void;
  settingsGame: {
    gameTime: string | null;
    gainTime: string | null;
    startColor: Colors;
    gameMode: string;
  };
}
const Lobby: FC<LobbyProps> = (props) => {
  // const dispatch = useDispatch();
  const modal = useAppSelector((state) => state.rootSlice.modalWindow);
  const isOpenModal = modal ? (
    <GameSettings
      setGainTime={props.setGainTime}
      setGameTime={props.setGameTime}
      settingsGame={props.settingsGame}
    />
  ) : null;
  const gameMode = useAppSelector((state) => state.rootSlice.isOnline);
  const showPlayerList = gameMode ? <ListPlayers /> : null;
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{isOpenModal}</p>
      {/* <p className={styles.rules}> */}
      {/*  <RulesModal /> */}
      {/* </p> */}
      {showPlayerList}
    </div>
  );
};
export default Lobby;
