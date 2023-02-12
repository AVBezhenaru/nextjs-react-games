
import { Direction, Tank } from '../Models/Tank';

const controllTank = (key: any, tank: Tank) => {
  console.log(key);
  switch (true) {
    case key.has(Direction.up):
      console.log('up');
      break;
    case 'ArrowRight':
    case 'ArrowDown':
    case 'ArrowLeft':
      tank.moveTank(key);
      break;
    case 'Space':
      console.log('space');
      break;
  }
};

export default controllTank;
