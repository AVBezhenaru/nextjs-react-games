export type SectionType = {
  icon: string;
  name: string;
  body: JSX.Element;
  sectionChildren?: SectionChildType[];
};

export type SectionChildType = {
  name:string;
  body:JSX.Element
};
