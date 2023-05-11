import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import spaceship3 from '../../images/spaceships/Spaceship3.svg';
import asteroid1 from '../../images/asteroids/asteroid1.png';
import spaceFon from '../../images/background/spaceFon.jpg';
import spaceshipInFire from '../../images/spaceships/SpaceshipInFire.png';
import playagain from '../../images/playagain.jpg';
import {
  getSpaceshipState,
  goLeft,
  goRight,
  setTimestamp,
  addAsteroid,
  goAsteroid,
  goBackground,
  addBackground,
  addStar,
  goStar,
  repeatStars,
  fly,
  gameOver,
  getMousePosition,
} from '../../store/spaceshipSlice';
import { inRad } from '../../assests/inRad';
import { store } from '../../../store';

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
  const imagePlayAgain: HTMLImageElement = new Image();
  imagePlayAgain.src = playagain.src;
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyA') {
      dispatch(goLeft());
    } else if (event.code === 'KeyD') {
      dispatch(goRight());
    }
  };
  const onMouseDown = (event: React.MouseEvent) => {
    const mousePosition = { x: event.clientX, y: event.clientY };
    dispatch(getMousePosition(mousePosition));
  };

  const animate = (context: CanvasRenderingContext2D) => {
    dispatch(fly());
    const state = store.getState();
    const stateSpaceship = getSpaceshipState(state);
    context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    context.fillRect(0, 0, widthScreen, heightScreen);
    // for (let i = 0; i < 150; i++) {
    //   const newStar = star();
    //   dispatch(addStar({ newStar }));
    // }
    // for (let i = 0; i < stateSpaceship.stars.length; i++) {
    //   context.fillStyle = `rgba(255,255,255,${stateSpaceship.stars[i].opacity})`;
    //   context.fillRect(stateSpaceship.stars[i].x, stateSpaceship.stars[i].y, 1, 1);
    //   dispatch(goStar(i));
    //   if (stateSpaceship.stars[i].y === 0) {
    //     dispatch(repeatStars());
    //   }
    // }
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
        asteroid,
        stateSpaceship.asteroids[i].x,
        stateSpaceship.asteroids[i].y,
        stateSpaceship.asteroidsWidth,
        stateSpaceship.asteroidsHeight,
      );
      dispatch(goAsteroid(i));
      if (stateSpaceship.asteroids[i].y === 300) {
        const randomX = Math.floor(Math.random() * widthScreen);
        const newAsteroid = { x: randomX, y: -200 };
        dispatch(addAsteroid({ newAsteroid }));
      } else if (
        stateSpaceship.spaceshipXpos + stateSpaceship.widthSpaceship >=
          stateSpaceship.asteroids[i].x &&
        stateSpaceship.spaceshipXpos <=
          stateSpaceship.asteroids[i].x + stateSpaceship.asteroidsWidth &&
        stateSpaceship.spaceshipYpos <=
          stateSpaceship.asteroids[i].y + stateSpaceship.asteroidsHeight
      ) {
        dispatch(gameOver());
      }
    }
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
      dispatch(setTimestamp());
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
      context.drawImage(imagePlayAgain, widthScreen / 2 - 300, heightScreen / 2 - 300, 600, 600);
    }
  };
  useEffect(() => {
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    canvas.current.focus();
    if (context) {
      window.requestAnimationFrame(() => animate(context));
    }
    return () => {
      cancelAnimationFrame(window.requestAnimationFrame(() => animate(context)));
    };
  }, []);

  return (
    <canvas
      onKeyDown={onKeyDown}
      ref={canvas}
      tabIndex={0}
      width={widthScreen}
      height={heightScreen}
      className={classes.canvas}
      onMouseDown={onMouseDown}
    />
  );
};

export default Canvas;
