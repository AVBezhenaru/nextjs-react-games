export type StatItem = {
  label: string;
  value: string | number;
};

export type StatCreator = () => StatItem[];
