import { createSlice } from '@reduxjs/toolkit';

import { sinAndCos } from '../assests/sinAndCos';
import { RootState } from '../../store';
import { getCurrentDegreesRockets } from '../assests/getCurrentDegreesRockets';

export const getSpaceshipState = (state: RootState) => state.spaceship;
const spaceshipSlice = createSlice({
  name: 'spaceship',
  initialState: {
    widthSpaceship: 60,
    heightSpaceship: 60,
    background: [{ x: 0, y: 0 }],
    asteroids: [{ x: 200, y: 0, image: null, width: 80, height: 80 }],
    rockets: [{ x: 200, y: 0 }],
    spaceshipXpos: 600,
    spaceshipYpos: 1000,
    spaceshipSpeedX: 3,
    spaceshipSpeedY: 3,
    currentDegrees: 0,
    currentDegreesRockets: 0,
    speed: 3,
    speedAsteroids: 0.5,
    speedRockets: 3,
    rocketsWidth: 40,
    rocketsHeight: 60,
    gameOver: false,
    playAgain: false,
    mousePosition: { x: 0, y: 0 },
    currentRocket: 0,
    goaway: false,
    timeGame: { min: 2, sec: 0 },
    savePlayerResult: { min: 0, sec: 0 },
    win: false,
  },
  reducers: {
    fly(state) {
      state.mousePosition = { x: 0, y: 0 };
      state.spaceshipYpos -= state.spaceshipSpeedY * sinAndCos(state.currentDegrees).cos;
      state.spaceshipXpos += state.spaceshipSpeedX * sinAndCos(state.currentDegrees).sin;
    },
    hunt(state, action) {
      if (!state.goaway) {
        state.rockets[action.payload].x -=
          state.speedRockets * sinAndCos(state.currentDegreesRockets).sin;
        state.rockets[action.payload].y +=
          state.speedRockets * sinAndCos(state.currentDegreesRockets).cos;
        if (state.rockets[action.payload].y > state.spaceshipYpos) {
          state.rockets[action.payload].y +=
            state.speedRockets * sinAndCos(state.currentDegreesRockets).cos;
          state.rockets[action.payload].x -=
            state.speedRockets * sinAndCos(state.currentDegreesRockets).sin;
        }
      }
      if (state.goaway) {
        state.rockets[action.payload].x += state.speedRockets;
        state.rockets[action.payload].y += state.speedRockets;
      }
    },
    changeMotionVectorRockets(state) {
      state.currentDegreesRockets = getCurrentDegreesRockets(
        state.spaceshipXpos,
        state.spaceshipYpos,
        state.rockets[state.currentRocket],
      );
    },
    goawayRocket(state) {
      state.goaway = true;
      const newRocket = { x: -50, y: -400 + state.spaceshipYpos };
      state.rockets = [...state.rockets, newRocket];
    },
    goNewRocket(state) {
      state.currentRocket += 1;
      state.goaway = false;
    },
    goLeft(state) {
      state.currentDegrees -= 5;
      if (state.currentDegrees === -360) {
        state.currentDegrees = 0;
      }
      state.spaceshipXpos += state.speed * sinAndCos(state.currentDegrees).sin;
    },
    goRight(state) {
      state.currentDegrees += 5;
      if (state.currentDegrees === 360) {
        state.currentDegrees = 0;
      }
      state.spaceshipYpos -= state.speed * sinAndCos(state.currentDegrees).cos;
    },
    addAsteroid(state, action) {
      state.asteroids = [...state.asteroids, action.payload.newAsteroid];
    },
    goAsteroid(state, action) {
      state.asteroids[action.payload].y += state.speedAsteroids;
    },
    goBackground(state, action) {
      state.background[action.payload].y += state.speedAsteroids;
    },
    addBackground(state, action) {
      state.background = [...state.background, action.payload.repeatBackground];
    },
    gameOver(state) {
      state.gameOver = true;
    },
    dropTime(state) {
      if (state.timeGame.min > 0) {
        if (state.timeGame.sec > 0) {
          // eslint-disable-next-line operator-assignment
          state.timeGame.sec = state.timeGame.sec - 1;
        } else if (state.timeGame.sec === 0) {
          // eslint-disable-next-line operator-assignment
          state.timeGame.min = state.timeGame.min - 1;
          state.timeGame.sec = 59;
        }
      } else if (state.timeGame.min === 0) {
        if (state.timeGame.sec > 0) {
          // eslint-disable-next-line operator-assignment
          state.timeGame.sec = state.timeGame.sec - 1;
        } else if (state.timeGame.sec === 0) {
          state.timeGame.min = 0;
          state.timeGame.sec = 0;
          state.win = true;
        }
      }
    },
  },
});
export default spaceshipSlice.reducer;
export const {
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
  dropTime,
  goNewRocket,
} = spaceshipSlice.actions;
