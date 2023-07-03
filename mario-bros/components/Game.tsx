import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import testing from '../assets/imgSprites/tiles.png';
import marioImage from '../assets/imgSprites/mario_and_items.png';

import styles from './game.module.scss';
import firstLevel from './levels/1-1.json';
import SpriteSheets from './spriteSheets/SpriteSheets';

const deltas = {
  ArrowRight: { x: 1, y: 0 },
  ArrowLeft: { x: -1, y: 0 },
};
const Game = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [time, setTime] = useState(0);
  const [keysDown, setKeysDown] = useState([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 300, y: 0 });
  const size = 50;
  const speed = 5;
  const gravity = 1;
  const drag = 0.9;
  const jumpVelocity = 12;
  const w = 1000;
  const h = 400;

  function drawBackground(bg: any, ctx: any, sprites: any) {
    bg.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          sprites.drawTile(bg.tile, ctx, x, y);
        }
      }
    });
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const background = new Image();
    const marioSprite = new Image();
    background.src = testing.src;
    background.onload = () => {
      const sprites = new SpriteSheets(background, 16, 16);
      sprites.defineTile('ground', 0, 0);
      sprites.defineTile('sky', 10, 7);
      firstLevel.backgrounds.forEach(bg => {
        drawBackground(bg, ctx, sprites);
      });
    };
    const groundTiles = firstLevel.backgrounds.find((bg) => bg.tile === 'ground');
    const groundHeight = groundTiles ? groundTiles.ranges[0][3] : h;

    marioSprite.src = marioImage.src;
    marioSprite.onload = () => {
      const sprites = new SpriteSheets(marioSprite, 42, 42);
      sprites.define('idle', 2, 73, 16, 18);
      const marioWidth = 400; // Ширина спрайта Марио
      const marioX = (position.x - marioWidth) / 2; // Позиция Марио по X
      const marioY = (position.y - groundHeight + size) / 1.12; // Позиция Марио по Y на поверхности 'ground'
      sprites.draw('idle', ctx, marioX, marioY);
    };

    for (const key of keysDown) {
      if ((key === 'ArrowUp' || key === 'Space') && position.y + size >= h) {
        setVelocity((prev) => ({
          x: prev.x,
          y: -jumpVelocity,
        }));
      } else if (key in deltas) {
        const { x, y } = deltas[key];
        setVelocity((prev) => ({
          x: x ? x * speed : prev.x,
          y: y ? y * speed : prev.y,
        }));
      }
    }

    setVelocity((prev) => ({
      x: prev.x * drag,
      y: prev.y + gravity,
    }));
    setPosition((prev) => ({
      x: prev.x + velocity.x,
      y: prev.y + velocity.y >= h - size ? h - size : prev.y + velocity.y,
    }));
  }, [time]);

  const handleKeyDown = (event) => {
    const { code } = event;

    if (!keysDown.includes(code)) {
      setKeysDown((prev) => [code, ...prev]);
    }

    if (code.startsWith('Arrow') || code === 'Space') {
      event.preventDefault();
    }
  };
  const handleKeyUp = (event) => {
    setKeysDown((prev) => prev.filter((e) => e !== event.code));

    if (event.code.startsWith('Arrow')) {
      event.preventDefault();
    }
  };

  const update = useCallback((timestamp: any) => {
    setTime(timestamp);

    requestRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.height = h;
    canvas.width = w;
    const startTime = performance.now();
    let lastUpdateTime = 0;
    const animate = (timestamp) => {
      const deltaTime = timestamp - startTime;
      if (deltaTime - lastUpdateTime >= 60000) {
        lastUpdateTime = deltaTime;
        update(timestamp);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);


    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export { Game };
