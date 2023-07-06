export const createBackgroundLayer = (level: any, sprites: any) => {
  const buffer = document.createElement('canvas');
  buffer.width = 640;
  buffer.height = 640;

  const ctx = buffer.getContext('2d');
  console.log(level[0]);
  level.tile.grid.forEach((col, x) => {
    col.forEach((tile, y) => {
      sprites.drawTile(tile.name, ctx, x, y);
    });
  });

  return function drawBackgroundLayer(ctx: any) {
    ctx.drawImage(buffer, 0, 0);
  };
};

export const createSpriteLayer = (entities: any) => {
  return function drawSpriteLayer(ctx: any) {
    entities.forEach(entity => {
      entity.draw(ctx);
    });
  };
};
