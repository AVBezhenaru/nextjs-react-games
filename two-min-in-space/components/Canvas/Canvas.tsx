import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import Popup from '../Popup/Popup';
import spaceship3 from '../../images/spaceships/Spaceship3.svg';
import asteroid1 from '../../images/asteroids/asteroid1.png';
import asteroid2 from '../../images/asteroids/asteroid2.png';
import asteroid3 from '../../images/asteroids/asteroid3.png';
import spaceFon from '../../images/background/spaceFon.jpg';
import spaceshipInFire from '../../images/spaceships/SpaceshipInFire.png';
import playagain from '../../images/playagain.jpg';
import rockets from '../../images/rocket/Rocket.png';
import moonImg from '../../images/planets/moon.png';
import {
  getSpaceshipState,
  goLeft,
  goRight,
  goFaster,
  goSlower,
  addAsteroid,
  goAsteroid,
  // goBackground,
  // addBackground,
  fly,
  gameOver,
  hunt,
  changeMotionVectorRockets,
  goawayRocket,
  goNewRocket,
  dropTime,
  setInitialSpeed,
  resetGameState,
  setScreenDimensions,
} from '../../store/spaceshipSlice';
import { inRad } from '../../assests/inRad';
import { store } from '../../../store';
import { getRandomArrayElem } from '../../assests/getRandomArrayElem';
import { checkCollision } from '../../assests/checkCollision';

import classes from './Canvas.module.css';

type CanvasProps = {
  onGoToStart: () => void;
};

