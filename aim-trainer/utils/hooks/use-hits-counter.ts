import { useMemo } from 'react';

import { ModeInfoObject } from '../types/modes';
import { useAppSelector } from '../../../hooks';
import { selectScore } from '../../reducers/statistics-slice';

type UseHitsCounter = () => ModeInfoObject;

export const useHitsCounter: UseHitsCounter = () => {
  const hits = useAppSelector(selectScore);

  return useMemo<ModeInfoObject>(
    () => ({
      label: 'Hits',
      value: `${hits}`,
    }),
    [hits],
  );
};
