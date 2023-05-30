import { ReactNode } from 'react';

export type SectionChildType = {
  name: string;
  body: ReactNode;
};

export type SectionType = {
  icon: string;
  name: string;
  body: ReactNode;
  sectionChildren?: SectionChildType[];
};
