import { setAskArr, selectAskArr } from '../../slices/slices';
import { useAppSelector, useAppDispatch } from '../../../hooks';

import foodsItems from './foods-items';
import classes from './foods.module.scss';

const Foods = Object.values(foodsItems);

type FoodItemType = {
  item: string;
};

const Food = ({ item }: FoodItemType) => (
  <div id="food" key={item} className={classes.foodicon} style={{ backgroundPosition: item }} />
);

const AllFoods = () => {
  const dispatch = useAppDispatch();
  const askArrFood = useAppSelector(selectAskArr);

  const answerHandler = (el: string) => {
    const newAskArr = askArrFood.filter((e) => e !== el);
    dispatch(setAskArr(newAskArr));
  };

  return Foods.map((el: string) => (
    <div key={el} onClick={() => answerHandler(el)}>
      <Food key={el} item={el} />
    </div>
  ));
};

export default AllFoods;
