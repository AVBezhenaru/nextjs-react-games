import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { getRandomWord } from '../../data/data';
import { AlphabetLetters, IInitialStateApp } from '../../types/AppSlice';
import { asyncThunkCreator } from '../../utils/asyncThunkCreator';

export const getWord = asyncThunkCreator<string, undefined, typeof getRandomWord>({
  thunkName: 'app/getWord',
  callback: getRandomWord,
});

const initialState: IInitialStateApp = {
  status: 'IDLE',
  error: null,
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
  },
  extraReducers(builder) {
    builder
      .addCase(getWord.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(getWord.fulfilled, (state, { payload }) => {
        state.status = 'SUCCESS';

        state.guessWord = payload.split('') as AlphabetLetters[];

        state.currentWord = new Array(payload.split('').length).fill(' ');
      })
      .addCase(getWord.rejected, (state, { payload }) => {
        state.status = 'FAILURE';

        if (payload instanceof Error) {
          state.error = payload.message;
        }
      });
  },
});

export const { findLetterInGuessWord, resetGame } = app.actions;

export default app.reducer;
