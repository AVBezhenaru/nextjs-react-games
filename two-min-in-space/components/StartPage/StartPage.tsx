import React from 'react';

import backgroundImage from '../../images/background/baseBackground.jpg';

import styles from './StartPage.module.css';

type TwoMinInSpaceStartProps = {
  onStartGame: () => void;
};

const TwoMinInSpaceStart: React.FC<TwoMinInSpaceStartProps> = ({ onStartGame }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <div className={styles.game} style={backgroundImageStyle}>
      <button type="button" className={styles.startButton} onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default TwoMinInSpaceStart;
