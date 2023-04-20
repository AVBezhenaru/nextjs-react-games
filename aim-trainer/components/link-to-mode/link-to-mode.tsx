import Link from 'next/link';

import { GameModeData } from '../../types/modes';

type Props = GameModeData;

export const LinkToMode = (props: Props) => {
  const { path, label } = props;

  return (
    <Link href={`aim-trainer/${path}`}>
      <a>{label}</a>
    </Link>
  );
};
