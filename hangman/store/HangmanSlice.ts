import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { appApi } from '../services';
import { COMMON_STATUS, IInitialStateApp } from '../types';

const { IDLE, LOADING, SUCCESS, FAILURE } = COMMON_STATUS;

const { getRandomWord: getRandomWordApi, getThemeWord: getThemeWordApi } = appApi;

export const getWord = createAsyncThunk(
  'hangman/getWord',
  async (theme: string, { rejectWithValue }) => {
    let res;
    try {
      if (theme === 'случайное слово') {
        res = await getRandomWordApi();
      } else {
        res = await getThemeWordApi(theme);
      }

      return res.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error);
    }
  },
);

const initialState: IInitialStateApp = {
  status: IDLE,
  error: null,
  theme: null,
  guessWord: [],
  currentWord: [],
  wrongLetters: [],
  successLetters: [],
};

export const getAppState = (state: RootState) => state.hangman;

const hangman = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
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
    addSuccessLetter(state, { payload }: PayloadAction<string>) {
      state.successLetters.push(payload);
    },
    addWrongLetter(state, { payload }: PayloadAction<string>) {
      state.wrongLetters.push(payload);
    },
    addLetterAtCurrentWord(
      state,
      { payload: { index, letter } }: PayloadAction<{ index: number; letter: string }>,
    ) {
      state.currentWord[index] = letter;
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
        state.status = LOADING;
      })
      .addCase(getWord.fulfilled, (state, { payload }) => {
        state.status = SUCCESS;

        state.guessWord = payload?.split('') as string[];

        state.currentWord = new Array(payload?.split('').length).fill(' ');
      })
      .addCase(getWord.rejected, (state, { payload }) => {
        state.status = FAILURE;

        if (payload instanceof Error) {
          state.error = payload.message;
        }
      });
  },
});

export const {
  setTheme,
  resetTheme,
  addSuccessLetter,
  addWrongLetter,
  addLetterAtCurrentWord,
  resetGame,
} = hangman.actions;

export default hangman.reducer;
