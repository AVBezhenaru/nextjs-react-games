import styles from '../Settings/Settings.module.scss';
import React from 'react';

const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Settings</div>
      <div className={styles.settings}>
        <div className={styles.setting}>
          <div className={styles.heading}>Choose color theme</div>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.buttonRed}`}>RED</button>
            <button className={`${styles.button} ${styles.buttonBlue}`}>BLUE</button>
            <button className={`${styles.button} ${styles.buttonYellow}`}>YELLOW</button>
            <button className={`${styles.button} ${styles.buttonGreen}`}>GREEN</button>
            <button className={`${styles.button} ${styles.buttonPurple}`}>PURPLE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
