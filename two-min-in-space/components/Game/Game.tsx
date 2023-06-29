import React, { useState } from 'react';

import Canvas from '../Canvas/Canvas';
import TwoMinInSpaceStart from '../StartPage/StartPage';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGoToStart = () => {
    setGameStarted(false);
  };

  return (
    <div className="game">
      {gameStarted ? (
        <Canvas onGoToStart={handleGoToStart} />
      ) : (
        <TwoMinInSpaceStart onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export { Game };
