import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getRandomWord as randomWord, getThemeWord as themeWord } from '../../data/data';
import { AlphabetLetters, COMMON_STATUS, IInitialStateApp } from '../../types/AppSlice';
import { asyncThunkCreator } from '../../utils/asyncThunkCreator';

const { IDLE, LOADING, SUCCESS, FAILURE } = COMMON_STATUS;

export const getRandomWord = asyncThunkCreator<string, undefined, typeof randomWord>({
  thunkName: 'app/getRandomWord',
  callback: randomWord,
});

export const getThemeWord = asyncThunkCreator<string, string, typeof themeWord>({
  thunkName: 'app/getThemeWord',
  callback: themeWord,
});

const initialState: IInitialStateApp = {
  status: IDLE,
  error: null,
  theme: null,
  guessWord: [],
  currentWord: [],
  wrongLetters: [],
  successLetters: [],
};

export const getAppState = (state: RootState) => state.app;

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    findLetterInGuessWord(state, { payload }: PayloadAction<AlphabetLetters>) {
      state.guessWord.forEach((letter, index) => {
        if (letter === payload) {
          //* open new letter in GuessWord
          state.currentWord[index] = payload;

          if (!state.successLetters.includes(payload)) {
            state.successLetters.push(payload);
          }
        }
      });

      if (!state.guessWord.includes(payload) && !state.wrongLetters.includes(payload)) {
        state.wrongLetters.push(payload);
      }
    },
    resetGame(state) {
      state.guessWord = [];
      state.currentWord = [];
      state.successLetters = [];
      state.wrongLetters = [];
    },
    setTheme(state, { payload }: PayloadAction<string>) {
      state.theme = payload;

      state.guessWord = [];
      state.currentWord = [];
      state.successLetters = [];
      state.wrongLetters = [];
    },
    resetTheme(state) {
      state.theme = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRandomWord.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getRandomWord.fulfilled, (state, { payload }) => {
        state.status = SUCCESS;

        state.guessWord = payload.split('') as AlphabetLetters[];

        state.currentWord = new Array(payload.split('').length).fill(' ');
      })
      .addCase(getRandomWord.rejected, (state, { payload }) => {
        state.status = FAILURE;

        if (payload instanceof Error) {
          state.error = payload.message;
        }
      });

    builder
      .addCase(getThemeWord.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getThemeWord.fulfilled, (state, { payload }) => {
        state.status = SUCCESS;

        state.guessWord = payload.split('') as AlphabetLetters[];

        state.currentWord = new Array(payload.split('').length).fill(' ');
      })
      .addCase(getThemeWord.rejected, (state, { payload }) => {
        state.status = FAILURE;

        if (payload instanceof Error) {
          state.error = payload.message;
        }
      });
  },
});

export const { findLetterInGuessWord, resetGame, setTheme, resetTheme } = app.actions;

export default app.reducer;
