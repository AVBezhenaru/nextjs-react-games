import { useEffect, useRef } from 'react';

import styles from './game.module.scss';
import { createMario } from './MarioEntity';
import Timer from './Timer';
import { loadLevel } from './levels/loadLevel';
import { createCameraLayer, createCollisionLayer } from "./Layers";
import { setupKeyboard } from './setupKeyboard';
import Camera from './Camera';
import { setupMouseControl } from './Debug';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([createMario(), loadLevel()]).then(([mario, loadLevel]) => {
      const camera = new Camera();
      mario.pos.set(64, 64);

      loadLevel.comp.layers.push(createCollisionLayer(loadLevel), createCameraLayer(camera));
      // mario.vel.set(50, -210);

      loadLevel.entities.add(mario);

      const input = setupKeyboard(mario);
      input.listenTo(window);
      setupMouseControl(canvas, mario, camera);

      const timer = new Timer(1 / 30);

      timer.update = function update(deltaTime: any) {
        loadLevel.update(deltaTime);
        loadLevel.comp.draw(ctx, camera);
      };

      timer.start();
    });
  }, []);
  // width="960" height="400" base
  return <canvas ref={canvasRef} className={styles.canvas} width="800" height="640" />;
};

export { Game };
