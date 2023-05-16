import { useState, useEffect } from 'react';

import {
  selectPoints,
  setAskArr,
  setReady,
  selectAskArr,
  setPoints,
  setTimer,
} from '../../slices/slices';
import { useAppSelector, useAppDispatch } from '../../../hooks';

import foodsItems from './foods-items';
import classes from './foods.module.scss';

export const AskFoods = () => {
  const Foods = Object.values(foodsItems);
  const dispatch = useAppDispatch();
  const pointsItem = 50;
  const points = useAppSelector(selectPoints);
  const lastAskFoodsArr = useAppSelector(selectAskArr);
  const [isCompleted, toggleComplete] = useState<boolean>(false);
  const [askArrayState, setAskArrayState] = useState(lastAskFoodsArr);
  const [pointsState, addPointsState] = useState(0);
  const [ready, setReadyState] = useState(false);

  // const onStartTimer = () => {
  //   const interval = setInterval(() => {
  //     dispatch(setTimer());
  //   }, 1000);
  //   if (time === 0) {
  //     clearInterval(interval);
  //     console.log('00000000000000');
  //   }
  //   return time;
  // };

  useEffect(() => {
    addPointsState(() => pointsState + pointsItem);
    dispatch(setTimer);
    dispatch(setReady(ready));
  }, [ready]);

  useEffect(() => {
    dispatch(setPoints(pointsState));
    dispatch(setAskArr(askArrayState));
  }, [askArrayState]);

  useEffect(() => {
    if (lastAskFoodsArr.length === 0) {
      addPointsState(0);
      toggleComplete(true);
      setReadyState(false);
    }
  }, [lastAskFoodsArr]);

  const askFoodsArrNumber = (p: number) => {
    // новые  элементы после выполнения тура
    if (isCompleted) {
      const getItem = () => Math.floor(Math.random() * 66);
      const arr: number[] = [];
      // количество картинок 3 туров - 3,6,12
      if (p >= 0 && p < 250) {
        for (let i = 3; i > 0; i -= 1) {
          const a = getItem();
          if (!arr.includes(a)) {
            arr.push(a);
          } else i += 1;
        }
      }
      if (p >= 250 && p < 850) {
        // количество картинок второго тура - 6
        for (let i = 6; i > 0; i -= 1) {
          const a = getItem();
          if (!arr.includes(a)) {
            arr.push(a);
          } else i += 1;
        }
      }
      if (p >= 850 && p < 1500) {
        // количество картинок третьего тура - 12
        for (let i = 12; i > 0; i -= 1) {
          const a = getItem();
          if (!arr.includes(a)) {
            arr.push(a);
          } else i += 1;
        }
      }
      toggleComplete(false);
      const newAskFoodsArr = arr.map((el: number) => Foods[el]);
      setAskArrayState(newAskFoodsArr);
      return newAskFoodsArr;
    }
  };

  useEffect(() => {
    askFoodsArrNumber(points);
    dispatch(setPoints(0));
  });
  const resultArr = lastAskFoodsArr.toString ? lastAskFoodsArr : askFoodsArrNumber(points);
  // старые элементы
  if (ready) {
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        {resultArr.map((el) => (
          <div id="food" key={el} className={classes.foodicon} style={{ backgroundPosition: el }} />
        ))}
      </div>
    );
  }

  return (
    <div className={classes.ready_pannel}>
      {/* <p className={classes.ready_pannel_text}>Я проголодался</p> */}
      <button
        className={classes.ready_pannel_button}
        type="button"
        onClick={() => setReadyState(true)}
      >
        покормить
      </button>
    </div>
  );
};
