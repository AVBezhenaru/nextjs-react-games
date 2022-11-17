import Link from 'next/link';

import Button from '../../tetris2/components/button/button';
import GameScoreAll from '../../tetris2/components/game-score-all/game-score-all';

function ScoreTable() {
  return (
    <>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <GameScoreAll />
    </>
  );
}

export default ScoreTable;
