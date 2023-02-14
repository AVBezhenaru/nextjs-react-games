import { Tank } from '../Models/Tank';

const drawTank = (
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  tank: Tank,
  key: Set<unknown>,
) => {
  tank.moveTank(key);
  ctx.drawImage(
    img,
    tank.view[0],
    tank.view[1],
    tank.view[2],
    tank.view[3],
    tank.x,
    tank.y,
    tank.view[2],
    tank.view[3],
  );
};

export default drawTank;
