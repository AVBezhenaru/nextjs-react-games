export enum COMMON_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  IDLE = 'idle',
}

export type StatusGame = 'idle' | 'win' | 'lose' | 'loading';

export type Theme = { name: string; label: string };

export interface IInitialStateApp {
  status: COMMON_STATUS;
  error: string | null;
  theme: Theme | null;
  themesList: Theme[] | null;
  guessWord: string[];
  currentWord: (string | ' ')[];
  wrongLetters: string[];
  successLetters: string[];
}
