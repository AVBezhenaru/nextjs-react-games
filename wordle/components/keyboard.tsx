import { useDispatch, useSelector } from 'react-redux';

import { setEditLetterBox } from '../store/animationSlice';
import { AppDispatch, RootState } from '../store/store';
import { setInputWord, setKeyboardSubmit } from '../store/wordleSlice';
import classes from '../styles/keyboard.module.scss';

import KeyboardKey from './keyboard-key';

const RU_LAYOUT = 'йцукенгшщзхъфывапролджэячсмитьбю';
// const EN_LAYOUT = 'qwertyuiopasdfghjklzxcvbnm';

const Keyboard = () => {
  // const { lang } = useSelector((state: RootState) => state.wordleSlice.settings);
  const { inputWord, challengeWordArr } = useSelector((state: RootState) => state.wordleSlice);
  const { focusedInput } = useSelector((state: RootState) => state.animationSlice);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (letter: string) => {
    if (focusedInput > -1) {
      const newWord = inputWord[focusedInput].join('') + letter;
      if (newWord.length === challengeWordArr.length + 1) {
        return;
      }
      dispatch(setInputWord({ word: newWord.split(''), try: focusedInput }));
      dispatch(setEditLetterBox(newWord.length - 1));
    }
  };

  const handleDelete = () => {
    if (focusedInput > -1) {
      const newWord = [...inputWord[focusedInput]];
      newWord.pop();
      dispatch(setInputWord({ word: newWord, try: focusedInput }));
      dispatch(setEditLetterBox(newWord.length - 1));
    }
  };

  const handleEnter = () => {
    dispatch(setKeyboardSubmit(true));
  };

  return (
    <div className={classes.keyboard}>
      {RU_LAYOUT.split('').map((letter) => (
        <KeyboardKey key={letter} letter={letter} handleClick={handleClick} />
      ))}
      <span className={`${classes.deleteButton} ${classes.key}`} onClick={handleDelete}>
        ⌫
      </span>
      <span className={`${classes.enterButton} ${classes.key}`} onClick={handleEnter}>
        ↩
      </span>
    </div>
  );
};

export default Keyboard;
