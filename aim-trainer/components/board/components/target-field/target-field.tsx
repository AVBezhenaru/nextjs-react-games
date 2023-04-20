import { ReactElement, useMemo } from 'react';

import { selectTargets } from '../../../../reducers/targets-slice';
import { useAppSelector } from '../../../../../hooks';
import { selectGameIsStarted } from '../../../../reducers/game-slice';
import { Target } from '../../../target/target';

export const TargetField = () => {
  const isStarted = useAppSelector(selectGameIsStarted);
  const targets = useAppSelector(selectTargets);

  const targetsElements = useMemo<ReactElement[]>(() => {
    if (isStarted) {
      return targets.map((target) => <Target key={target.id} {...target} />);
    }

    return [];
  }, [targets, isStarted]);

  return <div>{targetsElements}</div>;
};
