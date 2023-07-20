import { useEffect, useRef } from 'react';

import Timer from './Timer';
import Camera from './Camera';
import { createMario } from './MarioEntity';
import { loadLevel } from './levels/loadLevel';
import { createCameraLayer, createCollisionLayer } from './Layers';
import { setupKeyboard } from './setupKeyboard';
import styles from './game.module.scss';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    Promise.all([createMario(), loadLevel()]).then(([mario, loadLevel]) => {
      const camera = new Camera();
      mario.pos.set(80, 186);

      // uncomment this for debugging
      // loadLevel.comp.layers.push(createCollisionLayer(loadLevel), createCameraLayer(camera));
      createCollisionLayer(loadLevel);
      createCameraLayer(camera);

      loadLevel.entities.add(mario);

      const input = setupKeyboard(mario);
      input.listenTo(window);

      const timer = new Timer(1 / 30);

      timer.update = function update(deltaTime: number) {
        loadLevel.update(deltaTime);

        if (mario.pos.x > 200) {
          camera.pos.x = mario.pos.x - 200;
        }

        loadLevel.comp.draw(ctx, camera);
      };

      timer.start();
    });
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} width="600" height="400" />;
};

export { Game };
