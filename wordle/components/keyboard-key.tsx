import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAnimationDone } from '../store/animationSlice';
import { AppDispatch, RootState } from '../store/store';
import classes from '../styles/keyboard.module.scss';

const KeyboardKey: React.FC<{ letter: string; handleClick: (letter: string) => void }> = ({
  letter,
  handleClick,
}) => {
  const [scope, animate] = useAnimate();
  const { keyboardMarkers, challengeWordArr } = useSelector(
    (state: RootState) => state.wordleSlice,
  );
  const { animationDone } = useSelector((state: RootState) => state.animationSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (animationDone === challengeWordArr.length - 1) {
      if (keyboardMarkers[scope.current.innerHTML.toLowerCase()])
        animate(scope.current, { scale: [1, 0.8] }).then(() => {
          dispatch(setAnimationDone(0));
          scope.current.classList.add(keyboardMarkers[scope.current.innerHTML.toLowerCase()]);
          animate(scope.current, { scale: 1 });
        });
    }
  }, [animationDone]);

  useEffect(() => {
    if (JSON.stringify(keyboardMarkers) === JSON.stringify({})) {
      scope.current.classList.remove('correct', 'incorrect', 'misplaced');
    }
  }, [keyboardMarkers]);

  return (
    <span ref={scope} className={classes.key} onClick={() => handleClick(letter)}>
      {letter.toUpperCase()}
    </span>
  );
};

export default KeyboardKey;
