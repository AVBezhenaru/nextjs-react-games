export const drawBackground = (bg: any, ctx: any, sprites: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  bg.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(bg.tile, ctx, x, y);
      }
    }
  });
};

export const createBackgroundLayer = (backgrounds: any, sprites: any) => {
  const buffer = document.createElement('canvas');
  buffer.width = 500;
  buffer.height = 400;

  backgrounds.forEach((bg: any) => {
    drawBackground(bg, buffer.getContext('2d'), sprites);
  });

  return function drawBackgroundLayer(ctx: any) {
    ctx.drawImage(buffer, 0, 0);
  };
};

export const createSpriteLayer = (entity: any) => {
  return function drawSpriteLayer(ctx: any) {
    entity.draw(ctx);
  };
};
