import { nanoid } from '@reduxjs/toolkit';

import { PositionType } from './sizes';

export type TargetConfiguration = {
  lifetime?: number;
  position: PositionType;
  size?: number;
};

export type TargetType = TargetConfiguration & {
  id: ReturnType<typeof nanoid>;
};

export type TargetCreator = () => void;
export type TargetHitHandler = (id: ReturnType<typeof nanoid>) => void;
