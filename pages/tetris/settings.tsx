import Link from 'next/link';

import Settings from '../../tetris2/components/settings/settings';
import Button from '../../tetris2/components/button/button';

function GameSettings() {
  return (
    <>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <Settings />
    </>
  );
}

export default GameSettings;
