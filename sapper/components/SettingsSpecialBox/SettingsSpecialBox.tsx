import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import classes from './SettingsSpecialBox.module.scss';

type FormValues = {
  height: string;
  width: string;
  mins: string;
  settingsValue: { level: string; height: number; width: number; mins: number };
};

interface ISettingsSpecialBoxProps {
  name: 'height' | 'width' | 'mins';
  min: number;
  max: number;
  disabled: boolean;
  defaultValue: string | null;
  register: UseFormRegister<FormValues>;
  className: string;
}

const SettingsSpecialBox: FC<ISettingsSpecialBoxProps> = ({
  name,
  min,
  max,
  disabled,
  defaultValue,
  register,
  className,
}) => (
  <div className={classes['setting-special-wraper']}>
    <label htmlFor={name} className={classes['settings-label-special']}>
      {`${name} (${min}-${max}) :`}
    </label>
    <input
      id={name}
      name={name}
      className={className}
      type="number"
      min={min}
      max={max}
      required
      disabled={disabled}
      defaultValue={defaultValue}
      {...register(name)}
    />
  </div>
);

export default SettingsSpecialBox;
