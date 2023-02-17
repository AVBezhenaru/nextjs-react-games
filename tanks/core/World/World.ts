import { Tank } from '../Models/Tank';
import { Land } from '../Models/Land';

// interface IWorld {
//   playerTank_1: Tank;
//   playerTank_2: Tank ;
//   enemyTanks: Tank[];
//   grid: number[];
// }

class World {
  currentLevel = 1;

  land: any = new Land(this.currentLevel);

  playerTank_1 = new Tank(this.land.curLevel);

  playerTank_2: any = null;

  enemyTanks: any = [];
}

export default World;
