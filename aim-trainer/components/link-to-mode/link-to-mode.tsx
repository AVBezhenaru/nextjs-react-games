import Link from 'next/link';

import { GameModeData } from '../../utils/types/modes';

import { StyledLinkToMode } from './link-to-mode.styles';

type Props = GameModeData;

export const LinkToMode = (props: Props) => {
  const { path, label, img } = props;

  return (
    <Link href={`aim-trainer/${path}`}>
      <StyledLinkToMode>
        <img src={img} alt="" />
        <a>{label}</a>
      </StyledLinkToMode>
    </Link>
  );
};
