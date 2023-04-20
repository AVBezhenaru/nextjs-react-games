import React, { type FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../store';
import {
  tanksGameCountKill,
  tanksGameLoadingAction,
  tanksGameStartAction,
} from '../../../reducers/tanksGameAction';
import { useAppSelector } from '../../../../hooks';
import LoadingPage from '../LoadingPage/LoadingPage';
import enemy from '../../../assets/images/enemy.png';
import MainButton from '../MainPage/MainButton/MainButton';

import cl from './VictoryPage.module.scss';

const VictoryPage: FC = (): ReactElement => {
  const victoryScore = useAppSelector((state) => state.tanks.totalPoints);
  const killPerRound = useAppSelector((state) => state.tanks.countKilledPerRound);
  const killAll = useAppSelector((state) => state.tanks.countKilledAll);
  const dispatch = useDispatch<AppDispatch>();
  const levelIntro = new Audio('/audio/tanks/level-intro.mp3');
  const game = useAppSelector((state) => state.tanks);

  const startGame = () => {
    dispatch(tanksGameCountKill(false));
    levelIntro.play();
    dispatch(tanksGameLoadingAction(true));
    setTimeout(() => {
      dispatch(tanksGameStartAction(true));
    }, 4000);
  };

  return !game.gameLoading ? (
    <div className={cl.victory__page}>
      <h1 className={cl.victory__pageTitle}>Вы победили !</h1>
      <div className={cl.victory__pageContainer}>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Убито противников: {killPerRound}</h2>
          <img className={cl.victory__pageEnemy} src={enemy.src} alt="" />
        </div>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Всего очков: {victoryScore}</h2>
        </div>
        <div className={cl.victory__pageContainer__box}>
          <h2 className={cl.victory__pageSubtitle}>Всего убито противников: {killAll}</h2>
        </div>
      </div>
      <div className={cl.victory__pageFooter}>
        <div className={cl.victory__pageUnderline} />
        <MainButton func={startGame}>Следующий уровень</MainButton>
      </div>
    </div>
  ) : (
    <LoadingPage title={`Уровень ${game.stage + 1}`} />
  );
};

export default VictoryPage;
