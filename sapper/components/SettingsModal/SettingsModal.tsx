import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  setSettingsModal,
  setSettingsValue,
  setGameIndicator,
  getSapperState,
  setTimerIndicator,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { checkedRadioBoxs } from '../../assets/utils/util';

import classes from './SettingsModal.module.scss';

type FormValues = {
  height: string;
  width: string;
  mins: string;
  settingsValue: { level: string; height: number; width: number; mins: number };
};

const SettingsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingsValue } = useAppSelector(getSapperState);
  const [radioBoxsData, setRadioBoxsData] = useState(checkedRadioBoxs(settingsValue));

  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { settingsValue },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const activeLabel = radioBoxsData.find((box) => box.checked);
    dispatch(setGameIndicator('New game'));
    dispatch(setSettingsModal());
    dispatch(setTimerIndicator(false));
    dispatch(
      setSettingsValue({
        level: activeLabel.label ? activeLabel.label : settingsValue.level,
        height: data.height ? Number(data.height) : settingsValue.height,
        width: data.width ? Number(data.width) : settingsValue.width,
        mins: data.mins ? Number(data.mins) : settingsValue.mins,
      }),
    );
  };

  const changeRadio = (id: number) => {
    setRadioBoxsData((boxsData) =>
      boxsData.map((radioBox) => {
        if (radioBox.id === id) {
          return { ...radioBox, checked: true };
        }
        return { ...radioBox, checked: false };
      }),
    );
  };

  const onClickClose = () => {
    dispatch(setSettingsModal());
  };

  return (
    <div className={classes.settingsModal}>
      <h2 className={classes.title}>Settings:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <ul className={classes['radioBoxs-list']}>
          {radioBoxsData.map((radioBox: { id: number; label: string; checked: boolean }) => (
            <li key={radioBox.id} className={classes['radioBoxs-list__item']}>
              <input
                id={radioBox.label}
                name="radioBoxs"
                value={radioBox.label}
                className={classes.radioBoxs}
                type="radio"
                onChange={() => changeRadio(radioBox.id)}
                defaultChecked={radioBox.checked}
              />
              <label htmlFor={radioBox.label} className={classes['radioBoxs-label']}>
                {radioBox.label}
              </label>
            </li>
          ))}
        </ul>
        <div className={classes['settings-special']}>
          <div className={classes['setting-special-wraper']}>
            <label htmlFor="height" className={classes['settings-label-special']}>
              Height (9-24):
            </label>
            <input
              id="height"
              name="height"
              className={classes['settings-height']}
              type="number"
              min="9"
              max="24"
              required
              disabled={!radioBoxsData[3].checked}
              defaultValue={radioBoxsData[3].checked ? `${settingsValue?.height}` : null}
              {...register('height')}
            />
          </div>
          <div className={classes['setting-special-wraper']}>
            <label htmlFor="height" className={classes['settings-label-special']}>
              Width (9-30):
            </label>
            <input
              id="width"
              name="width"
              className={classes['settings-width']}
              type="number"
              min="9"
              max="30"
              required
              disabled={!radioBoxsData[3].checked}
              defaultValue={radioBoxsData[3].checked ? `${settingsValue?.width}` : null}
              {...register('width')}
            />
          </div>
          <div className={classes['setting-special-wraper']}>
            <label htmlFor="mins" className={classes['settings-label-special']}>
              Mins (10-668):
            </label>
            <input
              id="mins"
              name="mins"
              className={classes['settings-mins']}
              type="number"
              min="10"
              max="668"
              required
              disabled={!radioBoxsData[3].checked}
              defaultValue={radioBoxsData[3].checked ? `${settingsValue?.mins}` : null}
              {...register('mins')}
            />
          </div>
        </div>
        <button type="submit" className={classes['setting-btn']}>
          Ok
        </button>
        <button type="button" className={classes['setting-btn']} onClick={onClickClose}>
          Back
        </button>
        <button type="button" className={classes['setting-btn-close']} onClick={onClickClose}>
          X
        </button>
      </form>
    </div>
  );
};

export default SettingsModal;
