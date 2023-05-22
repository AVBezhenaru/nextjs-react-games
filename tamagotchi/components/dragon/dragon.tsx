import { reset } from '../../slices/slices';
import { useAppDispatch } from '../../../hooks';

import PetAdult from './pet_adult';
import PetBaby from './pet_baby';
import PetChild from './pet_child';
import classes from './dragon.module.scss';

const Dragon = (points: number, health: number) => {
  const dispatch = useAppDispatch();
  const finReset = () => dispatch(reset());
  if (points >= 0 && points < 300 && health > 0) {
    return <>{PetBaby()}</>;
  }
  if (points >= 300 && points < 900 && health > 0) {
    return <>{PetChild()}</>;
  }
  if (points >= 900 && points < 1500 && health > 0) {
    return <>{PetAdult()}</>;
  }
  if (points >= 1500 && health > 0) {
    return (
      <>
        <p className={classes.final_message}>
          Твой дракон вырос достаточно взрослым и самостоятельным.
          <br /> В благодарность он наделил тебя особой удачей и везением. Он улетел в поисках
          сородичей, но всегда будет помнить твою доброту и заботу.
        </p>
        <button className={classes.button_reset} type="button" onClick={finReset}>
          Вернуться
        </button>
      </>
    );
  }
  return (
    <>
      <p className={classes.lose_message}> Питомец покинул вас в поисках пропитания. </p>
      <p className={classes.lose_question} style={{ paddingTop: '35.2vh' }}>
        Попробовать еще раз?
      </p>
      <button className={classes.button_reset} type="button" onClick={finReset}>
        Я справлюсь!
      </button>
    </>
  );
};

export default Dragon;
