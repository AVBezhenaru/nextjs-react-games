import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';
import { appApi } from '../../services/appApi';
import { AlphabetLetters, COMMON_STATUS, IInitialStateApp } from '../../types/AppSlice';

const { IDLE, LOADING, SUCCESS, FAILURE } = COMMON_STATUS;

const { getRandomWord: getRandomWordApi, getThemeWord: getThemeWordApi } = appApi;

export const getThemeWord = createAsyncThunk(
  'app/getRandom',
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

export const getAppState = (state: RootState) => state.app;

const app = createSlice({
  name: 'app',
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
    addSuccessLetter(state, { payload }: PayloadAction<AlphabetLetters>) {
      state.successLetters.push(payload);
    },
    addWrongLetter(state, { payload }: PayloadAction<AlphabetLetters>) {
      state.wrongLetters.push(payload);
    },
    addLetterAtCurrentWord(
      state,
      { payload: { index, letter } }: PayloadAction<{ index: number; letter: AlphabetLetters }>,
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
      .addCase(getThemeWord.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getThemeWord.fulfilled, (state, { payload }) => {
        state.status = SUCCESS;

        state.guessWord = payload?.split('') as AlphabetLetters[];

        state.currentWord = new Array(payload?.split('').length).fill(' ');
      })
      .addCase(getThemeWord.rejected, (state, { payload }) => {
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
} = app.actions;

export default app.reducer;
