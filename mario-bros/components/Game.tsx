import { useEffect, useRef } from 'react';

import styles from './game.module.scss';
import Compositor from './Compositor';
import { createMario } from './MarioEntity';
import { loadBackgroundSprites } from './spriteSheets/LoadSprites';
import { createBackgroundLayer, createSpriteLayer } from './Layers';
import Timer from './Timer';
import KeyboardState from './KeyboardState';
import { loadLevel } from "./levels/loadLevel";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([loadBackgroundSprites(), loadLevel, createMario()]).then(
      ([sprites, loadLevel, mario]) => {
        console.log(loadLevel);

        const gravity = 2;
        mario.pos.set(150, 50);
        mario.vel.set(50, -210);

        const SPACE = 32;
        const input = new KeyboardState();
        input.addMapping(SPACE, (keyState) => {
          if (keyState) {
            mario.jump.start();
          } else {
            mario.jump.cancel();
          }
          console.log(keyState);
        });
        input.listenTo(window);



        const timer = new Timer(1 / 30);

        timer.update = function update(deltaTime: any) {
          mario.update(deltaTime);
          comp.draw(ctx);
          mario.vel.y += gravity;
        };

        timer.start();
      },
    );
  }, []);
  // width="960" height="400" base
  return <canvas ref={canvasRef} className={styles.canvas} width="800" height="640" />;
};

export { Game };
