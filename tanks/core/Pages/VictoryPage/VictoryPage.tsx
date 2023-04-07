import React, { type FC, ReactElement } from 'react';

import enemy from '../../../assents/images/enemy.png';

import cl from './VictoryPage.module.scss';

interface IProps {
  countScores: [number, number];
}

const VictoryPage: FC<IProps> = ({ countScores }): ReactElement => {
  const [killedEnemies, usedLives] = countScores;
  const victoryScore = 100;
  const score = 50;
  const total = killedEnemies * score + victoryScore - usedLives * 30;

  return (
    <div className={cl.victory__page}>
      <h1 className={cl.victory__pageTitle}>Вы победили !</h1>
      <div className={cl.victory__pageContainer}>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Убито противников: {killedEnemies}</h2>
          <img className={cl.victory__pageEnemy} src={enemy.src} alt="" />
        </div>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Победа: {victoryScore}</h2>
        </div>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Потрачено жизней: {usedLives}</h2>
        </div>
      </div>
      <div className={cl.victory__pageFooter}>
        <div className={cl.victory__pageUnderline} />
        <span className={cl.victory__pageTotal}>Общий счет: {total}</span>
      </div>
    </div>
  );
};

export default VictoryPage;
