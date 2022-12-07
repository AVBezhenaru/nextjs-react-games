import Link from 'next/link';

import Settings from '../../tetris2/components/settings/settings';
import Button from '../../tetris2/components/button/button';
import style from '../../tetris2/styles/index.module.scss';

function GameSettings() {
  return (
    <div className={style.game_wrapper}>
      <Link href="/tetris">
        <a>
          <Button theme="backToMenu">Back</Button>
        </a>
      </Link>
      <Settings />
    </div>
  );
}

export default GameSettings;
