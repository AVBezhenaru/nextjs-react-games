import { motion, useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAnimationDone, setCheckingLetters } from '../store/animationSlice';
import { AppDispatch, RootState } from '../store/store';
import letterStatus from '../styles/letter-status.module.scss';
import classes from '../styles/word-row.module.scss';

const LetterBox: React.FC<{
  children: string;
  index: number;
  tryIndex: number;
  childClass: boolean;
}> = ({ children, index, tryIndex, childClass }) => {
  const { correctLetters } = useSelector((state: RootState) => state.wordleSlice);
  const dispatch = useDispatch<AppDispatch>();
  const animateDeps = useSelector((state: RootState) => state.animationSlice);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (index === animateDeps.editLetterBox && tryIndex === animateDeps.focusedInput) {
      animate(scope.current, { scale: [1, 1.1, 1] }, { duration: 0.2 });
    }
  }, [animateDeps.editLetterBox]);

  useEffect(() => {
    if (animateDeps.checkingLetters && tryIndex === animateDeps.focusedInput) {
      animate(
        scope.current,
        { scaleY: [1, 0] },
        { duration: 0.15, delay: index / 10, ease: 'easeIn' },
      ).then(() => {
        scope.current.classList.add(correctLetters[tryIndex][index]);
        dispatch(setCheckingLetters(false));
        animate(
          scope.current,
          { scaleY: [0, 1] },
          { duration: 0.15, delay: index / 10, ease: 'easeOut' },
        ).then(() => dispatch(setAnimationDone(index)));
      });
    }
  }, [animateDeps.checkingLetters]);

  useEffect(() => {
    if (correctLetters.flat().join('') === '' && scope.current.classList.length > 0) {
      scope.current.classList.remove(
        letterStatus.correct,
        letterStatus.incorrect,
        letterStatus.misplaced,
      );
    }
  }, [correctLetters]);

  return (
    <motion.div ref={scope} className={`${classes.charBox} ${childClass && classes.focused}`}>
      {children}
    </motion.div>
  );
};

export default LetterBox;
