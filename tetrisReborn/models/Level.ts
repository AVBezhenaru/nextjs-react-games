export interface ILevel {
  title: string;
  tickTime: number;
  scoreToLvlup: number;
  scoreCoefficient: number;
  nextLevel: ILevel | false;
}

const TERMINATOR: ILevel = { title: 'Terminator', tickTime: 150, scoreToLvlup: Infinity, scoreCoefficient: 6, nextLevel: false };
const SUPER_HARD: ILevel = { title: 'Super hard', tickTime: 200, scoreToLvlup: 3000, scoreCoefficient: 5, nextLevel: TERMINATOR }
const HARD: ILevel = { title: 'Hard', tickTime: 400, scoreToLvlup: 2000, scoreCoefficient: 4, nextLevel: SUPER_HARD };
const MEDIUM: ILevel = { title: 'Medium', tickTime: 600, scoreToLvlup: 1200, scoreCoefficient: 3, nextLevel: HARD }
const EASY: ILevel = { title: 'Easy', tickTime: 800, scoreToLvlup: 600, scoreCoefficient: 2, nextLevel: MEDIUM };
const SUPER_EASY: ILevel = { title: 'Super easy', tickTime: 1000, scoreToLvlup: 20, scoreCoefficient: 1, nextLevel: EASY };

export const getFirstLevel = () => SUPER_EASY;

export const needToLevelUp = (score: number, level: ILevel): false | ILevel => {
  if (score > level.scoreToLvlup) return level.nextLevel;
  return false;
}
