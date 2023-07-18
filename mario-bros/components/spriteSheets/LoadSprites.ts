import loadImage from '../levels/loadLevel';
import tilesImage from '../../assets/imgSprites/tiles.png';
import marioImage from '../../assets/imgSprites/mario_and_items.png';

import SpriteSheets from './SpriteSheets';

export const loadBackgroundSprites = () =>
  loadImage(tilesImage).then((image) => {
    const sprites = new SpriteSheets(image, 16, 16);
    sprites.defineTile('ground', 0, 0);
    sprites.defineTile('sky', 10, 7);
    return sprites;
  });

export const loadMarioSprites = () =>
  loadImage(marioImage).then((image) => {
    const sprites = new SpriteSheets(image, 16, 16);
    sprites.define('idle', 2, 73, 16, 18);
    return sprites;
  });
