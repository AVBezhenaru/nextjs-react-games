import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { sortCardsAction } from '../../store/actions/cards';

import { MainSection, StartGame } from './MainStyle';

export const Main = () => {
  const { cards } = useAppSelector((state) => state.solitaire);
  const dispatch = useAppDispatch();

  const setRandomCards = () => {
    const arr = Array.from(cards);
    const newArr = arr.sort(() => Math.random() - 0.5);
    console.log(newArr);
    dispatch(sortCardsAction(newArr));
  };

  return (
    <MainSection>
      <Link href="./solitaire/game">
        <StartGame onClick={setRandomCards}>
          <span>START</span>
        </StartGame>
      </Link>
    </MainSection>
  );
};
