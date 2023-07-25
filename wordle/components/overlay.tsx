'use client';

import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Slider } from 'antd';
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
      <Button
        shape="circle"
        icon={<SettingOutlined />}
        type="default"
        onClick={() => setIsSettingsOpen(true)}
      />
      <Modal
        title="Settings"
        open={isSettingsOpen}
        onOk={() => setIsSettingsOpen(false)}
        onCancel={() => setIsSettingsOpen(false)}
        footer={null}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={classes.settingsLabel}>Select Language:</span>
          <Select
            defaultValue={lang}
            options={[
              { value: 'RU', label: 'RU' },
              { value: 'EN', label: 'EN', disabled: true },
            ]}
            onChange={(value: string) => {
              dispatch(setLang(value));
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={classes.settingsLabel}>Select Word Length:</span>
          <div style={{ width: '70%', display: 'inline-block' }}>
            <Slider
              range
              defaultValue={wordLength as [number, number]}
              min={4}
              max={24}
              onAfterChange={(value: [number, number]) => {
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
              onAfterChange={(value: number) => {
                dispatch(setNumOfAttempts(value));
              }}
            />
          </div>
        </div>
      </Modal>
      {children}
      <Keyboard />
    </main>
  );
};

export default Overlay;
