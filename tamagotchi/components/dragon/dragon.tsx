import PetAdult from './pet_adult';
import PetBaby from './pet_baby';
import PetChild from './pet_child';

const Dragon = (points: number) => {
  if (points >= 200 && points < 700) {
    return <>{PetChild()}</>;
  }
  if (points <= 200) {
    return <>{PetBaby()}</>;
  }
  if (points >= 700) {
    return <>{PetAdult()}</>;
  }
};

export default Dragon;
