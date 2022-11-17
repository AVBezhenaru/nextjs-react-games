import Link from 'next/link';

import Button from '../../tetris/components/button/button';
import TetrisPlay from '../../tetris/components/tetris-play/TetrisPlay';

function TetrisGame() {
  return (
    <>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <TetrisPlay />
    </>
  );
}

export default TetrisGame;
