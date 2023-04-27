import { ReactNode } from 'react';

export type GameModeData = {
  path: string;
  component: ReactNode;
  label: string;
  img: string;
};

export type ModeInfoObject = {
  label: string;
  value: string | number;
};
