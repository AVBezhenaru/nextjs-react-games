/* eslint-disable no-unused-expressions */
import React from 'react';

import classes from './Popup.module.css';

interface PopupProps {
  title: string;
  onYes?: () => void;
  onNo?: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, onYes, onNo }) => {
  const handleYesClick = () => {
    onYes && onYes();
  };

  const handleNoClick = () => {
    onNo && onNo();
  };

  return (
    <div className={classes.popupOverlay}>
      <div className={classes.popup}>
        <h2 className={classes.popupTitle}>{title}</h2>
        <div className={classes.popupButtons}>
          <button
            type="button"
            className={`${classes.popupButton} ${classes.popupButtonYes}`}
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button
            type="button"
            className={`${classes.popupButton} ${classes.popupButtonNo}`}
            onClick={handleNoClick}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
