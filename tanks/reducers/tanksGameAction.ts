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

export const tanksGameCountScoresAction = (
  payload: boolean | [number, number],
): { type: string; payload: boolean | [number, number] } => ({
  type: 'SET_COUNT_KILLED',
  payload,
});
