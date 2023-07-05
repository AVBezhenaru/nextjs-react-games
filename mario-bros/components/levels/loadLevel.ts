import { createBackgroundLayer, createSpriteLayer } from '../Layers';

import firstLvl from '../levels/1-1.json';

export default function loadImage(url: any) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 1000, image);
    });
    image.src = url.src;
  });
}

export function loadLevel() {
  return fetch('../levels/1-1.json').then((levelSpec: any) => {
    console.log(levelSpec);
    const level = firstLvl;
    const backgroundLayer = createBackgroundLayer(firstLvl.backgrounds, sprites);
    comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    return level;
  });
}
