import { Direction, Tank } from '../Models/Tank';
import { playerPrimary } from '../tileMap';

const drawTank = (
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  tank: Tank,
  key: Set<unknown>,
) => {
  const switchFrame = (frames: number[][]) => {
    const ind = frames.indexOf(tank.view);
    if (ind + 1 > frames.length - 1) return frames[0];
    return frames[ind + 1];
  };

  switch (true) {
    case key.has(Direction.up):
      tank.y -= tank.speed;
      tank.view = switchFrame(playerPrimary[tank.rank][Direction.up]);
      break;
    case key.has(Direction.right):
      tank.x += tank.speed;
      tank.view = switchFrame(playerPrimary[tank.rank][Direction.right]);
      break;
    case key.has(Direction.down):
      tank.y += tank.speed;
      tank.view = switchFrame(playerPrimary[tank.rank][Direction.down]);
      break;
    case key.has(Direction.left):
      tank.x -= tank.speed;
      tank.view = switchFrame(playerPrimary[tank.rank][Direction.left]);
      break;
  }
  return ctx.drawImage(
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
