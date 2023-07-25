export function createBackgroundLayer(level: any, sprites: any) {
  const { tiles } = level;
  const resolver = level.tileCollider.tiles;

  const buffer = document.createElement('canvas');
  buffer.width = 600;
  buffer.height = 400;

  const context = buffer.getContext('2d');
  let startIndex: number;
  let endIndex: number;

  function redraw(drawFrom: number, drawTo: number) {
    startIndex = drawFrom;
    endIndex = drawTo;

    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x];

      if (col) {
        // eslint-disable-next-line no-loop-func
        col.forEach((tile: any, y: number) => {
          sprites.drawTile(tile.name, context, x - startIndex, y);
        });
      }
    }
  }

  return function drawBackgroundLayer(context: any, camera: any) {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);

    context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
  };
}

export function createSpriteLayer(entities: any, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext('2d');

  return function drawSpriteLayer(context: any, camera: any) {
    entities.forEach((entity: any) => {
      spriteBufferContext.clearRect(0, 0, width, height);
      entity.draw(spriteBufferContext);

      context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);
    });
  };
}

export function createCollisionLayer(level: any) {
  const resolvedTiles: any[] = [];

  const tileResolver = level.tileCollider.tiles;
  const { tileSize } = tileResolver;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x: number, y: number) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(context: any, camera: any) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach((entity: any) => {
      context.beginPath();
      context.rect(
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
        entity.size.x,
        entity.size.y,
      );
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

export function createCameraLayer(cameraToDraw: any) {
  return function drawCameraRect(context: any, fromCamera: any) {
    context.strokeStyle = 'purple';
    context.beginPath();
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y,
    );
    context.stroke();
  };
}
