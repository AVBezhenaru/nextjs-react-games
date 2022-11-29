import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { setPlayWithBoot } from '../../checkers/store/checkersReducer';
// import { RootState } from '../../store';

export default function Home() {
  // const players = useSelector((state: RootState) => state.checkers.isPlayWithBoot);
  const dispatch = useDispatch();
  return (
    <div className="head__page">
      <h2 className="head__page-title">Добро пожаловать в игру</h2>
      <h1 className="head__page-title__head">
        Ш<span>а</span>ш<span>к</span>и
      </h1>
      <div className="container___head__page">
        <Link href="/checkers/ChoosePlayer">
          <span className="head__page-play">Играть онлайн</span>
        </Link>

        {dispatch(setPlayWithBoot(true)) && (
          <Link href="/checkers/Play">
            <span className="head__page-play">Играть с ботом</span>
          </Link>
        )}
      </div>
    </div>
  );
}
