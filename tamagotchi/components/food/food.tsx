import classes from './foods.module.scss';
import foodsItems from './foods-items';

type FoodItemType = {
  item: string;
};

const Food = ({ item }: FoodItemType) => (
  <div key={item} className={classes.foodicon} style={{ backgroundPosition: item }} />
);

const Foods = Object.values(foodsItems);
const allFoods = Foods.map((el: string) => <Food key={el} item={el} />);

export const getAskFoods = (arr: number[]) => arr.map((el) => <Food key={el} item={Foods[el]} />);

export default allFoods;
