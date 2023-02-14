import { Tank } from '../Models/Tank';
import { Land } from '../Models/Land';

// interface IWorld {
//   playerTank_1: Tank;
//   playerTank_2: Tank ;
//   enemyTanks: Tank[];
//   grid: number[];
// }

class World {
  playerTank_1 = new Tank();

  playerTank_2: any = null;

  enemyTanks: any = [];

  currentLevel = 1;

  land: any = new Land(this.currentLevel);
}

export default World;
