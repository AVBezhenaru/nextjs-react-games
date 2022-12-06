interface PlayConditional {
  colorCheckers: string;

  bid: number;
}
export interface UserProps {
  id: number;
  name: string;
  playConditional: PlayConditional;
}
interface PlayConditionals {
  colorCheckers: string;

  bid: number;
}
export interface PlayerProps {
  id: number;
  name: string;
  playConditional: PlayConditionals;
}
