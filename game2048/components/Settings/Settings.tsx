import { useAppDispatch } from '../../../hooks';
import styles from '../Settings/Settings.module.scss';
import React from 'react';
import HomeButton from '../HomeButton/HomeButton';
import { setNumberColor } from '../../actions';
import PlayButton from '../PlayButton/PlayButton';

const red = [168, 10, 10];
const blue = [57, 75, 144];
const yellow = [220, 183, 17];
const green = [9, 122, 5];
const purple = [103, 65, 136];

const Settings = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.homeButtons}>
        <HomeButton />
        <PlayButton />
      </div>
      <div className={styles.header}>Settings</div>
      <div className={styles.settings}>
        <div className={styles.setting}>
          <div className={styles.heading}>Choose color theme</div>
          <div className={styles.buttons}>
            <button
              onClick={() => dispatch(setNumberColor(red))}
              className={`${styles.button} ${styles.buttonRed}`}
            >
              RED
            </button>
            <button
              onClick={() => dispatch(setNumberColor(blue))}
              className={`${styles.button} ${styles.buttonBlue}`}
            >
              BLUE
            </button>
            <button
              onClick={() => dispatch(setNumberColor(yellow))}
              className={`${styles.button} ${styles.buttonYellow}`}
            >
              YELLOW
            </button>
            <button
              onClick={() => dispatch(setNumberColor(green))}
              className={`${styles.button} ${styles.buttonGreen}`}
            >
              GREEN
            </button>
            <button
              onClick={() => dispatch(setNumberColor(purple))}
              className={`${styles.button} ${styles.buttonPurple}`}
            >
              PURPLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
