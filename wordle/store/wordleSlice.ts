import { createSlice } from '@reduxjs/toolkit';

import classes from '../styles/letter-status.module.scss';

interface WordleState {
  challengeWord: string;
  challengeWordArr: string[];
  inputWord: string[][];
  correctLetters: string[][];
  settings: {
    lang: string;
    wordLength: [number, number];
    numOfAttempts: number;
  };
  keyboardMarkers: { [letter: string]: string };
  keyboardSubmit: boolean;
  winState: string;
}

const initialState: WordleState = {
  challengeWord: '',
  challengeWordArr: [],
  inputWord: [[' '], [' '], [' '], [' '], [' ']],
  correctLetters: [[''], [''], [''], [''], ['']],
  settings: {
    lang: 'RU',
    wordLength: [5, 6],
    numOfAttempts: 5,
  },
  keyboardMarkers: { '': '' },
  keyboardSubmit: false,
  winState: '',
};

const wordleSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    setChallengeWord: (state, action) => {
      state.challengeWord = action.payload;
      state.challengeWordArr = action.payload.split('');
      for (let i = 0; i < state.settings.numOfAttempts; i++) {
        state.inputWord[i] = Array(action.payload.length).fill('');
        state.correctLetters[i] = Array(action.payload.length).fill('');
      }
    },
    setInputWord: (state, action) => {
      state.inputWord[action.payload.try] = action.payload.word;
    },
    checkCorrectLetters: (state, action) => {
      const wordArr = state.inputWord[action.payload];
      const guesses = state.correctLetters[action.payload];
      const chars = state.challengeWordArr;
      if (wordArr.join('') === state.challengeWord) {
        state.winState = 'win';
      }

      if (
        action.payload === state.settings.numOfAttempts - 1 &&
        wordArr.join('') !== state.challengeWord
      ) {
        state.winState = 'loose';
      }

      wordArr.forEach((guessChar, index) => {
        let foundIndex = chars.indexOf(guessChar);
        if (guesses[foundIndex] === 'correct' || guesses[foundIndex] === 'misplaced') {
          foundIndex = chars.indexOf(guessChar, index);
        }
        if (index === foundIndex) {
          guesses[index] = classes.correct;
          state.keyboardMarkers[guessChar] = classes.correct;
        } else if (foundIndex === -1) {
          guesses[index] = classes.incorrect;
          state.keyboardMarkers[guessChar] = classes.incorrect;
        } else {
          guesses[index] = classes.misplaced;
          state.keyboardMarkers[guessChar] = classes.misplaced;
        }
      });
    },
    setLang: (state, action) => {
      state.settings.lang = action.payload;
    },
    setLength: (state, action) => {
      state.settings.wordLength = action.payload;
    },
    setNumOfAttempts: (state, action) => {
      state.settings.numOfAttempts = action.payload;
      const newInput = [];
      const newCorrectLetters = [];
      for (let i = 0; i < action.payload; i++) {
        newInput.push(['']);
        newCorrectLetters.push(['']);
      }
      state.inputWord = newInput;
      state.correctLetters = newCorrectLetters;
    },
    clearKeyboardMarkers: (state) => {
      state.keyboardMarkers = {};
    },
    setKeyboardSubmit: (state, action) => {
      state.keyboardSubmit = action.payload;
    },
    clearWinState: (state) => {
      state.winState = '';
    },
  },
});

export const {
  setChallengeWord,
  setInputWord,
  checkCorrectLetters,
  setLang,
  setLength,
  setNumOfAttempts,
  clearKeyboardMarkers,
  setKeyboardSubmit,
  clearWinState,
} = wordleSlice.actions;

export default wordleSlice.reducer;
