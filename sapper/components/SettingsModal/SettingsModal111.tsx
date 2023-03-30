import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  setSettingsModal,
  setSettingsValue,
  setSetting,
  getSapperState,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './SettingsModal.module.scss';

interface FormData {
  setting: string;
}

const SettingsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settings, settingsValue } = useAppSelector(getSapperState);
  const { control, register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {},
  });

  /* useEffect(() => {
    setValue('setting', );
  }, []); */

  const onSubmit = (data) => {
    dispatch(setSettingsModal());
    dispatch(
      setSettingsValue({
        level: data.setting,
        height: Number(data.height),
        width: Number(data.width),
        mins: Number(data.mins),
      }),
    );
  };

  return (
    <div className={classes.settingsModal}>
      <h2 className={classes.title}>Settings:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          control={control}
          name="setting"
          render={({ field: { onChange, value } }) => (
            <ul className={classes['settings-list']}>
              {settings.map((setting: { id: number; label: string; checked: boolean }) => (
                <li key={setting.id} className={classes['settings-list__item']}>
                  <input
                    id={setting.label}
                    value={value}
                    className={classes['settings-checkbox']}
                    type="radio"
                    onChange={onChange}
                    defaultChecked={settingsValue.level === setting.label ? true : null}
                    // {...register('setting')}
                  />
                  <label htmlFor={setting.label} className={classes['settings-label']}>
                    {setting.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        />
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
              disabled={!settings[3].checked}
              defaultValue={settings[3].checked ? settingsValue?.height : null}
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
              disabled={!settings[3].checked}
              defaultValue={settings[3].checked ? settingsValue?.width : null}
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
              disabled={!settings[3].checked}
              defaultValue={settings[3].checked ? settingsValue?.mins : null}
              {...register('mins')}
            />
          </div>
        </div>
        <button type="submit" className={classes['setting-btn']}>
          Ok
        </button>
        <button
          type="button"
          className={classes['setting-btn']}
          onClick={() => {
            dispatch(setSettingsModal());
            dispatch(setSetting());
          }}
        >
          Back
        </button>
        <button
          type="button"
          className={classes['setting-btn-close']}
          onClick={() => {
            dispatch(setSettingsModal());
            dispatch(setSetting());
          }}
        >
          X
        </button>
      </form>
    </div>
  );
};

export default SettingsModal;
