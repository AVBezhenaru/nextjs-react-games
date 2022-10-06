import React, { FC } from 'react';

import styles from './GallowsPlace.module.scss';

const GallowsPlace: FC = () => (
  <div className={styles.container}>
    <div className={styles.gallows} />
    <div className={styles.head} />
    <div className={styles.body} />
    <div className={styles.leftHand} />
    <div className={styles.rightHand} />
    <div className={styles.leftLeg} />
    <div className={styles.rightLeg} />
  </div>
);

export default GallowsPlace;

/**
 * считать ошибки
 * в зависимости от номера ошибки рендерить часть тела
 * 7 ошибок
 */
