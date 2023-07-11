import { createBackgroundLayer, createSpriteLayer } from '../Layers';

import firstLvl from './1-1.json';
import { loadBackgroundSprites } from '../spriteSheets/LoadSprites';
import Level from '../Level';

export default function loadImage(url: any) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 1000, image);
    });
    image.src = url.src;
  });
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
      const xEnd = xStart + xLen;
      const yEnd = yStart + yLen;
      for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
}

export function loadLevel() {
  return Promise.all([firstLvl, loadBackgroundSprites()]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}
