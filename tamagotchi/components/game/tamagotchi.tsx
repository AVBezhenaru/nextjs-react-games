import allFoods, { getAskFoods } from '../food/food';
import Dragon from '../dragon/dragon';
// import foodsItems from '../food/foods-items';

import heart from './heart';
import classes from './tamagotchi.module.scss';

const styleHeart = {
  color: 'tomato',
  healthPoints: 5,
};
const askFoods = getAskFoods([3, 24, 9]);

// const foodAsk = () => allFoods;

const Tamagotchi = () => (
  <div className={classes.tamagotchigame}>
    <div className={classes.left_section}>
      <div className={classes.points}>
        <p style={{ marginLeft: '0px' }}> 1500</p>
        <p style={{ marginTop: '150px' }}>700</p>
        <p>200</p>
      </div>
      <div className={classes.time_health}>
        <div className={classes.time}>time</div>
        <div className={classes.health}>{heart(styleHeart)}</div>
      </div>
    </div>
    <div className={classes.right_section}>
      <div className={classes.screen}>
        <div className={classes.askFoods}>{askFoods}</div>
        {Dragon(1000)}
      </div>
      <div className={classes.container}> {allFoods} </div>
    </div>
  </div>
);

export default Tamagotchi;
