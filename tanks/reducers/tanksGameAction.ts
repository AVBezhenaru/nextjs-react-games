export const tanksGameOverAction = (payload: boolean): { type: string; payload: boolean } => ({
  type: 'GAME_OVER',
  payload,
});

export const tanksGameLoadingAction = (payload: boolean): { type: string; payload: boolean } => ({
  type: 'START_LOADING',
  payload,
});

export const tanksGameStartAction = (payload: boolean): { type: string; payload: boolean } => ({
  type: 'START_GAME',
  payload,
});

export const tanksGameVictoryAction = (): { type: string } => ({
  type: 'GAME_VICTORY',
});

export const tanksGameCountKill = (payload: boolean): { type: string; payload: boolean } => ({
  type: 'SET_COUNT_KILLED',
  payload,
});

export const tanksGameCountPoints = (payload: number): { type: string; payload: number } => ({
  type: 'SET_COUNT_POINT',
  payload,
});

export const tanksGamePause = (): { type: string } => ({
  type: 'PAUSE',
});

export const tankPlayer1LiveAction = (payload: boolean): { type: string; payload: boolean } => ({
  type: 'PLAYER_1_LIVE',
  payload,
});

export const tanksGameStage = (): { type: string } => ({
  type: 'STAGE',
});

export const tanksLevel = (payload: number): { type: string; payload: number } => ({
  type: 'LEVEL_TANK',
  payload,
});
