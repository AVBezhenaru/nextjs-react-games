import { ReactElement, useMemo } from 'react';

import { StyledLivesCounter } from './lives-counter.styles';
import { Live } from './live';

type Props = {
  totalCount: number;
  deathCount: number;
};

export const LivesCounter = (props: Props) => {
  const { totalCount, deathCount } = props;
  const lives = useMemo<ReactElement[]>(() => {
    const buffer = [];

    for (let i = 0; i < totalCount; i++) {
      buffer.push(<Live disable={i < deathCount} key={i} />);
    }

    return buffer;
  }, [totalCount, deathCount]);

  return <StyledLivesCounter>{lives}</StyledLivesCounter>;
};
