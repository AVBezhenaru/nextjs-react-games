import React, { type FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, store } from '../../../../store';
import mainImage from '../../../assets/images/background.png';
import { tanksGameStartAction, tanksGameLoadingAction } from '../../../reducers/tanksGameAction';
import { useAppSelector } from '../../../../hooks';
import LoadingPage from '../LoadingPage/LoadingPage';

import cl from './MainPage.module.scss';
import MainButton from './MainButton/MainButton';

const MainPage: FC = (): ReactElement => {
  const game = useAppSelector((state) => state.tanks);
  const dispatch = useDispatch<AppDispatch>();
  const levelIntro = new Audio('/audio/tanks/level-intro.mp3');

  const startGame = () => {
    levelIntro.play();
    dispatch(tanksGameLoadingAction(true));
    setTimeout(() => {
      dispatch(tanksGameStartAction(true));
    }, 4000);
  };

  return !game.gameLoading ? (
    <div className={cl.main__page}>
      <div className={cl.main__pageContainer}>
        <img src={mainImage.src} alt="" className={cl.main__pageImage} />
        <div className={cl.main__pageButtons}>
          <MainButton func={startGame}>1 игрок</MainButton>
          <MainButton>2 игрока</MainButton>
          <MainButton>уровень</MainButton>
          <MainButton>Выход</MainButton>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage title={`Уровень ${store.getState().tanks.stage}`} />
  );
};

export default MainPage;
