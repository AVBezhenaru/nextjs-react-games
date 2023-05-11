import { nanoid } from '@reduxjs/toolkit';

import { PositionType } from './sizes';

export enum TargetAnimationTypes {
  scale,
  fadeIn,
}

export type TargetConfiguration = {
  lifetime?: number;
  position: PositionType;
  size?: number;
  animationType?: TargetAnimationTypes;
};

export type TargetType = TargetConfiguration & {
  id: ReturnType<typeof nanoid>;
};

export type TargetCreator = () => void;
export type TargetHitHandler = (id: ReturnType<typeof nanoid>) => void;
