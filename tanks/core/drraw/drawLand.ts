import { Land } from '../Models/Land';
// import { landTiles } from '../tileMap';
import { TILE_SIZE } from '../../config';

// const mapLand = landTiles;
export const drawLand = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, land: Land) => {
  const curLand: number[][] = land.getRenderMap();
  for (let i = 0; i < curLand.length; i++) {
    for (let j = 0; j < curLand[i].length; j++) {
      const elem = curLand[i][j];
      if (Array.isArray(elem)) {
        ctx.drawImage(
          img,
          elem[0],
          elem[1],
          elem[2],
          elem[3],
          j * TILE_SIZE,
          i * TILE_SIZE,
          elem[2],
          elem[3],
        );
      }
    }
  }
};
