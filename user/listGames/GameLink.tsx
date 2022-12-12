import Link from 'next/link';

import { Game, Icon, GameName } from './GameLinkStyle';

type DataLink = {
  src: string;
  title: string;
  href: string;
};

const GameLink = ({ src, title, href }: DataLink) => (
  <Link href={href}>
    <Game>
      <Icon>
        <img src={src} alt={title} />
      </Icon>
      <GameName>{title}</GameName>
    </Game>
  </Link>
);

export { GameLink };
