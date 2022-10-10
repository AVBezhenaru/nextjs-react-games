import React, { FC } from 'react';

import { bodyParts } from '../../data/data';
import { useAppSelector } from '../../hooks';
import { getAppState } from '../../store/reducers/AppSlice';

import styles from './index.module.scss';

const GallowsPlace: FC = () => {
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
