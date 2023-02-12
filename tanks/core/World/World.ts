import { Tank } from '../Models/Tank';

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

  grid: any = [];
}

export default World;
