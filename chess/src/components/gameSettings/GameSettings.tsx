import { FC, useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';

import { Settings, StyledPopupButton } from '../../styles/chess.style';
import { Colors } from '../../models/Colors';

import styles from './gameSettings.module.scss';

const headerLogo = require('../../assets/img/header-logo.png');

interface SelectOption {
  value: string;
  label: string;
}

interface GameSettingsProps {
  setGameTime: (time: string | null) => void;
  setGainTime: (time: string | null) => void;
  settingsGame: {
    gameTime: string | null;
    gainTime: string | null;
    startColor: Colors;
    gameMode: string;
  };
}

const GameSettings: FC<GameSettingsProps> = ({ setGainTime, setGameTime, settingsGame }) => {
  const color = [
    { value: 'random', label: 'случайными' },
    { value: 'black', label: 'черными' },
    { value: 'white', label: 'белыми' },
  ];

  const gameMode = [
    { value: 'friendOnline', label: 'с другом на одном устройстве' },
    { value: 'friendOffline', label: 'с другом по сети' },
  ];

  const timeGame = [
    { value: 'unlimited', label: 'неограниченно' },
    { value: '3', label: '3 минуты' },
    { value: '5', label: '5 минут' },
    { value: '15', label: '15 минут' },
    { value: '30', label: '30 минут' },
    { value: '45', label: '45 минут' },
    { value: '60', label: '1 час' },
  ];

  const timeGain = [
    { value: 'no increase', label: 'без прибавки' },
    { value: '1', label: '1 секунда' },
    { value: '2', label: '2 секунды' },
    { value: '3', label: '3 секунды' },
    { value: '5', label: '5 секунд' },
    { value: '10', label: '10 секунд' },
    { value: '15', label: '15 секунд' },
    { value: '30', label: '30 секунд' },
    { value: '45', label: '45 секунд' },
    { value: '60', label: '1 минута' },
  ];

  const setTimeGame = (option: SelectOption | null) => {
    const time = Number(option!.value);
    let newTime;
    if (time < 10 && time !== null) {
      newTime = `0${time} : 00`;
    } else {
      newTime = `${time} : 00`;
    }
    setGameTime(newTime);
  };

  return (
    <Settings
      trigger={<StyledPopupButton>Создать игру</StyledPopupButton>}
      modal
      closeOnDocumentClick
    >
      <div className={styles.settings__logo}>
        <Image
          className={styles['settings__logo-img']}
          src={headerLogo}
          alt="logo"
          width="100"
          height="100"
        />
      </div>
      <h2 className={styles.setting__header}>Выберите настройки</h2>
      <form action="" className={styles.settings__form}>
        <div className={styles.settings__inner}>
          <div className={styles.settings__item}>
            <label className={styles['settings__form-title']}>Цвет</label>
            <Select options={color} defaultValue={color[0]} />
          </div>
          <div className={styles.settings__item}>
            <label className={styles['settings__form-title']}>Режим игры</label>
            <Select options={gameMode} defaultValue={gameMode[0]} />
          </div>
          <div className={styles.settings__item}>
            <label className={styles['settings__form-title']}>Время на игру</label>
            <Select onChange={setTimeGame} options={timeGame} defaultValue={timeGame[0]} />
          </div>
          <div className={styles.settings__item}>
            <label className={styles['settings__form-title']}>Прибавка на ход</label>
            <Select options={timeGain} defaultValue={timeGain[0]} />
          </div>
        </div>
      </form>
      <button className={styles.settings__btn} type="submit">
        Начать игру
      </button>
    </Settings>
  );
};

export default GameSettings;
