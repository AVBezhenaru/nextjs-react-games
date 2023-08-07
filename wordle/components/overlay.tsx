'use client';

import { IconButton, MenuItem, Select, Slider, Modal } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { setLang, setLength, setNumOfAttempts } from '../store/wordleSlice';
import classes from '../styles/overlay.module.scss';
import classNames from '../styles/wordle.module.scss';

import Keyboard from './keyboard';

const Overlay: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch();
  const { lang, numOfAttempts, wordLength } = useSelector(
    (state: RootState) => state.wordleSlice.settings,
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className={classNames.main}>
      <IconButton color="inherit" onClick={() => setIsSettingsOpen(true)}>
        <SettingsIcon />
      </IconButton>
      {/* <Modal */}
      {/*  open={isSettingsOpen} */}
      {/*  onOk={() => setIsSettingsOpen(false)} */}
      {/*  onClose={() => setIsSettingsOpen(false)} */}
      {/*  footer={null} */}
      {/* > */}
      <Modal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={classes.settingsLabel}>Select Language:</span>
            <Select
              defaultValue={lang}
              value={lang}
              label="lang"
              onChange={(value) => {
                dispatch(setLang(value));
              }}
            >
              <MenuItem value="RU">RU</MenuItem>
              <MenuItem disabled value="EN">
                EN
              </MenuItem>
            </Select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={classes.settingsLabel}>Select Word Length:</span>
            <div style={{ width: '70%', display: 'inline-block' }}>
              <Slider
                defaultValue={wordLength as [number, number]}
                min={4}
                max={24}
                onChange={(e, value) => {
                  dispatch(setLength(value));
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={classes.settingsLabel}>Select number of attempts:</span>
            <div style={{ width: '70%', display: 'inline-block' }}>
              <Slider
                defaultValue={numOfAttempts}
                min={4}
                max={10}
                onChange={(e, value) => {
                  dispatch(setNumOfAttempts(value));
                }}
              />
            </div>
          </div>
        </>
      </Modal>
      {children}
      <Keyboard />
    </main>
  );
};

export default Overlay;
