import { ScoreType } from '../../types/types';

// сколько линий одномоментно удалено - такой и ключ из объекта ниже - для начисления Points 
// в tetrisSlice - см функцию countScore

export const SCORE_COUNT: ScoreType = {
  '0': 0,
  '1': 10,
  '2': 50,
  '3': 100,
  '4': 500,
};
