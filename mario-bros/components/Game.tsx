import { useEffect, useRef } from 'react';

import firstLvl from './levels/1-1.json';
import styles from './game.module.scss';
import Compositor from './Compositor';
import { createMario } from './MarioEntity';
import { loadBackgroundSprites } from './spriteSheets/LoadSprites';
import { createBackgroundLayer, createSpriteLayer } from './Layers';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([loadBackgroundSprites(), firstLvl, createMario()]).then(
      ([sprites, firstLvl, mario]) => {
        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(firstLvl.backgrounds, sprites);
        comp.layers.push(backgroundLayer);

        const gravity = 0.5;

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        const update = () => {
          comp.draw(ctx);

          mario.update();
          mario.vel.y += gravity;

          // requestAnimationFrame(update);
          setTimeout(update, 1000 / 30);
        };

        update();
      },
    );
  }, []);
  // width="960" height="400" base
  return <canvas ref={canvasRef} className={styles.canvas} width="1200" height="500" />;
};

export { Game };
