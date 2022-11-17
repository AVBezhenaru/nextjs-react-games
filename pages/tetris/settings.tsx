import Link from 'next/link';

import Settings from '../../tetris/components/settings/settings';
import Button from '../../tetris/components/button/button';

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
