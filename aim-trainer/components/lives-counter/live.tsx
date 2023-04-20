import { ReactSVG } from 'react-svg';

import { LiveStyles, StyledLive } from './lives-counter.styles';
import heartIcon from './heart-icon.svg';

type Props = LiveStyles;

export const Live = (props: Props) => {
  return (
    <StyledLive {...props}>
      <ReactSVG src={heartIcon.src} />
    </StyledLive>
  );
};
