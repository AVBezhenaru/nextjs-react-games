import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { selectHealth, selectPoints, ready } from '../../slices/slices';
import { AskFoods } from '../food/food';
import Timer from '../timer/timer';
import AllFoods from '../food/all-foods';
import Dragon from '../dragon/dragon';

import heart from './heart';
import classes from './tamagotchi.module.scss';

const Tamagotchi = () => {
  const health = useAppSelector(selectHealth);
  const points = useAppSelector(selectPoints);
  const isReady = useAppSelector(ready);
  const [pointsState, setPointsState] = useState(points);

  useEffect(() => {
    setPointsState(points);
  }, [points, isReady]);
  const columnPointHeight = `${pointsState / 3 + 50}px`;
  const styleHeart = {
    color: 'tomato',
    healthPoints: health,
  };

  return (
    <div className={classes.tamagotchigame}>
      <div className={classes.left_section}>
        <div className={classes.pointsColumn}>
          <p style={{ marginBottom: '150px' }}> 1500</p>
          <p style={{ marginBottom: '150px' }}>900</p>
          <p style={{ marginBottom: '110px' }}>300</p>
          <div style={{ height: columnPointHeight }} className={classes.points} />
        </div>
        <div className={classes.time_health}>
          <div className={classes.time}>{Timer(points, isReady)}</div>
          <div className={classes.health}>{heart(styleHeart)}</div>
        </div>
      </div>
      <div className={classes.right_section}>
        <div className={classes.screen}>
          <div className={classes.askFoods}>
            <AskFoods />
          </div>
          {Dragon(points, health)}
        </div>
        <div className={classes.container}> {AllFoods()} </div>
      </div>
    </div>
  );
};

export default Tamagotchi;
