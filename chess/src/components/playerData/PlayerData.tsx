import { FC } from "react"
import { Player } from "../../models/Player";

import styles from "./player.module.scss"

interface PlayerDataProps {
  currentPlayer: Player | null
  playerName: string
  playerColor: string
  gameTime: string | null
}

const PlayerData: FC<PlayerDataProps> = ({ currentPlayer, playerName, playerColor, gameTime }) => {

  // const playerStyle = currentPlayer?.color === playerColor ? 'player player--active' : 'player'
  const playerStyle = currentPlayer?.color === playerColor ? `${styles['player']} ${styles['player--active']}` : `${styles['player']}`

  const timeElement = gameTime ? gameTime : '-- : --'

  return (
    <div className={playerStyle}>
      {/* <div className="player__wrapper"> */}
      <div className={styles.player__wrapper}>
        {/* <div className="player__name"> */}
        <div className={styles.player__name}>
          {playerName}
        </div>
        {/* <div className="player__timer"> */}
        <div className={styles.player__timer}>
          {timeElement}
        </div>
      </div>
    </div>
  )
}

export default PlayerData