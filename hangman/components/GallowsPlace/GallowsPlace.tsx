import { NextPage } from 'next';

import { bodyParts } from '../../utils';
import { useAppSelector } from '../../../hooks';
import { getAppState } from '../../store/HangmanSlice';

import styles from './index.module.scss';

const GallowsPlace: NextPage = () => {
  const { wrongLetters } = useAppSelector(getAppState);

  const { length } = wrongLetters;

  return (
    <div className={styles.container}>
      {bodyParts.map((name, index) =>
        length > index ? <div key={index} className={styles[name]} /> : null,
      )}
    </div>
  );
};

export { GallowsPlace };
