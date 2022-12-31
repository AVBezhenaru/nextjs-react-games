export enum Level {
  SUPER_EASY = 1,
  EASY = 2,
  MEDIUM = 3,
  HARD = 4,
  SUPER_HARD = 5,
  TERMINATOR = 6,
}

export const getLevelName = (level: Level): string => {
  switch (level) {
    case Level.SUPER_EASY:
      return 'Super easy';
    case Level.EASY:
      return 'Easy';
    case Level.MEDIUM:
      return 'Medium';
    case Level.HARD:
      return 'Hard';
    case Level.SUPER_HARD:
      return 'Super hard';
    case Level.TERMINATOR:
      return 'Terminator';
    default:
      return 'Super easy';
  }
}

export const getTickTime = (level: Level): number => {
  switch (level) {
    case Level.SUPER_EASY:
      return 1000;
    case Level.EASY:
      return 800;
    case Level.MEDIUM:
      return 600;
    case Level.HARD:
      return 400;
    case Level.SUPER_HARD:
      return 200;
    case Level.TERMINATOR:
      return 160;
    default:
      return 1000;
  }
}

export const needToLevelUp = (score: number, level: Level): false | Level => {
  switch (level) {
    case Level.SUPER_EASY:
      if (score > 200) return Level.EASY; 
    case Level.EASY:
      if (score > 600) return Level.MEDIUM; 
    case Level.MEDIUM:
      if (score > 1200) return Level.HARD; 
    case Level.HARD:
      if (score > 2000) return Level.SUPER_HARD; 
    case Level.SUPER_HARD:
      if (score > 3000) return Level.TERMINATOR; 
    case Level.TERMINATOR:
      return false; 
    default:
      return false;
  }
}
