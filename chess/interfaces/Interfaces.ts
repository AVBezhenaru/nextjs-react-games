import { Colors } from '../models/Colors';

export interface GameSettingsProps {
  setGameTime: (time: string | null) => void;
  setGainTime: (time: string | null) => void;
  settingsGame: {
    gameTime: string | null;
    gainTime: string | null;
    startColor: Colors;
    gameMode: string;
  };
}

export interface InputSelectInterface {
  value: string;
  label: string;
}
export interface ListPlayersInterface {
  value: number;
  label: {
    name: string;
    bid: string;
    colors: string;
    mode: string;
  };
}
