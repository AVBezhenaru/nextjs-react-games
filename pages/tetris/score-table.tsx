import Link from 'next/link';

import Button from '../../tetris2/components/button/button';
import GameScoreAll from '../../tetris2/components/game-score-all/game-score-all';
import style from '../../tetris2/styles/index.module.scss';

function ScoreTable() {
  return (
    <div className={style.game_wrapper}>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <GameScoreAll />
    </div>
  );
}

export default ScoreTable;
