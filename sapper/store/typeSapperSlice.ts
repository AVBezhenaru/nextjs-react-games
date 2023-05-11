export type TsettingsValue = {
  level: string;
  width: number;
  height: number;
  mins: number;
};

export type IinitialState = {
  settingsModal: boolean;
  gameIndicator: string;
  gameModal: boolean;
  bombCount: number;
  timerIndicator: boolean;
  finishTime: number;
  settingsValue: TsettingsValue;
};
