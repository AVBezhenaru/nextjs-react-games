import { FC } from 'react';

import { useAppSelector } from '../../hooks';
import { getAppState } from '../../store/reducers/AppSlice';
import { bodyParts } from '../../utils';
import styles from '../../styles/GallowsPlace.module.scss';

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
