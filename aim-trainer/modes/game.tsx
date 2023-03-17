import React, { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';

export const Game = () => {
  const { query } = useRouter();
  const gameComponent = useMemo<ReactNode>(() => {
    switch (query.game) {
      case 'challenge':
        return;
      default:
        return <>game is not fined</>;
    }
  }, [query]);

  return <div>{gameComponent}</div>;
};
