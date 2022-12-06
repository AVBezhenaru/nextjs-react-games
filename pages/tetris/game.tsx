import Link from 'next/link';

import Button from '../../tetris2/components/button/button';
import TetrisPlay from '../../tetris2/components/tetris-play/TetrisPlay';
import style from '../../tetris2/styles/index.module.scss';

function TetrisGame() {
  return (
    <div className={style.game_wrapper}>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <TetrisPlay />
    </div>
  );
}

export default TetrisGame;
