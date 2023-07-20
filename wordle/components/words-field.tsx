'use client';

import { Button, notification } from 'antd';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCheckingLetters, setEditLetterBox, setFocusedInput } from '../store/animationSlice';
import { AppDispatch, RootState } from '../store/store';
import {
  checkCorrectLetters,
  clearKeyboardMarkers,
  clearWinState,
  setChallengeWord,
  setInputWord,
  setKeyboardSubmit,
} from '../store/wordleSlice';
import classes from '../styles/word-field.module.scss';

import EndScreen from './end-screen';
import WordRow from './word-row';

const getWord = async (lang = 'ru', length = [5, 6]) => {
  const response = await fetch(`/api/wordle/words?lang=${lang}&len=${length[0]}-${length[1]}`);
  return response.json();
};

const checkWord = async (word: string, lang = 'ru') => {
  const response = await fetch(`/api/wordle/words?checkWord=${word}&lang=${lang}`);
  return response.json();
};

const GameScene = () => {
  const { challengeWordArr, inputWord, settings, keyboardSubmit } = useSelector(
    (state: RootState) => state.wordleSlice,
  );
  const { focusedInput } = useSelector((state: RootState) => state.animationSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [api, contextHolder] = notification.useNotification();
  const { winState } = useSelector((state: RootState) => state.wordleSlice);
  // useEffect(() => {
  //     startGame()
  // }, [dispatch])

  const inputRef = useRef<HTMLInputElement[] | null[]>([]);
  const [activeRef, setActiveRef] = useState<HTMLInputElement>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [waitingServer, setWaitingServer] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setFocusedInput(inputRef.current.findIndex((e) => e === activeRef)));
  }, [activeRef]);

  const startGame = () => {
    dispatch(clearKeyboardMarkers());
    dispatch(clearWinState());
    setWaitingServer(true);
    getWord(settings.lang, settings.wordLength)
      .then(({ word }) => {
        dispatch(setChallengeWord(word));
      })
      .finally(() => {
        if (inputRef.current[0]) {
          if (inputRef.current[focusedInput]) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            inputRef.current[focusedInput]!.disabled = true;
          }
          inputRef.current[0].disabled = false;
          inputRef.current[0].focus();
          setActiveRef(inputRef.current[0]);
          setWaitingServer(false);
          setGameStarted(true);
        }
      });
  };

  const handleSubmit = (index: number, e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const currentRef = inputRef.current[index];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (currentRef!.value.length < challengeWordArr.length) {
      return;
    }
    if (currentRef?.value === '') {
      return;
    }
    const nextRef = inputRef.current[index + 1];
    setWaitingServer(true);
    checkWord(currentRef?.value as string).then(({ exists }) => {
      if (!exists) {
        api.open({
          message: 'Такого слова нет!',
          description: 'Введите существующее слово, например ОКЕАН.',
          duration: 2,
          placement: 'topLeft',
        });
        if (currentRef) {
          currentRef.value = '';
          dispatch(setInputWord({ try: index, word: [''] }));
        }
      } else {
        dispatch(setCheckingLetters(true));
        dispatch(checkCorrectLetters(index));
        if (currentRef) {
          currentRef.disabled = true;
          if (nextRef) {
            nextRef.disabled = false;
            nextRef.focus();
            setActiveRef(nextRef);
          }
        }
      }
      setWaitingServer(false);
    });
  };

  useEffect(() => {
    if (keyboardSubmit && gameStarted) {
      handleSubmit(focusedInput);
    }
    dispatch(setKeyboardSubmit(false));
  }, [keyboardSubmit]);

  useEffect(() => {
    if (winState !== '') {
      for (let i = 0; i < settings.numOfAttempts; i++) {
        if (inputRef.current[i]) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          inputRef.current[i]!.disabled = true;
        }
      }
    }
  }, [winState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.value.length === challengeWordArr.length + 1) {
      return;
    }
    if (!/\p{Letter}/u.test(e.target.value[e.target.value.length - 1])) {
      return;
    }
    dispatch(setEditLetterBox(e.target.value.length - 1));
    dispatch(setInputWord({ word: e.target.value.split(''), try: index }));
  };

  const isFocused = (index: number) => document.activeElement === inputRef.current[index];

  return (
    <div className={classes.wordle} style={{ overflow: 'hidden' }}>
      {contextHolder}
      {winState === '' ? null : winState === 'loose' ? (
        <EndScreen startNew={() => startGame()} win={false} />
      ) : (
        <EndScreen startNew={() => startGame()} win />
      )}
      {Array(settings.numOfAttempts)
        .fill(null)
        .map((_, index) => (
          <form key={index} className={classes.field} onSubmit={(e) => handleSubmit(index, e)}>
            <input
              ref={(node) => {
                if (node) {
                  inputRef.current[index] = node;
                } else {
                  inputRef.current[index] = null;
                }
              }}
              className={classes.wordInput}
              autoComplete="off"
              type="text"
              value={inputWord[index].join('') || ''}
              onChange={(e) => handleChange(e, index)}
              disabled
              id={`wordInput${index}`}
              onBlurCapture={() => activeRef?.focus()}
            />
            <input type="submit" />
            <label
              htmlFor={activeRef?.id}
              style={waitingServer ? { filter: 'blur(5px)' } : undefined}
            >
              <WordRow tryIndex={index} childClass={isFocused(index)} />
            </label>
          </form>
        ))}
      <Button
        style={{ width: 210 }}
        loading={waitingServer}
        type="primary"
        size="large"
        onClick={startGame}
      >
        {gameStarted ? 'ПЕРЕЗАПУСТИТЬ' : 'НАЧАТЬ'}
      </Button>
    </div>
  );
};

export default GameScene;
