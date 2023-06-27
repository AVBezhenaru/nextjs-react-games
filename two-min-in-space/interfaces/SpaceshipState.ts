interface BackgroundInterface {
  x: number;
  y: number;
}

interface AsteroidsInterface {
  x: number;
  y: number;
  image: null | HTMLImageElement;
  width: number;
  height: number;
}

interface RocketsInterface {
  x: number;
  y: number;
}

interface MousePositionInterface {
  x: number;
  y: number;
}

interface TimeGameInterface {
  min: number;
  sec: number;
}

interface SavePlayerResultInterface {
  min: number;
  sec: number;
}

interface SpaceshipState {
  widthSpaceship: number;
  heightSpaceship: number;
  background: Array<BackgroundInterface>;
  asteroids: Array<AsteroidsInterface>;
  rockets: Array<RocketsInterface>;
  spaceshipXpos: number;
  spaceshipYpos: number;
  spaceshipSpeedX: number;
  spaceshipSpeedY: number;
  currentDegrees: number;
  currentDegreesRockets: number;
  speed: number;
  speedAsteroids: number;
  speedRockets: number;
  rocketsWidth: number;
  rocketsHeight: number;
  gameOver: boolean;
  playAgain: boolean;
  mousePosition: MousePositionInterface;
  currentRocket: number;
  goaway: boolean;
  timeGame: TimeGameInterface;
  savePlayerResult: SavePlayerResultInterface;
  win: boolean;
  heightScreen: number;
  widthScreen: number;
  offsetX: number;
  offsetY: number;
}

export default SpaceshipState;
