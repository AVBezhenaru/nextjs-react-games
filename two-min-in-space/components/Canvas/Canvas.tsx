import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

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
  addAsteroid,
  goAsteroid,
  goBackground,
  addBackground,
  fly,
  gameOver,
  hunt,
  changeMotionVectorRockets,
  goawayRocket,
  goNewRocket,
  dropTime,
} from '../../store/spaceshipSlice';
import { inRad } from '../../assests/inRad';
import { store } from '../../../store';
import { getRandomArrayElem } from '../../assests/getRandomArrayElem';
import { checkCollision } from '../../assests/checkCollision';

import classes from './Canvas.module.css';

const Canvas: FC = () => {
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
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyA') {
      dispatch(goLeft());
    } else if (event.code === 'KeyD') {
      dispatch(goRight());
    }
  };
  const animate = (context: CanvasRenderingContext2D) => {
    const state = store.getState();
    const stateSpaceship = getSpaceshipState(state);
    dispatch(fly());
    dispatch(hunt(stateSpaceship.currentRocket));
    const timeString = `${stateSpaceship.timeGame.min} : ${stateSpaceship.timeGame.sec}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    context.fillRect(0, 0, widthScreen, heightScreen);
    for (let i = 0; i < stateSpaceship.background.length; i++) {
      context.drawImage(
        space,
        stateSpaceship.background[i].x,
        stateSpaceship.background[i].y,
        widthScreen,
        heightScreen,
      );
      dispatch(goBackground(i));
      if (stateSpaceship.background[i].y === 0) {
        const repeatBackground = { x: 0, y: -heightScreen };
        dispatch(addBackground({ repeatBackground }));
      }
    }
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
        stateSpaceship.spaceshipXpos,
        stateSpaceship.spaceshipYpos,
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
    }
    if (stateSpaceship.win) {
      playEnd.current.style.display = 'block';
    }
  };
  const gameRepeat = () => {
    location.reload();
  };
  useEffect(() => {
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    canvas.current.focus();
    const timer = setInterval(() => {
      dispatch(changeMotionVectorRockets());
      dispatch(dropTime());
    }, 1000);
    const timerGoNewRocket = setInterval(() => {
      dispatch(goNewRocket());
    }, 20000);
    const timerGoawayCurrenRocket = setInterval(() => {
      dispatch(goawayRocket());
    }, 15000);
    if (context) {
      window.requestAnimationFrame(() => animate(context));
    }
    return () => {
      cancelAnimationFrame(window.requestAnimationFrame(() => animate(context)));
      clearInterval(timer);
      clearInterval(timerGoNewRocket);
      clearInterval(timerGoawayCurrenRocket);
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <button
        type="button"
        aria-label="play again"
        onClick={gameRepeat}
        ref={playAgain}
        className={classes.repeat}
      />
      <button
        type="button"
        aria-label="you win"
        onClick={gameRepeat}
        ref={playEnd}
        className={classes.end}
      />
      <canvas
        onKeyDown={onKeyDown}
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
