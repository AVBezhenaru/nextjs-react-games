export enum COMMON_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  IDLE = 'idle',
}

export type StatusGame = 'idle' | 'win' | 'lose' | 'loading';

export interface IInitialStateApp {
  status: COMMON_STATUS;
  error: string | null;
  theme: string | null;
  themesList: string[] | null;
  guessWord: string[];
  currentWord: (string | ' ')[];
  wrongLetters: string[];
  successLetters: string[];
}
