import { FC } from 'react';

import { Player } from '../../models/Player';

import styles from './player.module.scss';

interface PlayerDataProps {
  currentPlayer: Player | null;
  playerName: string;
  playerColor: string | undefined;
  // gameTime: string | null;
}

const PlayerData: FC<PlayerDataProps> = ({ currentPlayer, playerName, playerColor }) => {
  const playerStyle =
    currentPlayer?.color === playerColor
      ? `${styles.player} ${styles['player--active']}`
      : `${styles.player}`;

  return (
    <div className={playerStyle}>
      <div className={styles.player__wrapper}>
        <div className={styles.player__name}>{playerName}</div>
      </div>
    </div>
  );
};

export default PlayerData;
