import { useEffect, useRef } from 'react';

import styles from './game.module.scss';
import { createMario } from './MarioEntity';
import Timer from './Timer';
import KeyboardState from './KeyboardState';
import { loadLevel } from './levels/loadLevel';
import { createCollisionLayer } from "./Layers";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([createMario(), loadLevel()]).then(([mario, loadLevel]) => {
      console.log(loadLevel);

      const gravity = 2;
      mario.pos.set(64, 64);
      createCollisionLayer(loadLevel);
      // mario.vel.set(50, -210);

      loadLevel.entities.add(mario);

      const SPACE = 32;
      const input = new KeyboardState();
      input.addMapping(SPACE, (keyState) => {
        if (keyState) {
          mario.jump.start();
        } else {
          mario.jump.cancel();
        }
      });
      input.listenTo(window);

      ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
          if (event.buttons === 1) {
            mario.vel.set(0, 0);
            mario.pos.set(event.offsetX, event.offsetY);
          }
        });
      });

      const timer = new Timer(1 / 30);

      timer.update = function update(deltaTime: any) {
        loadLevel.update(deltaTime);
        loadLevel.comp.draw(ctx);
        mario.vel.y += gravity;
      };

      timer.start();
    });
  }, []);
  // width="960" height="400" base
  return <canvas ref={canvasRef} className={styles.canvas} width="800" height="640" />;
};

export { Game };