const Canvas: FC<CanvasProps> = ({ onGoToStart }) => {
  const widthScreen = window.innerWidth;
  const heightScreen = window.innerHeight;
  const imageSpaceship: HTMLImageElement = new Image();
  imageSpaceship.src = spaceship3.src;
  const imageSpaceshipInFire: HTMLImageElement = new Image();
  imageSpaceshipInFire.src = spaceshipInFire.src;
  const space: HTMLImageElement = new Image();
  space.src = spaceFon.src;
  const asteroid: HTMLImageElement = new Image();
  asteroid.src = asteroid1.src;
  const asteroidTwo: HTMLImageElement = new Image();
  asteroidTwo.src = asteroid2.src;
  const asteroidThree: HTMLImageElement = new Image();
  asteroidThree.src = asteroid3.src;
  const arrayGabaritsAsteroids = [60, 70, 80, 90, 100];
  const imagePlayAgain: HTMLImageElement = new Image();
  imagePlayAgain.src = playagain.src;
  const imageRocket: HTMLImageElement = new Image();
  imageRocket.src = rockets.src;
  const imageMoon: HTMLImageElement = new Image();
  imageMoon.src = moonImg.src;
  const arrayAsteroids = [
    { image: asteroid },
    { image: asteroidTwo },
    { image: asteroidThree },
    {
      image: imageMoon,
      width: 600,
      height: 300,
    },
  ];
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const playEnd = useRef<HTMLButtonElement | null>(null);
  const playAgain = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();

  dispatch(setScreenDimensions({ heightScreen, widthScreen }));

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyA') {
      dispatch(goLeft());
    } else if (event.code === 'KeyD') {
      dispatch(goRight());
    } else if (event.code === 'KeyW') {
      dispatch(goFaster());
    } else if (event.code === 'KeyS') {
      dispatch(goSlower());
    }
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyW' || event.code === 'KeyS') {
      dispatch(setInitialSpeed());
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const animate = (context: CanvasRenderingContext2D) => {
    const state = store.getState();
    const stateSpaceship = getSpaceshipState(state);
    // const { x: spaceshipXpos, y: spaceshipY } = stateSpaceship.spaceship
    dispatch(fly());
    dispatch(hunt(stateSpaceship.currentRocket));
    const timeString = `${stateSpaceship.timeGame.min} : ${stateSpaceship.timeGame.sec}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    context.fillRect(0, 0, widthScreen, heightScreen);
    // прокрутка фона
    // console.log(stateSpaceship);
    for (let i = 0; i < stateSpaceship.background.length; i++) {
      const item = stateSpaceship.background[i];
      const x = (item.x - stateSpaceship.spaceshipXpos / 10) % widthScreen;
      const y = (item.y - stateSpaceship.spaceshipYpos / 10) % heightScreen;
      context.drawImage(space, x, y, widthScreen, heightScreen);
      context.drawImage(space, x - widthScreen, y, widthScreen, heightScreen);
      context.drawImage(space, x, y - heightScreen, widthScreen, heightScreen);
      context.drawImage(space, x - widthScreen, y - heightScreen, widthScreen, heightScreen);
    }
    // отображение астероидов на холсте, их движению и проверке столкновения с космическим кораблем
    for (let i = 0; i < stateSpaceship.asteroids.length; i++) {
      context.drawImage(
        stateSpaceship.asteroids[i].image || asteroid,
        stateSpaceship.asteroids[i].x,
        stateSpaceship.asteroids[i].y,
        stateSpaceship.asteroids[i].width,
        stateSpaceship.asteroids[i].height,
      );

      dispatch(goAsteroid(i));
      if (stateSpaceship.asteroids[i].y === 300) {
        const randomX = Math.floor(Math.random() * widthScreen);
        const randomAsteroid = getRandomArrayElem(arrayAsteroids);
        const randomSizeAsteroid = getRandomArrayElem(arrayGabaritsAsteroids);
        const newAsteroid = {
          x: randomX,
          y: -300,
          image: arrayAsteroids[randomAsteroid].image,
          width: arrayAsteroids[randomAsteroid].width || arrayGabaritsAsteroids[randomSizeAsteroid],
          height:
            arrayAsteroids[randomAsteroid].height || arrayGabaritsAsteroids[randomSizeAsteroid],
        };
        dispatch(addAsteroid({ newAsteroid }));
      }

      if (
        checkCollision(
          stateSpaceship.spaceshipXpos,
          stateSpaceship.spaceshipYpos,
          stateSpaceship.widthSpaceship,
          stateSpaceship.heightSpaceship,
          stateSpaceship.asteroids[i].x,
          stateSpaceship.asteroids[i].y,
          stateSpaceship.asteroids[i].width,
          stateSpaceship.asteroids[i].height,
        )
      ) {
        dispatch(gameOver());
      }
    }
    context.fillStyle = '#09E409';
    context.font = '48px roboto';
    context.fillText(timeString, widthScreen / 2 - 80, 80);
    context.fill();
    context.save();
    context.translate(
      stateSpaceship.rockets[stateSpaceship.currentRocket].x + stateSpaceship.rocketsWidth / 2,
      stateSpaceship.rockets[stateSpaceship.currentRocket].y + stateSpaceship.rocketsHeight / 2,
    );
    // ??
    context.rotate(inRad(stateSpaceship.currentDegreesRockets));
    context.translate(
      -(stateSpaceship.rockets[stateSpaceship.currentRocket].x + stateSpaceship.rocketsWidth),
      -(stateSpaceship.rockets[stateSpaceship.currentRocket].y + stateSpaceship.rocketsHeight),
    );
    context.drawImage(
      imageRocket,
      stateSpaceship.rockets[stateSpaceship.currentRocket].x,
      stateSpaceship.rockets[stateSpaceship.currentRocket].y,
      stateSpaceship.rocketsWidth,
      stateSpaceship.rocketsHeight,
    );

    // проверяет наличие столкновения между двумя объектами на холсте,
    // restore() восстанавливает последнее сохраненное состояние контекста,  save(), чтобы сохранить
    // текущее состояние контекста рисования
    if (
      checkCollision(
        stateSpaceship.spaceshipXpos,
        stateSpaceship.spaceshipYpos,
        stateSpaceship.widthSpaceship,
        stateSpaceship.heightSpaceship,
        stateSpaceship.rockets[stateSpaceship.currentRocket].x,
        stateSpaceship.rockets[stateSpaceship.currentRocket].y,
        stateSpaceship.rocketsWidth,
        stateSpaceship.rocketsHeight,
      )
    ) {
      dispatch(gameOver());
    }
    context.restore();
    context.save();
    context.translate(
      stateSpaceship.spaceshipXpos + stateSpaceship.widthSpaceship / 2,
      stateSpaceship.spaceshipYpos + stateSpaceship.heightSpaceship / 2,
    );
    context.rotate(inRad(stateSpaceship.currentDegrees));
    context.translate(
      -(stateSpaceship.spaceshipXpos + stateSpaceship.widthSpaceship / 2),
      -(stateSpaceship.spaceshipYpos + stateSpaceship.heightSpaceship / 2),
    );
    if (!stateSpaceship.gameOver) {
      context.drawImage(
        imageSpaceship,
        stateSpaceship.spaceshipXpos - stateSpaceship.widthSpaceship / 2,
        stateSpaceship.spaceshipYpos - stateSpaceship.heightSpaceship / 2,
        stateSpaceship.widthSpaceship,
        stateSpaceship.heightSpaceship,
      );
      context.restore();
      window.requestAnimationFrame(() => animate(context));
    } else {
      context.drawImage(
        imageSpaceshipInFire,
        stateSpaceship.spaceshipXpos,
        stateSpaceship.spaceshipYpos,
        stateSpaceship.widthSpaceship,
        stateSpaceship.heightSpaceship,
      );
      cancelAnimationFrame(window.requestAnimationFrame(() => animate(context)));
      context.restore();
      playAgain.current.style.display = 'block';
      setShowButton(true);
    }
    if (stateSpaceship.win) {
      playEnd.current.style.display = 'block';
      setShowButton(true);
    }
  };

  const handleYesClick = () => {
    setShowConfirm(false);
    setShowButton(false);
    dispatch(resetGameState());
    playAgain.current.style.display = 'none';
    playEnd.current.style.display = 'none';
  };

  const handleNoClick = () => {
    setShowConfirm(false);
    setShowButton(false);
    onGoToStart();
    dispatch(resetGameState());
  };

  const handleOpenPopup = () => {
    setShowConfirm(true);
  };

  useEffect(() => {
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    canvas.current.focus();
    const timer = setInterval(() => {
      dispatch(dropTime());
    }, 1000);
    const timerChangeMotion = setInterval(() => {
      dispatch(changeMotionVectorRockets());
    }, 1000);

    const state = store.getState();
    const stateSpaceship = getSpaceshipState(state);
    const totalSeconds = stateSpaceship.timeGame.min * 60 + stateSpaceship.timeGame.sec;
    console.log(totalSeconds);
    const timerGoNewRocket = setInterval(
      () => {
        dispatch(goNewRocket());
      },
      totalSeconds < 30 ? 7000 : totalSeconds < 60 ? 5000 : 3000,
    );
    const timerGoawayCurrenRocket = setInterval(() => {
      dispatch(goawayRocket());
    }, 6000);
    if (context) {
      window.requestAnimationFrame(() => animate(context));
    }
    return () => {
      cancelAnimationFrame(window.requestAnimationFrame(() => animate(context)));
      clearInterval(timer);
      clearInterval(timerGoNewRocket);
      clearInterval(timerGoawayCurrenRocket);
      clearInterval(timerChangeMotion);
    };
  }, [handleYesClick, changeMotionVectorRockets]);

  return (
    <div className={classes.wrapper}>
      <button
        type="button"
        className={classes.repeat}
        aria-label="play again"
        // onClick={gameRepeat}
        ref={playAgain}
      />
      {showButton && (
        <div>
          <button type="button" className={classes.PopupButton} onClick={handleOpenPopup}>
            Play again?
          </button>
          {showConfirm && (
            <Popup title="Are you sure?" onYes={handleYesClick} onNo={handleNoClick} />
          )}
        </div>
      )}

      <button
        type="button"
        aria-label="you win"
        // onClick={gameRepeat}
        ref={playEnd}
        className={classes.end}
      />
      <canvas
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ref={canvas}
        tabIndex={0}
        width={widthScreen}
        height={heightScreen}
        className={classes.canvas}
      />
    </div>
  );
};

export default Canvas;
