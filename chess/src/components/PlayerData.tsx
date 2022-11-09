import React, { FC } from "react"
import { Player } from "../models/Player";

interface PlayerDataProps {
  currentPlayer: Player | null
  playerName: string
  playerColor: string
  gameTime: string | null
}

const PlayerData: FC<PlayerDataProps> = ({ currentPlayer, playerName, playerColor, gameTime }) => {

  const playerStyle = currentPlayer?.color === playerColor ? 'player player--active' : 'player'

  const timeElement = gameTime ? gameTime : '-- : --'

  return (
    <div className={playerStyle}>
      <div className="player__wrapper">
        <div className="player__name">
          {playerName}
        </div>
        <div className="player__timer">
          {timeElement}
        </div>
      </div>
    </div>
  )
}

export default PlayerData