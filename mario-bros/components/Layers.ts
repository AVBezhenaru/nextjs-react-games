export function createBackgroundLayer(level, sprites) {
  const tiles = level.tiles;
  const resolver = level.tileCollider.tiles;

  const buffer = document.createElement('canvas');
  buffer.width = 2048;
  buffer.height = 640;

  const context = buffer.getContext('2d');

  function redraw(startIndex, endIndex) {
    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x];

      if (col) {
        col.forEach((tile, y) => {
          sprites.drawTile(tile.name, context, x, y);
        });
      }
    }
  }

  return function drawBackgroundLayer(context, camera) {

    context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
  };
}

export function createSpriteLayer(entities, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext('2d');

  return function drawSpriteLayer(context, camera) {
    entities.forEach(entity => {
      spriteBufferContext.clearRect(0, 0, width, height);
      entity.draw(spriteBufferContext);

      context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);
    });
  };
}

export function createCollisionLayer(level) {
  const resolvedTiles: any[] = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x, y});
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(context, camera) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.pos.x, entity.pos.y,
        entity.size.x, entity.size.y);
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = 'purple';
    context.beginPath();
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x, cameraToDraw.size.y);
    context.stroke();
  };
}
